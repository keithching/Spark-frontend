import React, { useState, useEffect } from 'react'
import '../styles/Home.css';
import { getEvents } from '../utils/helper';
import { parseISO } from 'date-fns';

export default function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setEvents(await getEvents());
            } catch(err) {
                console.error(err);
            }
        }
        fetchData();
        setLoading(false);
    }, []);

    const Event = ({ event }) => {
        return (
            <div className="event-card-display">
                <div className="event-image">
                    <img src={event.imageURL} alt="" />
                </div>
                <h1>{event.title}</h1>
                <div>{event.eventProvider}</div>
                <div>{event.eventCategory}</div>
                <div>{event.location}</div>
                <div>{event.dateStart} ~ {event.dateEnd}</div>
            </div>
        );
    };

    const Loading = () => {
        return (
            <div>
                loading...
            </div>
        );
    }

    return (
    <div className="Home">
        <div className='event-card-display-container'>
            {events.length > 0 ?
                events.map(event => {
                    return (
                        <div key={event.id}>
                            <Event event={event} />
                        </div>
                    );
                })
                : !loading && events.length === 0 ?
                <span>null</span>
                : <Loading />}
        </div>
    </div>
  )
}
