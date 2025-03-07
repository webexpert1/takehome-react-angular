import React, { createContext, useReducer, useEffect } from "react";
import io from "socket.io-client";

type ActivityState = { activities: string[] };
type ActivityAction = { type: "ADD_ACTIVITY"; payload: string };

export const activityReducer = (state: ActivityState, action: ActivityAction) => {
    switch (action.type) {
        case "ADD_ACTIVITY":
            return { ...state, activities: [action.payload, ...state.activities] };
        default:
            return state;
    }
};

const initialState: ActivityState = { activities: [] };
export const ActivityContext = createContext<any>(null);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(activityReducer, initialState);

    useEffect(() => {
        const socket = io("http://localhost:4000", { 
            transports: ["websocket"], 
            withCredentials: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        const handleActivityUpdate = (activity: string) => {
            dispatch({ type: "ADD_ACTIVITY", payload: activity });
        };

        socket.on("activityUpdate", handleActivityUpdate);
        socket.on("connect", () => console.log("WebSocket Connected"));
        socket.on("disconnect", () => console.warn("WebSocket Disconnected"));

        return () => {
            socket.off("activityUpdate", handleActivityUpdate);
            socket.disconnect();
        };
    }, []);

    return <ActivityContext.Provider value={{ state }}>{children}</ActivityContext.Provider>;
};
