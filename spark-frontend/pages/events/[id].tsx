import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import {
  getEventByEventId,
  getAllEventIds,
  useEventsJoinEventConsumer,
  useRole,
} from "../../utils/helper";
import eventStyles from "../../styles/event.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Layout from "../../components/layout";
import { parseISO, formatISO } from "date-fns";
import { useCart } from "../../utils/store";
import classNames from "classnames";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

export default function Event({
  eventData,
}: {
  eventData: {
    id: number;
    title: string;
    eventProvider: string;
    eventCategory: string;
    location: string;
    dateStart: string;
    dateEnd: string;
    imageURL: string;
  };
}) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { role } = useRole(currentUser?.email);
  const { eventsJoinEventConsumer } = useEventsJoinEventConsumer(role?.id);
  const [isJoined, setIsJoined] = useState<boolean | string>("1"); // set an initial value using a non-zero string
  const [isVerified, setIsVerified] = useState(false); // set it to true after the user is identified whether he/she has joined an event
  const [isOwnerOfEvent, setIsOwnerOfEvent] = useState<boolean | string>("1");

  useEffect(() => {
    if (
      role.role === "consumer" &&
      eventsJoinEventConsumer &&
      eventsJoinEventConsumer.find((event) => event.event_id === eventData.id)
    ) {
      setIsJoined(true);
    } else if (eventsJoinEventConsumer) {
      setIsJoined(false);
    }
  }, [role, eventsJoinEventConsumer, eventData]);

  useEffect(() => {
    if (
      role.role === "consumer" &&
      eventsJoinEventConsumer &&
      (isJoined || !isJoined)
    ) {
      setIsVerified(true);
    }
  }, [role, isJoined, eventsJoinEventConsumer]);

  //////
  useEffect(() => {
    console.log(role);
    console.log(role.name);
    console.log(eventData.eventProvider);
    console.log(role.name === eventData.eventProvider);
    if (role.role === "provider" && role.name === eventData.eventProvider) {
      setIsOwnerOfEvent(true);
      setIsVerified(true);
    } else if (role.role === "provider") {
      setIsOwnerOfEvent(false);
      setIsVerified(true);
    }
  });
  /////

  // use zustand cart store
  const eventCartStore = useCart((state) => state.events);
  const addToEvents = useCart((state) => state.addToEvents);
  const removeFromEvents = useCart((state) => state.removeFromEvents);
  const updateCounter = useCart((state) => state.updateCounter);

  // used during pre-rendering and the first render in the browser
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [eventCart, setEventCart] = useState([]);

  // https://github.com/pmndrs/zustand/discussions/855
  // https://nextjs.org/docs/messages/react-hydration-error
  // called during hydration, which has access to the window object localStorage method

  useEffect(() => {
    setEventCart(eventCartStore);
  }, [eventCartStore]);

  useEffect(() => {
    if (eventCartStore.includes(eventData.id)) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [eventCartStore, eventData]);

  const handleAddToCartClick = () => {
    if (eventCartStore.includes(eventData.id)) {
      removeFromEvents(eventData.id);
    } else {
      addToEvents(eventData.id);
    }
    updateCounter();
  };

  const handleJoinEventClick = () => {
    alert("sign-in is required.");
  };

  return (
    <Layout>
      <Head>
        <title>{eventData.title}</title>
      </Head>
      <>
        <div className={eventStyles.Event}>
          <div className={eventStyles.left}>
            <h1>{eventData.title}</h1>
            <div className={eventStyles.providerTitle}>Provider</div>
            <div className={eventStyles.providerContent}>
              {eventData.eventProvider}
            </div>
            <div className={eventStyles.categoryTitle}>Category</div>
            <div className={eventStyles.categoryContent}>
              {eventData.eventCategory}
            </div>
            <div className={eventStyles.locationTitle}>Location</div>
            <div className={eventStyles.locationContent}>
              {eventData.location}
            </div>
            <div className={eventStyles.dateTitle}>Date</div>
            <div className={eventStyles.dateContent}>
              {formatISO(parseISO(eventData.dateStart), {
                representation: "date",
              })}{" "}
              ~{" "}
              {formatISO(parseISO(eventData.dateEnd), {
                representation: "date",
              })}
            </div>
            {role.role === "consumer" && isVerified && !isJoined && (
              <button
                onClick={handleAddToCartClick}
                className={classNames({
                  [eventStyles.eventBtn]: true,
                  [eventStyles.addToCart]: !isClicked,
                  [eventStyles.addedToCart]: isClicked,
                })}
              >
                {!isClicked ? "add to cart" : "added to cart"}
              </button>
            )}
            {role.role === "consumer" && isVerified && !isJoined && (
              <button
                className={classNames(
                  eventStyles.eventBtn,
                  eventStyles.joinEventBtn
                )}
                onClick={handleJoinEventClick}
              >
                join event
              </button>
            )}

            {role.role === "consumer" && isVerified && isJoined && (
              <div>
                This event has been joined by the current authenticated consumer
              </div>
            )}
            <div>I am {isOwnerOfEvent ? "" : "not"} the provider</div>
            {role.role === "provider" && isVerified && isOwnerOfEvent && (
              <>
                <button onClick={() => router.push("/dashboard")}>
                  manage event
                </button>
              </>
            )}
          </div>
          <div className={eventStyles.right}>
            {eventData.imageURL && (
              <Image
                src={eventData.imageURL}
                className={eventStyles["event-image"]}
                width={400}
                height={400}
                alt=""
              />
            )}
          </div>
        </div>
      </>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllEventIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const eventData = await getEventByEventId(params.id as string);
  return {
    props: {
      eventData,
    },
  };
};
