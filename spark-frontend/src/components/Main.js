import { useState, useEffect } from 'react';
import '../styles/Main.css';
import { getEventProviders } from '../utils/helper';

const Main = () => {
    const [ eventProviders, setEventProviders ] = useState([]);
    // const [ isFetched, setIsFetched ] = useState(false);
    useEffect(() => {
        async function fetchData () {
            setEventProviders(await getEventProviders());
        }
        fetchData();
    }, []);
    // useEffect(() => {
    //     if (eventProviders.length > 0) {

    //     }
    // })
    const handleClick = async () => {
        console.log(await getEventProviders());
    };
    
    const Loading = () => {
        return (
            <div>
                loading...
            </div>
        );
    }

    const EventProvider = (props) => {
        return (
            <div>hi</div>
        );
    }

    return (
        <div className='Main'>
            {/* <button onClick={handleClick}>main</button> */}
            { eventProviders.length > 0 ? 
                eventProviders.map(eventProvider => {
                    return (
                        <li key={eventProvider.id}>
                            {eventProvider.name}
                        </li>
                    );
                })
            : <Loading /> }
        </div>
    );
};

export default Main;