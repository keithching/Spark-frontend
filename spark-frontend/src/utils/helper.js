import axios from 'axios';
import jpPrefecture from 'jp-prefecture';
// https://github.com/wadackel/jp-prefecture

const URL = 'https://spark-backend-app.herokuapp.com/api';
// const URL = 'http://localhost:4000/api';

// spark backend 
const EVENT_PROVIDER_URL = `${URL}/event_providers`;
const EVENT_CATEGORY_URL = `${URL}/event_categories`;
const EVENT_URL = `${URL}/events`;

// external public API
// const JAPAN_PREFECTURE_URL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
// https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html

const getEventProviders = async () => {
    const eventProviders = await axios.get(EVENT_PROVIDER_URL)
        .then(res => res.data);
    return eventProviders;
};

const getEventCategories = async () => {
    const eventCategories = await axios.get(EVENT_CATEGORY_URL).then(res => res.data);
    return eventCategories;
};

const getEvents = async () => {
    const events = await axios.get(EVENT_URL).then(res => res.data);
    return events;
};

const getEventsByEmail = async (email) => {
    const events = await axios.get(`${EVENT_URL}/${email}`).then(res => res.data);
    return events;
};

const getAllRegions = () => {
    return jpPrefecture.getAllRegion("name");
};

const getAllPrefectures = () => {
    return jpPrefecture.getAllPref("name");
};

const createEventProvider = async (eventProvider) => {
    try {
        await axios.post(EVENT_PROVIDER_URL, eventProvider).then(res => console.log(res));
    } catch (err) {
        console.error(err);
    }
};

const updateEventProviderByEmail = async (email, eventProvider) => {
    try {
        await axios.patch(`${EVENT_PROVIDER_URL}/${email}`, eventProvider).then(res => console.log(res));
    } catch (err) {
        console.error(err);
    }
}

const createEvent = async (event) => {
    try {
        await axios.post(EVENT_URL, event).then(res => console.log(res));
    } catch (err) {
        console.error(err);
    }
};

const updateEvent = async (event, id) => {
    try {
        await axios.patch(`${EVENT_URL}/${id}`, event).then(res => console.log(res));
    } catch (err) {
        console.error(err);
    }
};

const deleteEvent = async (id) => {
    try {
        await axios.delete(`${EVENT_URL}/${id}`).then(res => console.log(res));
    } catch (err) {
        console.error(err);
    }
};

export {
    getEventProviders,
    getEventCategories,
    getEvents,
    getEventsByEmail,
    getAllRegions,
    getAllPrefectures,
    createEventProvider,
    updateEventProviderByEmail,
    createEvent,
    updateEvent,
    deleteEvent
};