import { render, screen, waitFor, act } from "@testing-library/react";
import { ActivityProvider, ActivityContext } from "./ActivityContext";
import io from "socket.io-client";

jest.mock("socket.io-client");

describe("WebSocket Activity Updates (Using Mocked Data)", () => {
  let mockSocket: any;

  beforeEach(() => {
    mockSocket = {
      on: jest.fn(),
      emit: jest.fn(),
      off: jest.fn(),
      connect: jest.fn(),
      disconnect: jest.fn(),
      trigger: (event: string, data?: any) => {
        const callback = mockSocket.on.mock.calls.find(([e]: [string]) => e === event)?.[1];
        if (callback) callback(data);
      },
    };

    (io as jest.Mock).mockImplementation(() => mockSocket);
  });

  it("should update activities when WebSocket message is received", async () => {
    render(
      <ActivityProvider>
        <ActivityContext.Consumer>
          {(context) => (
            <div data-testid="activities">{context?.state.activities.length ?? 0}</div>
          )}
        </ActivityContext.Consumer>
      </ActivityProvider>
    );

    await waitFor(() => expect(mockSocket.on).toHaveBeenCalledWith("connect", expect.any(Function)));

    const mockedActivityData = [
      { event: "activityUpdate", data: "User A joined" },
      { event: "activityUpdate", data: "User B left" },
      { event: "activityUpdate", data: "User C posted a message" },
    ];

    await act(async () => {
      mockedActivityData.forEach(({ event, data }) => {
        mockSocket.trigger(event, data);
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId("activities")).toHaveTextContent(mockedActivityData.length.toString());
    });
  });
});
