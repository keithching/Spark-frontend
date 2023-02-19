import classNames from "classnames";
import { useEffect, useState, useRef } from "react";
import { BsCart3 } from "react-icons/bs";
import CartStyles from "../../styles/cart.module.css";
import { useEvents } from "../../utils/helper";
import { useCart } from "../../utils/store";
import { Popup } from "./Popup";

export const Cart = ({ hamburgerIsClicked }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const counter = useCart((state) => state.counter);
  const eventCartStore = useCart((state) => state.events);
  const removeFromEvents = useCart((state) => state.removeFromEvents);
  const updateCounter = useCart((state) => state.updateCounter);
  const { events, isError, isLoading } = useEvents();

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
          <div key={event}>
            {/* <div>id: {event}</div> */}
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

  const CartDetails = () => {
    return <Popup data={data} hamburgerIsClicked={hamburgerIsClicked} />;
  };

  return (
    <>
      <div className={CartStyles.cartDiv}>
        <button
          className={classNames(CartStyles.cartBtn)}
          onClick={handleClick}
        >
          <BsCart3 />
          {counter}
        </button>
        {hamburgerIsClicked && isClicked && (
          <div className={classNames(CartStyles.cartDetail)}>
            <CartDetails />
          </div>
        )}
      </div>
      {!hamburgerIsClicked && isClicked && (
        <Popup data={data} hamburgerIsClicked={hamburgerIsClicked} />
      )}
    </>
  );
};
