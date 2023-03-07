import classNames from "classnames";
import { useEffect, useState, useRef } from "react";
import { BsCart3 } from "react-icons/bs";
import CartStyles from "../../styles/cart.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useEvents, useRole } from "../../utils/helper";
import { useCart } from "../../utils/store";
import { Popup } from "./Popup";
import { useRouter } from "next/router";

export const Cart = ({ hamburgerIsClicked }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>();
  const counter = useCart((state) => state.counter);
  const eventCartStore = useCart((state) => state.events);
  const removeFromEvents = useCart((state) => state.removeFromEvents);
  const updateCounter = useCart((state) => state.updateCounter);
  const eventIdsInCart = useCart((state) => state.events); // eventIds
  const resetCart = useCart((state) => state.reset);
  const { events, isError, isLoading } = useEvents();
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  const handleRemoveEventClick = (id) => {
    removeFromEvents(id);
    updateCounter();
  };

  const data =
    eventCartStore.length === 0 ? (
      <div>add your first event</div>
    ) : !isLoading ? (
      eventCartStore.map((event) => {
        return (
          <div key={event} data-cy="popup-event">
            <div>{events.find((eve) => eve.id === event).title}</div>
            <button onClick={() => handleRemoveEventClick(event)}>
              remove
            </button>
          </div>
        );
      })
    ) : (
      "Loading"
    );

  return (
    <>
      <div className={CartStyles.cartDiv} ref={cartRef} data-cy="cart">
        <button
          className={classNames(CartStyles.cartBtn)}
          onClick={handleClick}
        >
          <BsCart3 />
          {counter}
        </button>

        {hamburgerIsClicked && isClicked && (
          <div className={classNames(CartStyles.cartDetail)}>
            <Popup
              data={data}
              hamburgerIsClicked={hamburgerIsClicked}
              currentUser={currentUser}
            />
          </div>
        )}
      </div>
      {!hamburgerIsClicked && isClicked && (
        <Popup
          data={data}
          hamburgerIsClicked={hamburgerIsClicked}
          currentUser={currentUser}
        />
      )}
    </>
  );
};
