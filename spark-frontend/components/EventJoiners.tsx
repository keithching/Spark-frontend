import Image from "next/image";
import classNames from "classnames";
import { useEventsJoinEventConsumerByEventId } from "../utils/helper";
import eventJoinerStyles from "../styles/eventJoiners.module.css";

export const EventJoiners = ({ eventData }) => {
  // get the eventJoiners from backend API
  const { eventsJoinEventConsumer } = useEventsJoinEventConsumerByEventId(
    eventData?.id
  );

  return (
    <div className={classNames(eventJoinerStyles.joinersDiv)}>
      Joiners:
      {eventsJoinEventConsumer &&
        eventsJoinEventConsumer.map((joiner) => {
          return (
            <div
              key={joiner.consumer_id}
              className={classNames(eventJoinerStyles.joinerProfilePic)}
            >
              {/* {joiner.consumer_name} */}
              {/* {joiner.profile_pic_url} */}
              {joiner.profile_pic_url && (
                // <div >
                <Image
                  src={joiner.profile_pic_url}
                  alt={joiner.consumer_name}
                  width={50}
                  height={50}
                  objectFit="cover"
                />
                // </div>
              )}
            </div>
          );
        })}
    </div>
  );
};
