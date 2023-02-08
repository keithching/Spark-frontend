import { useEffect, useState } from "react";
import PopupStyles from "../styles/popup.module.css";
import {
  createEventsJoinEventConsumer,
  useEvents,
  useRole,
} from "../utils/helper";
import { useCart } from "../utils/store";
import { EventProps } from "../lib/customProp";
import { useAuth } from "../contexts/AuthContext";

export const Popup = ({ data }) => {
  const counter = useCart((state) => state.counter);
  const eventIdsInCart = useCart((state) => state.events); // eventIds
  const { currentUser } = useAuth();
  const { events, isError, isLoading } = useEvents();
  // const [eventsInCart, setEventsInCart] = useState<EventProps[]>([]);
  const { role } = useRole(currentUser.email);

  // useEffect(() => {
  //   if (eventIdsInCart && events) {
  //     setEventsInCart(
  //       eventIdsInCart.map((id) => events.find((event) => event.id === id))
  //     );
  //   }
  // }, [eventIdsInCart, events]);

  const handleSendEventsBtnClick = async () => {
    try {
      console.log("implement sending events to server");

      if (role.role !== "consumer") {
        console.log("not consumer. aborted submission");
        return;
      }

      const data = {
        eventIds: eventIdsInCart,
        // eventIds: [13, 12], // Hardcode - Temp only
        consumerId: role.id,
      };

      await createEventsJoinEventConsumer(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={PopupStyles["popup"]}>
      <div className={PopupStyles["popup-text"]}>
        {data}
        <button
          disabled={counter === 0}
          className={PopupStyles.sendEventsToServerBtn}
          onClick={handleSendEventsBtnClick}
        >
          send to server
        </button>
      </div>
    </div>
  );
};
