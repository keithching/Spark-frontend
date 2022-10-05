import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEventByEventId } from '../utils/helper';

export default function Event() {
    const { eventId } = useParams();
    const [event, setEvent] = useState();

    useEffect(() => {
        (async () => {
            try {
                const eventData = await getEventByEventId(eventId);
                setEvent(eventData[0]);
            } catch(err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <div>
            {event && 
            <>
                <div className="event-image">
                    <img src={event.imageURL} alt="" />
                </div>
                <h1>{event.title}</h1>
                <div>{event.eventProvider}</div>
                <div>{event.eventCategory}</div>
                <div>{event.location}</div>
                <div>{event.dateStart} ~ {event.dateEnd}</div> 
            </>
        }
        </div>
    );
}