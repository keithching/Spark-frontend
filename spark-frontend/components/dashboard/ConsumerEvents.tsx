import userDashboardStyles from "../../styles/userDashboard.module.css";
import { useRouter } from "next/router";

export const ConsumerEvents = ({ eventsJoinEventConsumer }) => {
  const router = useRouter();
  return (
    <div className={userDashboardStyles.consumerEventsContainer}>
      {eventsJoinEventConsumer.map((item) => {
        return (
          <div
            key={item.id}
            className={userDashboardStyles.consumerEventDiv}
            onClick={() => router.push(`/events/${item.event_id}`)}
          >
            {item.event_name}
          </div>
        );
      })}
    </div>
  );
};
