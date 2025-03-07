import { Activity } from '../store/activitySlice';

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem = ({ activity }: ActivityItemProps) => {
  const formattedTime = new Date(activity.timestamp).toLocaleTimeString();
  
  return (
    <div className="activity-item">
      <div className="activity-message">{activity.message}</div>
      <div className="activity-time">{formattedTime}</div>
    </div>
  );
};

export default ActivityItem;
