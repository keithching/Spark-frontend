import Image from "next/image";
import { forwardRef } from "react";
import classNames from "classnames";
import { useEventsJoinEventConsumerByEventId } from "../utils/helper";
import eventJoinerStyles from "../styles/eventJoiners.module.css";
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
          width={50}
          height={50}
          objectFit="cover"
        />
      </div>
    );
  });

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
    </div>
  );
};
