import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../utils/store";
import { useEventsJoinEventConsumer, useRole } from "../../utils/helper";
import classNames from "classnames";
import eventFunctionalitiesStyles from "../../styles/eventFunctionalities.module.css";

export const EventFunctionalities = ({ eventData }) => {
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

  useEffect(() => {
    if (role.role === "provider" && role.name === eventData.eventProvider) {
      setIsOwnerOfEvent(true);
      setIsVerified(true);
    } else if (role.role === "provider") {
      setIsOwnerOfEvent(false);
      setIsVerified(true);
    }
  });

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

  const router = useRouter();

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
    <>
      {role.role === "consumer" && isVerified && !isJoined && (
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
      )}
      {role.role === "consumer" && isVerified && !isJoined && (
        <button
          className={classNames(
            eventFunctionalitiesStyles.eventBtn,
            eventFunctionalitiesStyles.joinEventBtn
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
    </>
  );
};
