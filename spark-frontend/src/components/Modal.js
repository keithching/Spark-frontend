import { useState, useEffect } from 'react';
import jpPrefecture from 'jp-prefecture';
import { createEvent, updateEvent, deleteEvent } from '../utils/helper';
import "../styles/Modal.css";
import { IoClose } from 'react-icons/io5';

const Modal = (props) => {
    const { 
        modalContent,
        events,
        selectedEvent,
        showModal,
        setShowModal, 
        eventProviders, 
        eventCategories, 
        regions, 
    } = props;
    const [ prefectures, setPrefectures ] = useState([]);
    const [ region, setRegion ] = useState('');
    useEffect(() => {
        if (region) {
            setPrefectures(jpPrefecture.prefFindByRegion(region, "name"));
        }
    }, [region]);

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        try {
            if (modalContent.operation === 'delete') {
                // TODO. delete an event
                await deleteEvent(selectedEvent);
            } else if (modalContent.operation === 'create' ||
                modalContent.operation === 'edit') {
                // TODO. frontend form validation before creating event
                const titleInput = document.getElementById('title-input').value;
                const providerInput = document.getElementById('provider-input').value;
                const categoryInput = document.getElementById('category-input').value;
                const regionInput = document.getElementById('region-input').value;
                const prefectureInput = document.getElementById('prefecture-input').value;
        
                const eventData = {
                    title: titleInput,
                    eventProvider: providerInput,
                    eventCategory: categoryInput,
                    location: prefectureInput + ', ' + regionInput
                };

                if (modalContent.operation === 'create') {
                    await createEvent(eventData);
                } else if (modalContent.operation === 'edit') {
                    await updateEvent(eventData, selectedEvent);
                }
            }
        } catch (err) {
            console.error(err);
        }

        setShowModal((prev) => !prev);
    };

    const [ eventToDisplay, setEventToDisplay ] = useState(null);
    useEffect(() => {
        if (events && selectedEvent) {
            setEventToDisplay(events.find(event => event.id === selectedEvent));
        }
    }, [events, selectedEvent]);

    const ModalHeader = () => {
        const handleClick = () => {
            setPrefectures([]); // reset
            setShowModal((prev) => !prev);
        };

        return (
            <div className="modal-header">
                <div></div>
                <header>{modalContent.title}</header>
                <IoClose onClick={handleClick} className="close-btn" />
          </div>
        );
    }

    const ModalMain = () => {
        const TitleInput = () => {
            const [ title, setTitle ] = useState(
                eventToDisplay && modalContent.operation === 'edit' ? 
                eventToDisplay.title 
                : ''
            );

            return (
                <>
                    <label htmlFor="title-input">*Title</label>
                    <input 
                        type="text"
                        placeholder="title"
                        id="title-input"
                        autoComplete='off'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </>
            );
        };

        const ProviderInput = () => {
            return (
                <>
                    <label htmlFor="provider-input">*Provider</label>
                    <select 
                        name="provider" 
                        id="provider-input"
                        defaultValue={
                            eventToDisplay && modalContent.operation === 'edit' ? 
                            eventToDisplay.eventProvider
                            : ""
                        }
                    >
                        { eventProviders.length > 0 ? 
                            eventProviders.map(eventProvider => {
                                return (
                                    <option 
                                        key={eventProvider.id} 
                                        value={eventProvider.name}
                                    >
                                        {eventProvider.name}
                                    </option>
                                );
                            })
                        :null }
                    </select>
                </>
            );
        }

        const CategoryInput = () => {
            return (
                <>
                    <label htmlFor="category-input">*Category</label>
                    <select 
                        name="category" 
                        id="category-input"
                        defaultValue={
                            eventToDisplay && modalContent.operation === 'edit' ? 
                            eventToDisplay.eventCategory
                            : ""
                        }
                    >
                        { eventCategories.length > 0 ? 
                            eventCategories.map(eventCategory => {
                                return (
                                    <option 
                                        key={eventCategory.id}
                                        value={eventCategory.name}
                                    >
                                        {eventCategory.name}
                                    </option>
                                );
                            })
                        :null }
                    </select>
                </>
            );
        };

        const RegionInput = () => {

            return (
                <>
                    <label htmlFor="region-input">*Region</label>
                    <select 
                        name="region" 
                        id="region-input" 
                        onChange={(e) => setRegion(e.target.value)}
                        value={region}
                    >
                        { regions.length > 0 ? 
                            regions.map(region => {
                                return (
                                    <option key={region}>
                                        {region}
                                    </option>
                                );
                            })
                        :null }
                    </select>
                </>
            );
        };

        const PrefectureInput = () => {
            return (
                <>
                    <label htmlFor="prefecture-input">*Prefecture</label>
                    <select 
                        name="prefecture" 
                        id="prefecture-input"
                    >
                        { prefectures.length > 0 ? 
                            prefectures.map(prefecture => {
                                return (
                                    <option key={prefecture}>
                                        {prefecture}
                                    </option>
                                );
                            })
                        :null }
                    </select>
                </>
            );
        };

        return (
            <div className="modal-main">
                <form 
                    action="" 
                    className="modal-form"
                    onSubmit={handleFormSubmission} 
                >
                    {modalContent.operation !== 'delete' ?
                        <>
                            <TitleInput />
                            <ProviderInput />
                            <CategoryInput />
                            <RegionInput />
                            <PrefectureInput />
                        </>
                    : null}
                    <button 
                        type="submit" 
                        id="form-submit-btn"
                    >
                        {modalContent.operation}
                    </button>
                </form>
          </div>
        );
    }
      
    const modalStyle = {
        top: `${window.scrollY}px`
    };

    return (
        <div className="modal" style={modalStyle}>
        <div className="modal-content">
            { modalContent ?
            <>
                <ModalHeader />
                <ModalMain />
            </>
            : null }
        </div>
      </div>
    );
};

export default Modal;