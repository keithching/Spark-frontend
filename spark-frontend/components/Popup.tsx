import { useEffect, useRef } from 'react';
import PopupStyles from '../styles/popup.module.css';
import { useCart } from '../utils/store';

export const Popup = ({ data }) => {
    const counter = useCart((state) => state.counter);
    const handleSendEventsBtnClick = () => {
        console.log('implement sending events to server');
    };

    return (
        <div className={PopupStyles["popup"]}>
            <div className={PopupStyles["popup-text"]}>
                {data}
                <button 
                    disabled={counter === 0}
                    className={PopupStyles.sendEventsToServerBtn}
                    onClick={handleSendEventsBtnClick}
                >send to server</button>
            </div>
        </div>
    );
}