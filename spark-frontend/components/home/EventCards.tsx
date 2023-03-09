import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useRef,
  forwardRef,
  createRef,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { parseISO, formatISO } from "date-fns";
import EventCardsStyles from "../../styles/eventCards.module.css";
import classNames from "classnames";

const EventCard = ({ event }) => {
  const router = useRouter();
  const { id } = event;
  const navigateToEventPage = (id) => {
    router.push(`/events/${id}/`);
  };

  const EventImage = ({ imageURL }) => {
    return (
      <div className={EventCardsStyles["event-image"]}>
        <Image src={imageURL} alt="" fill sizes="33vw" />
      </div>
    );
  };

  const EventTitle = ({ title }) => {
    return <div className={EventCardsStyles["event-title"]}>{title}</div>;
  };

  const EventCategory = ({ category }) => {
    return <div className={EventCardsStyles.eventCategory}>{category}</div>;
  };

  const EventLocation = ({ location }) => {
    return <div className={EventCardsStyles.eventLocation}>{location}</div>;
  };

  const EventDate = ({ dateStart, dateEnd }) => {
    return (
      <div className={EventCardsStyles.eventDate}>
        {formatISO(parseISO(dateStart), {
          representation: "date",
        })}{" "}
        ~ {formatISO(parseISO(dateEnd), { representation: "date" })}
      </div>
    );
  };

  return (
    <div
      className={EventCardsStyles["event-card-display"]}
      onClick={() => navigateToEventPage(id)}
      data-cy={`event-card-${id}`}
    >
      <EventImage imageURL={event.imageURL} />
      <EventTitle title={event.title} />
      <EventCategory category={event.eventCategory} />
      <EventLocation location={event.location} />
      <EventDate dateStart={event.dateStart} dateEnd={event.dateEnd} />
    </div>
  );
};

export const EventCards = ({ events }) => {
  return (
    <div
      className={classNames(EventCardsStyles["event-card-display-container"])}
      id="events"
    >
      {events.length > 0 &&
        events.map((event) => {
          return <EventCard event={event} key={event.id} />;
        })}
    </div>
  );
};
