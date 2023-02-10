import eventInformationStyles from "../../styles/eventInformation.module.css";
import { parseISO, formatISO } from "date-fns";

export const EventInformation = ({ eventData }) => {
  return (
    <>
      <h1>{eventData.title}</h1>
      <div className={eventInformationStyles.providerTitle}>Provider</div>
      <div className={eventInformationStyles.providerContent}>
        {eventData.eventProvider}
      </div>
      <div className={eventInformationStyles.categoryTitle}>Category</div>
      <div className={eventInformationStyles.categoryContent}>
        {eventData.eventCategory}
      </div>
      <div className={eventInformationStyles.locationTitle}>Location</div>
      <div className={eventInformationStyles.locationContent}>
        {eventData.location}
      </div>
      <div className={eventInformationStyles.dateTitle}>Date</div>
      <div className={eventInformationStyles.dateContent}>
        {formatISO(parseISO(eventData.dateStart), {
          representation: "date",
        })}{" "}
        ~{" "}
        {formatISO(parseISO(eventData.dateEnd), {
          representation: "date",
        })}
      </div>
    </>
  );
};
