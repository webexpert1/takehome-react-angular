import React, { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

interface ActivityListProps {
  filter: string;
}
const ActivityList: React.FC<ActivityListProps> = ({ filter }) => {
  const { state } = useContext(ActivityContext);

  return (
    <ul>
      {state.activities.length === 0 ? (
        <li>No activities found</li>
      ) : (
        <ul className="activity-list">
          {state.activities
            .filter((activity: string) => activity.toLowerCase().includes(filter.toLowerCase()))
            .map((activity: string, index: number) => (
              <li key={index}>{activity}</li>
            ))}
        </ul>
      )}
    </ul>
  );
};


export default ActivityList;
