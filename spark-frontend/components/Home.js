import React, { useState, useEffect } from 'react'
import homeStyles from '../styles/home.module.css';
import { getEvents } from '../utils/helper';
import { parseISO } from 'date-fns';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setEvents(await getEvents());
            } catch(err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    const Event = ({ event }) => {
        const { id } = event;
        const navigateToEventPage = (id) => {
            // console.log(id);
            // https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
            // window.history.pushState({eventId: `${id}`}, `${event.title}`, `/event/${id}/`);
            // window.history.go(0); // go to the currrent point in history
            router.push(`/events/${id}/`);
        };

        return (
            <div 
                className={homeStyles["event-card-display"]}
                onClick={() => navigateToEventPage(id)}
            >
                <div className={homeStyles["event-image"]}>
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

    return (
    <div className={homeStyles.Home}>
        <div className={homeStyles["event-card-display-container"]}>
            {events.length > 0 &&
                events.map(event => {
                    return (
                        <div key={event.id}>
                            <Event event={event} />
                        </div>
                    );
                })
            }
        </div>
    </div>
  )
}
