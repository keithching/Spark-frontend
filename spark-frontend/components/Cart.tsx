import { useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import CartStyles from '../styles/cart.module.css';

export const Cart = () => {
    // TO UPDATE
    const [ counter, setCounter ] = useState<number>(0);

    const handleClick = () => {
        // TO UPDATE
        setCounter((prev) => prev + 1);
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