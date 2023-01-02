import { useEffect, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import CartStyles from '../styles/cart.module.css';

export const Cart = () => {
    // TO UPDATE
    const [ counter, setCounter ] = useState<any>(JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).counter : 0);

    const handleClick = () => {
        setCounter((prev) => Number(prev) + 1);
    }

    useEffect(() => {
        const cart = {
            counter: counter,
            events: []
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [counter]);

    return (
        <button 
            className={CartStyles.cartButton}
            onClick={handleClick}
        >
            <BsCart3 />
            {counter}
        </button>
    );
}