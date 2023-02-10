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
  const resetCart = useCart((state) => state.reset);
  const { currentUser } = useAuth();
  const { role } = useRole(currentUser?.email);

  const handleSendEventsBtnClick = async () => {
    try {
      if (role.role !== "consumer") {
        console.log("not consumer. aborted submission");
        return;
      }

      const data = {
        eventIds: eventIdsInCart,
        consumerId: role.id,
      };

      await createEventsJoinEventConsumer(data);
      resetCart(); // reset cart after successful POST request
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={PopupStyles["popup"]}>
      <div className={PopupStyles["popup-text"]}>
        {data}
        <button
          disabled={counter === 0 || !currentUser}
          className={PopupStyles.sendEventsToServerBtn}
          onClick={handleSendEventsBtnClick}
        >
          {currentUser ? "send to server" : "login to join event"}
        </button>
      </div>
    </div>
  );
};
