import { useEffect, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import CartStyles from '../styles/cart.module.css';
import { useEvents } from '../utils/helper';
import { useCart } from '../utils/store';
import { Popup } from './Popup';

export const Cart = () => {
    const [isClicked, setIsClicked] = useState(false);

    const counter = useCart((state) => state.counter);
    const eventCartStore = useCart((state) => state.events);
    const removeFromEvents = useCart((state) => state.removeFromEvents);
    const updateCounter = useCart((state) => state.updateCounter);

    const { events, isError, isLoading } = useEvents();

    const handleClick = () => {
        setIsClicked(prev => !prev);
        console.log(eventCartStore);
    }

    const handleRemoveEventClick = (id) => {
        removeFromEvents(id);
        updateCounter();
    }

    useEffect(() => {
        console.log(events);
    }, [events]);

    const data = eventCartStore.length === 0 ?
        <div>empty</div> :
        !isLoading ?
        eventCartStore.map(event => {
            return (
                <div key={event}>
                    <div>id: {event}</div>
                    <div>name: {events.find(eve => eve.id === event).title}</div>
                    <button onClick={() => handleRemoveEventClick(event)}>remove</button>
                </div>
            )
        })
        : "Loading";

    return (
        <>
            <button 
                className={CartStyles.cartButton}
                onClick={handleClick}
            >
                <BsCart3 />
                {counter}
            </button>
            {isClicked && <Popup data={data} />}
        </>
    );
}