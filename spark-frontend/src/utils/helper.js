import axios from 'axios';

const EVENT_PROVIDER_URL = 'https://spark-backend-app.herokuapp.com/api/event_providers';

const getEventProviders = async () => {
    const eventProviders = await axios.get(EVENT_PROVIDER_URL)
        .then(res => res.data);
    return eventProviders;
};

export {
    getEventProviders
};