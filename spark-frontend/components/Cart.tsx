import { useEffect, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import CartStyles from '../styles/cart.module.css';
import { useEvents } from '../utils/helper';
import { useCart } from '../utils/store';

export const Cart = () => {
    const [isClicked, setIsClicked] = useState(false);
    const counter = useCart((state) => state.counter);
    const eventCartStore = useCart((state) => state.events);
    const { events } = useEvents();

    const handleClick = () => {
        setIsClicked(prev => !prev);
        console.log(eventCartStore);
    }

    useEffect(() => {
        console.log(events);
    }, [events]);

    return (
        <>
            <button 
                className={CartStyles.cartButton}
                onClick={handleClick}
            >
                <BsCart3 />
                {counter}
            </button>
            {isClicked? 
                eventCartStore.map(event => {
                    return (
                        <div key={event}>
                            <div>id: {event}</div>
                            <div>name: {events.find(eve => eve.id === event).title}</div>
                        </div>
                    )
                })
                : null}
        </>
    );
}