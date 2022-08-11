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
// import EditEventModal from './EditEventModal';
import { GrAddCircle } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
// https://react-icons.github.io/react-icons

const Main = () => {
    const [ eventProviders, setEventProviders ] = useState([]);
    const [ eventCategories, setEventCategories ] = useState([]);
    const [ events, setEvents ] = useState([]);
    const [ regions, setRegions ] = useState([]);
    const [ prefectures, setPrefectures ] = useState([]);
    
    const [ showModal, setShowModal ] = useState(false);
    const [ modalContent, setModalContent ] = useState({
        title: "", // title for the modal
        operation: "" // create, edit, delete
    });
    // const [ showEditEventModal, setShowEditEventModal ] = useState(false);
    const [ selectedEvent, setSelectedEvent ] = useState(null);

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

    useEffect(() => { // update the event divs in the DOM
        async function updateData () {
            setEvents(await getEvents());
        }
        updateData();
    }, [showModal]);

    useEffect(() => {
        if (selectedEvent) console.log(selectedEvent);
    }, [selectedEvent]);

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

        const handleEditEventClick = () => {
            setSelectedEvent(event.id);
            setModalContent({
                title: "Edit Event",
                operation: "edit"
            });
            setShowModal((prev) => !prev);
        };

        return (
            <div className="event-card">
                <div>Title: {event.title}</div>
                <div>Provider: {event.eventProvider}</div>
                <div>Category: {event.eventCategory}</div>
                <div>Location: {event.location}</div>
                <div>Date: {event.dateStart} ~ {event.dateEnd}</div>
                <div className="event-function-btn-container">
                    <FiEdit className='edit-event-btn' onClick={handleEditEventClick}/>
                    <RiDeleteBinLine className='delete-event-btn' />
                </div>
            </div>
        );
    }

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
        const handleAddEventClick = () => {
            setModalContent({
                title: "Add Event",
                operation: "create"
            });
            setShowModal((prev) => !prev);
        };

        return (
            <>
                <header className="events-header">
                    <h1>Events</h1>
                    <GrAddCircle onClick={handleAddEventClick} id="add-event-btn"/>
                </header>
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
            {showModal && Object.keys(modalContent).length > 0 ? 
                <Modal
                    modalContent={modalContent}
                    events={events}
                    selectedEvent={selectedEvent}
                    setShowModal={setShowModal} 
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