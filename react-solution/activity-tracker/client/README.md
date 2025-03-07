# Real-Time Activity Tracker

This project is a simple real-time activity tracker built with React and WebSockets using Socket.io. The application listens for user activity events and updates the UI in real-time.

## Features
- Real-time activity updates using WebSockets
- State management with `useReducer`
- Search bar with 300ms debouncing
- Unit tests with Jest
- **Optimized Performance**: Lazy loading for improved speed
- **Responsive Design**: Mobile-friendly UI
- **Best Practices**: Modular folder structure and reusable components

---

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/webexpert1/takehome-react-angular.git
cd react-solution
cd activity-tracker
```

### 2. Set Up the Server
```sh
cd server
npm install
npm run dev
```
This will start the WebSocket server on `http://localhost:4000`.

### 3. Set Up the Client
Open a new terminal and navigate to the client directory:
```sh
cd client
npm install
npm start
```
This will start the React app on `http://localhost:3000`.

### 4. Run test on the Client
Open a new terminal and navigate to the client directory:
```sh
cd client
npm test
```
This will start the React app on `http://localhost:3000`.

---

## Folder Structure
### **Client (`client/`):**
```
client/
│── src/
│   ├── components/       # Reusable components
│   ├── hooks/            # Custom hooks (e.g., useDebounce)
│   ├── pages/            # Page components (lazy-loaded)
│   ├── context/          # Global state management
│   ├── styles/           # CSS or Tailwind setup
│   ├── App.tsx           # Main app entry
│   ├── index.tsx         # React DOM render
```

### **Server (`server/`):**
```
server/
│── src/
│   ├── config.ts         # Configuration settings
│   ├── events.ts         # WebSocket event handlers
│   ├── server.ts         # Main WebSocket server
```

---

## How It Works
1. The server sends mock activity updates every 2 seconds.
2. The React client listens for WebSocket events and updates the UI.
3. Users can filter activities using a search bar with debouncing.
4. The UI is optimized for responsiveness and lazy loads pages.

---

## Running Tests
To run unit tests for WebSocket connection and state management:
cd client
npm test

---

## Technologies Used
- **Frontend**: React, Socket.io-client, React.lazy & Suspense
- **Backend**: Node.js, Express, Socket.io
- **State Management**: useReducer, React Context API
- **Testing**: Jest, React Testing Library
- **Styling**: CSS Modules

---

## Notes
- Ensure that both the client (`http://localhost:3000`) and server (`http://localhost:4000`) are running.
- Modify `server/src/config.ts` to update CORS settings if needed.
- Use `npm run build` in the server directory for production deployment.

---

## License
This project is licensed under the MIT License.




###  Areas for Improvement
- Better State Management.
  Consider using Redux (RTK) or Zustand instead of useReducer for better scalability.
   Helps with performance optimization and reduces unnecessary re-renders.

- Persist Activity Data.
  Currently, activity updates are only stored in memory.
  Implement database storage (MongoDB, PostgreSQL, Firebase, etc.) to persist user activity history.

- User Authentication & Access Control.
   Implement user authentication (JWT, OAuth) so that activities are tied to users.
-  Better WebSocket Handling.
   Implement automatic reconnection if the WebSocket connection drops.
   Add an offline mode where activities are stored locally and synced when online.

-  Optimized Frontend Performance.
   Use React.memo and useCallback to prevent unnecessary re-renders.

- Unit & Integration Testing.
  Improve test coverage for WebSocket events and reducers.

- Real-Time Notifications.
  Add desktop and push notifications for important activity updates.

