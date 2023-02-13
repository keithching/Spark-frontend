import Image from "next/image";
import eventPhotoDisplayStyles from "../styles/eventPhotoDisplay.module.css";

export const EventPhotoDisplay = (eventData) => {
  return (
    <div className={eventPhotoDisplayStyles["event-image"]}>
      {eventData.imageURL && (
        <Image
          src={eventData.imageURL}
          width={400}
          height={400}
          objectFit="cover"
          alt={eventData.title}
        />
      )}
    </div>
  );
};
