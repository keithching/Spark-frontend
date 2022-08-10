import { useState, useEffect } from 'react';
import jpPrefecture from 'jp-prefecture';
import { createEvent } from '../utils/helper';
import "../styles/Modal.css";

const Modal = (props) => {
    const { 
        setShowAddEventModal, 
        eventProviders, 
        eventCategories, 
        regions, 
        prefectures, 
        setPrefectures 
    } = props;
    const [ title, setTitle ] = useState('');
    const [ provider, setProvider ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ region, setRegion ] = useState('');
    const [ prefecture, setPrefecture ] = useState('');

    const handleClick = () => {
        setPrefectures([]); // reset
        setShowAddEventModal((prev) => !prev);
      };
    
      const handleFormSubmission = async (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('title-input').value;
        const providerInput = document.getElementById('provider-input').value;
        const categoryInput = document.getElementById('category-input').value;
        const regionInput = document.getElementById('region-input').value;
        const prefectureInput = document.getElementById('prefecture-input').value;

        const newEvent = {
            title: titleInput,
            eventProvider: providerInput,
            eventCategory: categoryInput,
            location: prefectureInput + ', ' + regionInput
        };
        // frontend form validation before creating event
        try {
            await createEvent(newEvent);
        } catch (err) {
            console.error(err);
        }
        setShowAddEventModal((prev) => !prev);
      };

      useEffect(() => {
        if (region) {
            setPrefectures(jpPrefecture.prefFindByRegion(region, "name"));
        }
      }, [region]);

    //   useEffect(() => {
    //       if (title && provider && category && region && prefecture) {

    //       }
    //   }, [title, provider, category, region, prefecture]);

    return (
        <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <div></div>
            <header>Add Event</header>
            <button onClick={handleClick}>close</button>
          </div>
          <div className="modal-main">
            <form 
                action="" 
                className="modal-form"
                onSubmit={handleFormSubmission} 
            >
                <label htmlFor="title-input">*Title</label>
                <input 
                    type="text"
                    placeholder="title"
                    id="title-input"
                    autoComplete='off'
                />
                <label htmlFor="provider-input">*Provider</label>
                <select name="provider" id="provider-input">
                    { eventProviders.length > 0 ? 
                        eventProviders.map(eventProvider => {
                            return (
                                <option key={eventProvider.id}>
                                    {eventProvider.name}
                                </option>
                            );
                        })
                    :null }
                </select>
                <label htmlFor="category-input">*Category</label>
                <select name="category" id="category-input">
                    { eventCategories.length > 0 ? 
                        eventCategories.map(eventCategory => {
                            return (
                                <option key={eventCategory.id}>
                                    {eventCategory.name}
                                </option>
                            );
                        })
                    :null }
                </select>
                <label htmlFor="region-input">*Region</label>
                <select name="region" id="region-input" onChange={(e) => setRegion(e.target.value)}>
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
                <label htmlFor="prefecture-input">*Prefecture</label>
                <select name="prefecture" id="prefecture-input">
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
                <button 
                    type="submit" 
                    id="form-submit-btn"
                >
                    add
                </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Modal;