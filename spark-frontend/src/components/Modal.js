import { useState, useEffect } from 'react';
import jpPrefecture from 'jp-prefecture';
import { createEvent, updateEvent } from '../utils/helper';
import "../styles/Modal.css";
import { IoClose } from 'react-icons/io5';

const Modal = (props) => {
    const { 
        modalContent,
        events,
        selectedEvent,
        setShowModal, 
        eventProviders, 
        eventCategories, 
        regions, 
        prefectures, 
        setPrefectures 
    } = props;
    const [ region, setRegion ] = useState('');

    const handleClick = () => {
        setPrefectures([]); // reset
        setShowModal((prev) => !prev);
      };
    
    const handleFormSubmission = async (e) => {
        e.preventDefault();
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
        // frontend form validation before creating event
        try {
            if (modalContent.operation === 'create') {
                await createEvent(eventData);
            } else if (modalContent.operation === 'edit') {
                // TODO. update an event
                await updateEvent(eventData, selectedEvent);
            } else if (modalContent.operation === 'delete') {
                // TODO. delete an event
            }
        } catch (err) {
            console.error(err);
        }
        setShowModal((prev) => !prev);
    };

    useEffect(() => {
        if (region) {
            setPrefectures(jpPrefecture.prefFindByRegion(region, "name"));
        }
    }, [region]);

    const [ eventToDisplay, setEventToDisplay ] = useState(null);
    useEffect(() => {
        if (events && selectedEvent) {
            setEventToDisplay(events.find(event => event.id === selectedEvent));
        }
    }, [events, selectedEvent]);

    useEffect(() => {
        // if (eventToDisplay) console.log(eventToDisplay.title);
        // if (modalContent) console.log(modalContent);
    }, [eventToDisplay, modalContent]);

    const ModalHeader = () => {
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
            return (
                <>
                    <label htmlFor="title-input">*Title</label>
                    <input 
                        type="text"
                        placeholder="title"
                        id="title-input"
                        autoComplete='off'
                        defaultValue={
                            eventToDisplay && modalContent.operation === 'edit' ? 
                            eventToDisplay.title 
                            : ""
                        }
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
                    <TitleInput />
                    <ProviderInput />
                    <CategoryInput />
                    <RegionInput />
                    <PrefectureInput />
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
      
    return (
        <div className="modal">
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