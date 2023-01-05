import { useEffect, useRef } from 'react';
import PopupStyles from '../styles/popup.module.css';

export const Popup = ({ data }) => {

    return (
        <div className={PopupStyles["popup"]}>
            <div className={PopupStyles["popup-text"]}>
                {data}
            </div>
        </div>
    );
}