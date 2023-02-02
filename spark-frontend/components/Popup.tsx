import { useEffect, useState } from "react";
import PopupStyles from "../styles/popup.module.css";
import { useEvents } from "../utils/helper";
import { useCart } from "../utils/store";

export const Popup = ({ data }) => {
  const counter = useCart((state) => state.counter);
  const eventIdsInCart = useCart((state) => state.events); // eventIds
  const { events, isError, isLoading } = useEvents();
  const [eventsInCart, setEventsInCart] = useState([]);

  useEffect(() => {
    if (eventIdsInCart && events) {
      setEventsInCart(
        eventIdsInCart.map((id) => events.find((event) => event.id === id))
      );
    }
  }, [eventIdsInCart, events]);

  const handleSendEventsBtnClick = () => {
    console.log("implement sending events to server");
    console.log(eventsInCart);
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
