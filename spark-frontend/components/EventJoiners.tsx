import { useEventsJoinEventConsumerByEventId } from "../utils/helper";
import { useEffect, useState } from "react";

export const EventJoiners = ({ eventData }) => {
  // get the eventJoiners from backend API
  const { eventsJoinEventConsumer } = useEventsJoinEventConsumerByEventId(
    eventData?.id
  );
  const [joiners, setJoiners] = useState([]);

  useEffect(() => {
    if (eventsJoinEventConsumer) {
      console.log(eventsJoinEventConsumer);
      setJoiners(eventsJoinEventConsumer.map((item) => item.consumer_name));
    }
  }, [eventsJoinEventConsumer]);

  return <>Joiners: {joiners}</>;
};
