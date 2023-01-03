import { useEffect, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import CartStyles from '../styles/cart.module.css';
import { useCart } from '../utils/store';

export const Cart = () => {
    const counter = useCart((state) => state.counter);

    const handleClick = () => {
        // setCounter((prev) => Number(prev) + 1);
    }
    
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