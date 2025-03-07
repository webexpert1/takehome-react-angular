import { activityReducer } from "./ActivityContext";


type ActivityAction = { type: "ADD_ACTIVITY"; payload: string };

describe("Activity Reducer", () => {
    it("should add an activity to the state", () => {
        const initialState = { activities: [] };
        const action: ActivityAction = { type: "ADD_ACTIVITY", payload: "User X logged in" };
        const newState = activityReducer(initialState, action);

        expect(newState.activities).toContain("User X logged in");
    });
});
