import React, { useState, useEffect } from 'react'
import homeStyles from '../styles/home.module.css';
import { getEvents } from '../utils/helper';
import { parseISO } from 'date-fns';
import { useRouter } from 'next/router';
import {
    EventProps
} from '../lib/customProp';
import EventCategory from './EventCategory';

export default function Home() {
    const router = useRouter();
    const [events, setEvents] = useState<EventProps[]>([]);

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
                <div className={homeStyles["event-title"]}>{event.title}</div>
                {/* <div>{event.eventProvider}</div> */}
                <EventCategory category={event.eventCategory} />
                {/* <div>{event.location}</div> */}
                {/* <div>{event.dateStart} ~ {event.dateEnd}</div> */}
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
