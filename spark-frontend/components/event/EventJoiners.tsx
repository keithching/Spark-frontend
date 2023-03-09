import Image from "next/image";
import { forwardRef, useEffect } from "react";
import classNames from "classnames";
import { useEventsJoinEventConsumerByEventId } from "../../utils/helper";
import eventJoinerStyles from "../../styles/eventJoiners.module.css";
// React Tooltip from MUI
// https://mui.com/material-ui/react-tooltip/
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

interface Props {
  joiner: {
    profile_pic_url: string;
    consumer_name: string;
  };
}

type Ref = HTMLDivElement;

export const EventJoiners = ({ eventData }) => {
  // get the eventJoiners from backend API
  const { eventsJoinEventConsumer } = useEventsJoinEventConsumerByEventId(
    eventData?.id
  );

  // forward the ref from tooltip to the image
  const ProfilePicImage = forwardRef<Ref, Props>(function ProfilePicImage(
    props,
    ref
  ) {
    return (
      <div {...props} ref={ref}>
        <Image
          src={props.joiner.profile_pic_url}
          alt={props.joiner.consumer_name}
          fill
          sizes="50vw"
        />
      </div>
    );
  });

  return (
    <div
      className={classNames(eventJoinerStyles.joinersDiv)}
      data-cy="event-joiners"
    >
      {eventsJoinEventConsumer && eventsJoinEventConsumer.length === 0 && (
        <div className={classNames(eventJoinerStyles.firstJoinerDiv)}>
          Become the first one to join this event!
        </div>
      )}
      {eventsJoinEventConsumer && eventsJoinEventConsumer.length > 0 && (
        <>
          <span>Joiners:</span>
          {eventsJoinEventConsumer.map((joiner) => {
            return (
              <div
                key={joiner.id}
                className={classNames(eventJoinerStyles.joinerProfilePic)}
              >
                {joiner.profile_pic_url && (
                  <Tooltip
                    title={joiner.consumer_name}
                    placement="bottom"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <ProfilePicImage joiner={joiner} />
                  </Tooltip>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
