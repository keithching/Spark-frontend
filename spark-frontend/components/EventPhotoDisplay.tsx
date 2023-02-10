import Image from "next/image";
import eventPhotoDisplayStyles from "../styles/EventPhotoDisplay.module.css";

export const EventPhotoDisplay = (eventData) => {
  return (
    <>
      {eventData.imageURL && (
        <Image
          src={eventData.imageURL}
          className={eventPhotoDisplayStyles["event-image"]}
          width={400}
          height={400}
          alt=""
        />
      )}
    </>
  );
};
