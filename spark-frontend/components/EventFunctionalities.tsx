import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../utils/store";
import {
  useEventsJoinEventConsumerByEmail,
  useRole,
  deleteEventsJoinEventConsumer,
  useEventsJoinEventConsumerByEventId,
  getEventsJoinEventConsumerByEventId,
  createEventsJoinEventConsumer,
} from "../utils/helper";
import classNames from "classnames";
import eventFunctionalitiesStyles from "../styles/eventFunctionalities.module.css";

export const EventFunctionalities = ({ eventData }) => {
  const { currentUser } = useAuth();
  const { role } = useRole(currentUser?.email);
  const { eventsJoinEventConsumer } = useEventsJoinEventConsumerByEmail(
    currentUser?.email
  );
  const [isJoined, setIsJoined] = useState<boolean | string>("1"); // set an initial value using a non-zero string
  const [isVerified, setIsVerified] = useState(false); // set it to true after the user is identified whether he/she has joined an event
  const [isOwnerOfEvent, setIsOwnerOfEvent] = useState<boolean | string>("1");
  const router = useRouter();
  const { mutate } = useEventsJoinEventConsumerByEventId(eventData?.id);

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

  useEffect(() => {
    if (role.role === "provider" && role.name === eventData.eventProvider) {
      setIsOwnerOfEvent(true);
      setIsVerified(true);
    } else if (role.role === "provider") {
      setIsOwnerOfEvent(false);
      setIsVerified(true);
    }
  }, [role, eventData]);

  const eventCartStore = useCart((state) => state.events);
  const addToEvents = useCart((state) => state.addToEvents);
  const removeFromEvents = useCart((state) => state.removeFromEvents);
  const updateCounter = useCart((state) => state.updateCounter);

  // used during pre-rendering and the first render in the browser
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [eventCart, setEventCart] = useState([]);

  // working with LocalStorage in Static Site Generation
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

  const AddToCartBtn = () => {
    const handleAddToCartClick = () => {
      if (eventCartStore.includes(eventData.id)) {
        removeFromEvents(eventData.id);
      } else {
        addToEvents(eventData.id);
      }
      updateCounter();
    };

    return (
      <button
        onClick={handleAddToCartClick}
        className={classNames({
          [eventFunctionalitiesStyles.eventBtn]: true,
          [eventFunctionalitiesStyles.addToCart]: !isClicked,
          [eventFunctionalitiesStyles.addedToCart]: isClicked,
        })}
      >
        {!isClicked ? "add to cart" : "added to cart"}
      </button>
    );
  };

  const JoinEventBtn = () => {
    const handleJoinEventClick = async () => {
      if (!currentUser) return alert("sign-in is required.");

      try {
        const eventJoinEventConsumer = {
          eventIds: [eventData.id],
          consumerId: role.id,
        };

        // send to the backend API as a POST request
        await createEventsJoinEventConsumer(eventJoinEventConsumer);
        alert("joined");

        // TO REFACTOR - these 2 actions should be in sync when display in UI
        mutate(getEventsJoinEventConsumerByEventId(eventData.id));
        setIsJoined(true);
      } catch (err) {
        alert(err);
      }
    };

    return (
      <button
        className={classNames(
          eventFunctionalitiesStyles.eventBtn,
          eventFunctionalitiesStyles.joinEventBtn
        )}
        onClick={handleJoinEventClick}
      >
        join event
      </button>
    );
  };

  const LeaveEventBtn = () => {
    const handleLeaveEventClick = async () => {
      try {
        const eventJoinEventConsumer = {
          event_id: eventData.id,
          consumer_id: role.id,
        };

        // send to the backend API as a DELETE request
        await deleteEventsJoinEventConsumer(eventJoinEventConsumer);
        alert("deleted");
        // if success, update the UI
        // refresh data with SWR
        // https://benborgers.com/posts/swr-refresh

        // TO REFACTOR - these 2 actions should be in sync when display in UI
        mutate(getEventsJoinEventConsumerByEventId(eventData.id));
        setIsJoined(false); // very slow
      } catch (err) {
        alert(err);
      }
    };
    return (
      <>
        <button
          className={classNames(eventFunctionalitiesStyles.leaveEventBtn)}
          onClick={handleLeaveEventClick}
        >
          leave event
        </button>
        {/* <div>
          This event has been joined by the current authenticated consumer
        </div> */}
      </>
    );
  };

  const ConsumerFunctions = () => {
    return (
      <>
        {isVerified && !isJoined && <AddToCartBtn />}
        {isVerified && !isJoined && <JoinEventBtn />}
        {isVerified && isJoined && <LeaveEventBtn />}
      </>
    );
  };

  const ProviderFunctions = () => {
    return (
      <>
        {<div>I am {isOwnerOfEvent === true ? "" : "not"} the provider</div>}
        {isVerified && isOwnerOfEvent && (
          <>
            <button
              className={eventFunctionalitiesStyles.manageEventBtn}
              onClick={() => router.push("/dashboard")}
            >
              manage event
            </button>
          </>
        )}
      </>
    );
  };

  const GuestFunctions = () => {
    return (
      <>
        <AddToCartBtn />
        <JoinEventBtn />
      </>
    );
  };

  return (
    <>
      {role.role === "consumer" && <ConsumerFunctions />}
      {role.role === "provider" && <ProviderFunctions />}
      {!currentUser && <GuestFunctions />}
    </>
  );
};
