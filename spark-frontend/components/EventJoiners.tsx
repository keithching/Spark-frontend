import { useEventsJoinEventConsumerByEventId } from "../utils/helper";

export const EventJoiners = ({ eventData }) => {
  // get the eventJoiners from backend API
  const { eventsJoinEventConsumer } = useEventsJoinEventConsumerByEventId(
    eventData?.id
  );

  return (
    <div>
      Joiners:
      {eventsJoinEventConsumer &&
        eventsJoinEventConsumer.map((joiner) => {
          return <div key={joiner.consumer_id}>{joiner.consumer_name}</div>;
        })}
    </div>
  );
};
