import { useEffect, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import CartStyles from '../styles/cart.module.css';

export const Cart = () => {
    // TO UPDATE
    const [ counter, setCounter ] = useState<any>(localStorage.getItem('cartCounter') ? localStorage.getItem('cartCounter') : 0);

    const handleClick = () => {
        setCounter((prev) => Number(prev) + 1);
    }

    useEffect(() => {
        localStorage.setItem('cartCounter', counter);
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