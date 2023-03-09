import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../utils/store";
import {
  useEventsJoinEventConsumerByEmail,
  useRole,
  deleteEventsJoinEventConsumer,
  useEventsJoinEventConsumerByEventId,
  getEventsJoinEventConsumerByEventId,
  createEventsJoinEventConsumer,
} from "../../utils/helper";
import classNames from "classnames";
import eventFunctionalitiesStyles from "../../styles/eventFunctionalities.module.css";

export const EventFunctionalities = ({ eventData }) => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { role } = useRole(currentUser?.email);
  const { eventsJoinEventConsumer } = useEventsJoinEventConsumerByEmail(
    currentUser?.email
  );
  const { mutate } = useEventsJoinEventConsumerByEventId(eventData?.id);
  const isJoined = useRef<boolean | "1">("1");
  const isVerified = useRef<boolean>(false); // set it to true after the user is identified whether he/she has joined an event
  const [isOwnerOfEvent, setIsOwnerOfEvent] = useState<boolean | string>("1");

  useEffect(() => {
    if (
      role.role === "consumer" &&
      eventsJoinEventConsumer &&
      eventsJoinEventConsumer.find((event) => event.event_id === eventData.id)
    ) {
      isJoined.current = true;
    } else if (eventsJoinEventConsumer) {
      isJoined.current = false;
    }
  }, [role, eventsJoinEventConsumer, eventData]);

  useEffect(() => {
    if (
      role.role === "consumer" &&
      eventsJoinEventConsumer &&
      (isJoined.current || !isJoined.current)
    ) {
      isVerified.current = true;
    }
  }, [role, isJoined, eventsJoinEventConsumer]);

  useEffect(() => {
    if (role.role === "provider" && role.name === eventData.eventProvider) {
      setIsOwnerOfEvent(true);
      isVerified.current = true;
    } else if (role.role === "provider") {
      setIsOwnerOfEvent(false);
      isVerified.current = true;
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
        data-cy="add-to-cart-button"
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
        isJoined.current = true;
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
        data-cy="join-event-button"
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
        isJoined.current = false; // very slow - not trigger the UI update
      } catch (err) {
        alert(err);
      }
    };
    return (
      <>
        <button
          className={classNames(eventFunctionalitiesStyles.leaveEventBtn)}
          onClick={handleLeaveEventClick}
          data-cy="leave-event-button"
        >
          leave event
        </button>
      </>
    );
  };

  const ConsumerFunctions = () => {
    return (
      <>
        {isVerified.current && !isJoined.current && <AddToCartBtn />}
        {isVerified.current && !isJoined.current && <JoinEventBtn />}
        {isVerified.current && isJoined.current && <LeaveEventBtn />}
      </>
    );
  };

  const ProviderFunctions = () => {
    return (
      <>
        {<div>I am {isOwnerOfEvent === true ? "" : "not"} the provider</div>}
        {isVerified.current && isOwnerOfEvent && (
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
    <div className={classNames(eventFunctionalitiesStyles.containerDiv)}>
      {role.role === "consumer" && <ConsumerFunctions />}
      {role.role === "provider" && <ProviderFunctions />}
      {!currentUser && <GuestFunctions />}
    </div>
  );
};
