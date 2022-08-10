import { useState, useEffect } from 'react';
import '../styles/Main.css';
import { 
    getEventProviders, 
    getEventCategories, 
    getEvents, 
    getAllRegions, 
    getAllPrefectures,
} from '../utils/helper';
import Modal from './Modal';

const Main = () => {
    const [ eventProviders, setEventProviders ] = useState([]);
    const [ eventCategories, setEventCategories ] = useState([]);
    const [ events, setEvents ] = useState([]);
    const [ showAddEventModal, setShowAddEventModal ] = useState(false);
    const [ regions, setRegions ] = useState([]);
    const [ prefectures, setPrefectures ] = useState([]);
    
    useEffect(() => {
        async function fetchData () {
            setEventProviders(await getEventProviders());
            setEventCategories(await getEventCategories());
            setEvents(await getEvents());
            setRegions(await getAllRegions());
            // setPrefectures(await getAllPrefectures());
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function updateData () {
            setEvents(await getEvents());
        }
        updateData();
    }, [showAddEventModal]);

    const Loading = () => {
        return (
            <div>
                loading...
            </div>
        );
    }

    const EventProvider = (props) => {
        const { eventProvider } = props;
        return (
            <li>
                {eventProvider.name}
            </li>
        );
    }

    const Event = (props) => {
        const { event } = props;
        return (
            <div className="event-card">
                <div>Title: {event.title}</div>
                <div>Provider: {event.eventProvider}</div>
                <div>Category: {event.eventCategory}</div>
                <div>Location: {event.location}</div>
                <div>Date: {event.dateStart} ~ {event.dateEnd}</div>
            </div>
        );
    }

    const handleAddEventClick = () => {
        setShowAddEventModal((prev) => !prev);
    };

    const EventProviders = () => {
        return (
            <>
            <h1>Event Providers</h1>
            { eventProviders.length > 0 ? 
                eventProviders.map(eventProvider => {
                    return (
                        <EventProvider 
                            eventProvider={eventProvider} 
                            key={eventProvider.id} 
                        />
                    );
                })
            : <Loading /> }
            </>
        );
    };

    const Events = () => {
        return (
            <>
                <h1>Events</h1>
                <div className='event-cards'>
                    { events.length > 0 ? 
                        events.map(event => {
                            return (
                                <Event 
                                    event={event}
                                    key={event.id}
                                />
                            );
                        })
                    : <Loading /> }
                </div>
                <button onClick={handleAddEventClick}>add event</button>
            </>
        );
    };

    const EventCategories = () => {
        return (
            <>
                <h1>Event Categories</h1>
                { eventCategories.length > 0 ? 
                    eventCategories.map(eventCategory => {
                        return (
                            <EventCategory 
                                eventCategory={eventCategory} 
                                key={eventCategory.id} 
                            />
                        );
                    })
                : <Loading /> }
            </>
        );
    };

    const EventCategory = (props) => {
        const { eventCategory } = props;
        return (
            <li>
                {eventCategory.name}
            </li>
        );
    }

    return (
        <div className='Main'>
            <EventProviders />
            <EventCategories />
            <Events />
            {showAddEventModal ? 
                <Modal 
                    setShowAddEventModal={setShowAddEventModal} 
                    eventProviders={eventProviders}
                    eventCategories={eventCategories}
                    regions={regions}
                    prefectures={prefectures}
                    setPrefectures={setPrefectures}
                /> 
                : null }
        </div>
    );
};

export default Main;