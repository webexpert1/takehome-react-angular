import React, { Suspense, lazy } from "react";
import { ActivityProvider } from "./context/ActivityContext";

const Dashboard = lazy(() => import("./pages/Dashboard"));

const App: React.FC = () => {
  return (
    <ActivityProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </ActivityProvider>
  );
};

export default App;
