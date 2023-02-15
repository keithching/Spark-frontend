import React, { useState, useEffect } from "react";
import homeStyles from "../styles/home.module.css";
import { useEvents } from "../utils/helper";
import { parseISO, formatISO } from "date-fns";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { events, isError, isLoading } = useEvents();

  const EventCards = () => {
    return (
      <div className={homeStyles["event-card-display-container"]}>
        {events.length > 0 &&
          events.map((event) => {
            return <EventCard event={event} key={event.id} />;
          })}
      </div>
    );
  };

  const EventCard = ({ event }) => {
    const { id } = event;
    const navigateToEventPage = (id) => {
      router.push(`/events/${id}/`);
    };

    const EventImage = ({ imageURL }) => {
      return (
        <div className={homeStyles["event-image"]}>
          <Image
            src={imageURL}
            alt=""
            width={400}
            height={400}
            objectFit="cover"
          />
        </div>
      );
    };

    const EventTitle = ({ title }) => {
      return <div className={homeStyles["event-title"]}>{title}</div>;
    };

    const EventCategory = ({ category }) => {
      return <div className={homeStyles.eventCategory}>{category}</div>;
    };

    const EventLocation = ({ location }) => {
      return <div className={homeStyles.eventLocation}>{location}</div>;
    };

    const EventDate = ({ dateStart, dateEnd }) => {
      return (
        <div className={homeStyles.eventDate}>
          {formatISO(parseISO(dateStart), {
            representation: "date",
          })}{" "}
          ~ {formatISO(parseISO(dateEnd), { representation: "date" })}
        </div>
      );
    };

    return (
      <div
        className={homeStyles["event-card-display"]}
        onClick={() => navigateToEventPage(id)}
      >
        <EventImage imageURL={event.imageURL} />
        <EventTitle title={event.title} />
        <EventCategory category={event.eventCategory} />
        <EventLocation location={event.location} />
        <EventDate dateStart={event.dateStart} dateEnd={event.dateEnd} />
      </div>
    );
  };

  return (
    <div className={homeStyles.Home}>
      <h1 className={homeStyles.header}>your next adventure awaits.</h1>
      {isError && <div>{isError}</div>}
      {!isLoading && <EventCards />}
    </div>
  );
}
