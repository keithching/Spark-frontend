import axios from 'axios';
import jpPrefecture from 'jp-prefecture';
// https://github.com/wadackel/jp-prefecture

// spark backend 
const EVENT_PROVIDER_URL = 'https://spark-backend-app.herokuapp.com/api/event_providers';
const EVENT_CATEGORY_URL = 'https://spark-backend-app.herokuapp.com/api/event_categories';
const EVENT_URL = 'https://spark-backend-app.herokuapp.com/api/events';

// http://localhost:3000/api/events
// https://spark-backend-app.herokuapp.com/api/events

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

const getAllRegions = () => {
    return jpPrefecture.getAllRegion("name");
};

const getAllPrefectures = () => {
    return jpPrefecture.getAllPref("name");
};

const createEvent = async (event) => {
    try {
        await axios.post(EVENT_URL, event).then(res => console.log(res));
    } catch (err) {
        console.error(err);
    }
};

const updateEvent = async (event, id) => {
    console.log(event);
    console.log(id);

    try {
        await axios.patch(`${EVENT_URL}/${id}`, event).then(res => console.log(res));
    } catch (err) {
        console.error(err);
    }
};

export {
    getEventProviders,
    getEventCategories,
    getEvents,
    getAllRegions,
    getAllPrefectures,
    createEvent,
    updateEvent
};