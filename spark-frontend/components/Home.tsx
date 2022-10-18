import React, { useState, useEffect } from 'react'
import homeStyles from '../styles/home.module.css';
import { getEvents } from '../utils/helper';
import { parseISO, formatISO } from 'date-fns';
import { useRouter } from 'next/router';
import {
    EventProps
} from '../lib/customProp';
import Image from 'next/image';

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

    const EventCategory = ({ category }) => {
        return (
            <div className={homeStyles.eventCategory}>
                {category}
            </div>
      );
    }

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
                    <Image src={event.imageURL} alt="" />
                </div>
                <div className={homeStyles["event-title"]}>{event.title}</div>
                {/* <div className={homeStyles.eventProvider}>{event.eventProvider}</div> */}
                <EventCategory category={event.eventCategory} />
                <div className={homeStyles.eventLocation}>{event.location}</div>
                <div className={homeStyles.eventDate}>
                    {/* TO REFACTOR: parse date and formatting */}
                    {formatISO(parseISO(event.dateStart), { representation: 'date' })} ~ {formatISO(parseISO(event.dateEnd), { representation: 'date' })}
                </div>
            </div>
        );
    };

    return (
    <div className={homeStyles.Home}>
        <h1 className={homeStyles.header}>your next adventure awaits.</h1>
        {/* <div className={homeStyles.searchContainer}>
            <div className={homeStyles.searchParams}>
                <div>Host</div>
                <div>Category</div>
                <div>Location</div>
                <div>Time</div>
            </div>
            <div className={homeStyles.searchDiv}>
                <button type="button">Search</button>
            </div>
        </div> */}
        <div className={homeStyles["event-card-display-container"]}>
            {events.length > 0 &&
                events.map(event => {
                    return (
                        <Event event={event} key={event.id}/>
                    );
                })
            }
        </div>
    </div>
  )
}
