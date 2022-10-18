import { useState, useEffect, useRef } from 'react';
import jpPrefecture from 'jp-prefecture';
import { createEvent, updateEvent, deleteEvent } from '../utils/helper';
import modalStyles from "../styles/modal.module.css";
import { IoClose } from 'react-icons/io5';
import { useAuth } from '../contexts/AuthContext';
import { uploadImageAsync } from '../utils/imageUpload';
import Image from 'next/image';

const Modal = (props) => {
    const { 
        modalContent,
        events,
        selectedEvent,
        setShowModal, 
        eventProviders, 
        eventCategories, 
        regions, 
    } = props;
    const { currentUser, adminEmail } = useAuth();
    const [ prefectures, setPrefectures ] = useState([]);
    const [ region, setRegion ] = useState(regions[0] || '');
    const [ photoURL, setPhotoURL ] = useState(null); // problem

    const titleRef = useRef<HTMLInputElement>(null);
    const providerRef = useRef<HTMLSelectElement>(null);
    const categoryRef= useRef<HTMLSelectElement>(null);
    const regionRef = useRef<HTMLSelectElement>(null);
    const prefectureRef = useRef<HTMLSelectElement>(null);
    const photoRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (region) {
            setPrefectures(jpPrefecture.prefFindByRegion(region, "name"));
        }
    }, [region]);

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        try {
            if (modalContent.operation === 'delete') {
                await deleteEvent(selectedEvent);
            } else if (modalContent.operation === 'create' ||
                modalContent.operation === 'edit') {
                // TODO. frontend form validation before creating event
                const titleInput = titleRef.current.value;
                const providerInput = providerRef.current.value;
                const categoryInput = categoryRef.current.value;
                const regionInput = regionRef.current.value;
                const prefectureInput = prefectureRef.current.value;
                
                // TODO. photo to be included

                const eventData = {
                    title: titleInput,
                    eventProvider: providerInput,
                    eventCategory: categoryInput,
                    location: prefectureInput + ', ' + regionInput,
                    imageURL: null
                };

                // console.log(eventData);

                if (modalContent.operation === 'create') {
                    // upload photo to firebase.
                    try {
                        const downloadURL = await uploadImageAsync(photoURL);
                        console.log(downloadURL);
                        // TODO. the data should include the photo. The backend endpoint should be able to pick up a photo
                        eventData.imageURL = downloadURL; // append to event data before sending
                        await createEvent(eventData); 
                    } catch(err) {
                        console.log(err);
                    }
                    // if success: grab the download URL. then createEvent
                        // if success: everything is fine. do a console log maybe for now
                        // if fail: delete the photo in firebase
                } else if (modalContent.operation === 'edit') {
                    const downloadURL = await uploadImageAsync(photoURL);
                    eventData.imageURL = downloadURL; // append to event data before sending
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
            <div className={modalStyles["modal-header"]}>
                <div></div>
                <header>{modalContent.title}</header>
                <IoClose onClick={handleClick} className={modalStyles["close-btn"]} />
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
                        ref={titleRef}
                        onChange={(e) => setTitle(e.target.value)}
                        required
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
                        ref={providerRef}
                        defaultValue={
                            currentUser && currentUser.email !== adminEmail ? currentUser.displayName :
                                eventToDisplay && modalContent.operation === 'edit' ? 
                                eventToDisplay.eventProvider
                                : ""
                        }
                    >

                        { currentUser && currentUser.email !== adminEmail ? <option value={currentUser.displayName}>{currentUser.displayName}</option>
                            :
                        eventProviders.length > 0 ? 
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
                        ref={categoryRef}
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
                        ref={regionRef}
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
                        ref={prefectureRef}
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

        // photo component
        const PhotoInput = () => {
            const [ photoFile, setPhotoFile ] = useState(null);
            const handlePhotoInputChange = (e) => {
                // console.log(photoRef.current.files[0]);

                // https://stackoverflow.com/questions/16215771/how-to-open-select-file-dialog-via-js
                let reader = new FileReader();
                reader.readAsDataURL(photoRef.current.files[0]);
                setPhotoFile(photoRef.current.files[0]); // is this state necessary?
    
                reader.onload = readerEvent => {
                    // console.log(readerEvent.target.result);
                    // problem: setting state also causes re-rendering
                    setPhotoURL(readerEvent.target.result); // data url for the file    
                }
            };

            useEffect(() => {
                if (photoFile) console.log(photoFile);
            }, [photoFile]);

            return (
                <>
                    <input 
                        type="file" 
                        name="photoInput" 
                        id="photoInput" 
                        ref={photoRef}
                        onChange={handlePhotoInputChange}
                    />
                </>
            );
        };

        const PhotoPreview = () => {
            return (
                eventToDisplay && modalContent.operation === 'edit' ?
                    !photoURL && eventToDisplay.imageURL !== null ?
                        <Image 
                            src={eventToDisplay.imageURL} 
                            alt="" 
                            width={400}
                            height={400}
                        /> :
                        photoURL ? 
                            <Image 
                                src={photoURL} 
                                alt="" 
                                width={400}
                                height={400}
                            /> :
                        <div>photo not available</div>
                : photoURL ? 
                    <Image 
                        src={photoURL} 
                        alt="" 
                        width={400}
                        height={400}
                    /> :
                    <div>upload a photo</div>
            );
        };

        return (
            <div className={modalStyles["modal-main"]}>
                <form 
                    action="" 
                    className={modalStyles["modal-form"]}
                    onSubmit={handleFormSubmission} 
                >
                    {modalContent.operation !== 'delete' ?
                        <div className={modalStyles["modal-form-content"]}>
                            <div className={modalStyles["modal-form-content-left"]}>
                                <TitleInput />
                                <ProviderInput />
                                <CategoryInput />
                                <RegionInput />
                                <PrefectureInput />
                                <PhotoInput />
                            </div>
                            <div className={modalStyles["modal-form-content-right"]}>
                                <PhotoPreview />
                            </div>
                        </div>
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
        <div className={modalStyles["modal"]} style={modalStyle}>
        <div className={modalStyles["modal-content"]}>
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