import axios from "axios";
import jpPrefecture from "jp-prefecture";
// https://github.com/wadackel/jp-prefecture

// client-side data fetching with swr
// https://swr.vercel.app/docs/getting-started
import useSWR from "swr";

const URL = "https://spark-backend-app.herokuapp.com/api";
// const URL = "http://localhost:4000/api";

// spark backend
const EVENT_PROVIDER_URL = `${URL}/event_providers`;
const EVENT_CONSUMER_URL = `${URL}/event_consumers`;
const EVENT_CATEGORY_URL = `${URL}/event_categories`;
const EVENT_URL = `${URL}/events`;
const EVENTS_JOIN_EVENT_CONSUMER_URL = `${URL}/events_event_consumers`;

// external public API
// const JAPAN_PREFECTURE_URL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
// https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html

// https://stackoverflow.com/questions/34179897/typescript-and-spread-operator
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// getting event provider by email
export function useEventProvider(email) {
  const { data, error, isLoading } = useSWR(
    `${EVENT_PROVIDER_URL}/${email}`,
    fetcher
  );

  return {
    eventProvider: data,
    isLoadingEP: isLoading,
    isErrorEP: error,
  };
}

export function useEventConsumer(email) {
  const { data, error, isLoading } = useSWR(
    `${EVENT_CONSUMER_URL}/${email}`,
    fetcher
  );

  return {
    eventConsumer: data,
    isLoadingEC: isLoading,
    isErrorEC: error,
  };
}

export function useRole(email) {
  const { eventProvider, isLoadingEP, isErrorEP } = useEventProvider(email);
  const { eventConsumer, isLoadingEC, isErrorEC } = useEventConsumer(email);

  let role: any = {};

  if (eventProvider) {
    role = { ...eventProvider };
    role.role = "provider";
  }

  if (eventConsumer) {
    role = { ...eventConsumer };
    role.role = "consumer";
  }

  return {
    role,
    isError: isErrorEP && isErrorEC,
    isLoading: isLoadingEP && isLoadingEC,
  };
}

export function useEventsJoinEventConsumerByEmail(consumerEmail) {
  const { data, error, isLoading } = useSWR(
    `${EVENTS_JOIN_EVENT_CONSUMER_URL}/${consumerEmail}`,
    fetcher
  );

  return {
    eventsJoinEventConsumer: data,
    isLoadingEJEC: isLoading,
    isErrorEJEC: error,
  };
}

export function useEventsJoinEventConsumerByEventId(eventId) {
  const { data, error, isLoading } = useSWR(
    `${EVENTS_JOIN_EVENT_CONSUMER_URL}/${eventId}`,
    fetcher
  );

  return {
    eventsJoinEventConsumer: data,
    isLoadingEJEC: isLoading,
    isErrorEJEC: error,
  };
}

const getEventConsumers = async () => {
  const eventConsumers = await axios
    .get(EVENT_CONSUMER_URL)
    .then((res) => res.data);
  return eventConsumers;
};

const getEventProviders = async () => {
  const eventProviders = await axios
    .get(EVENT_PROVIDER_URL)
    .then((res) => res.data);
  return eventProviders;
};

export function useEventProviders() {
  const { data, error, isLoading } = useSWR(`${EVENT_PROVIDER_URL}`, fetcher);

  return {
    eventProviders: data,
    isLoading: isLoading,
    isError: error,
  };
}

const getEventCategories = async () => {
  const eventCategories = await axios
    .get(EVENT_CATEGORY_URL)
    .then((res) => res.data);
  return eventCategories;
};

const getEvents = async () => {
  const events = await axios.get(EVENT_URL).then((res) => res.data);
  return events;
};

export function useEvents() {
  const { data, error, isLoading } = useSWR(`${EVENT_URL}`, fetcher);

  return {
    events: data,
    isLoading,
    isError: error,
  };
}

const getAllEventIds = async () => {
  const events = await axios.get(EVENT_URL).then((res) => res.data);
  const ids = events.map((event) => {
    return {
      params: {
        id: event.id.toString(),
      },
    };
  });
  return ids;
};

const getEventsByEmail = async (email: string) => {
  const events = await axios
    .get(`${EVENT_URL}/${email}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return events;
};

const getEventByEventId = async (id: string | number) => {
  const event = await axios.get(`${EVENT_URL}/${id}`).then((res) => res.data);
  return event[0];
};

const getAllRegions = () => {
  return jpPrefecture.getAllRegion("name");
};

const getAllPrefectures = () => {
  return jpPrefecture.getAllPref("name");
};

const createEventConsumer = async (eventConsumer: object) => {
  try {
    await axios
      .post(EVENT_CONSUMER_URL, eventConsumer)
      .then((res) => console.log(res));
  } catch (err) {
    console.error(err);
  }
};

const createEventProvider = async (eventProvider: object) => {
  try {
    await axios
      .post(EVENT_PROVIDER_URL, eventProvider)
      .then((res) => console.log(res));
  } catch (err) {
    console.error(err);
  }
};

const updateEventProviderByEmail = async (
  email: string,
  eventProvider: object
) => {
  try {
    await axios
      .patch(`${EVENT_PROVIDER_URL}/${email}`, eventProvider)
      .then((res) => console.log(res));
  } catch (err) {
    console.error(err);
  }
};

const updateEventConsumerByEmail = async (
  email: string,
  eventConsumer: object
) => {
  try {
    await axios
      .patch(`${EVENT_CONSUMER_URL}/${email}`, eventConsumer)
      .then((res) => console.log(res));
  } catch (err) {
    console.error(err);
  }
};

const createEvent = async (event) => {
  try {
    await axios.post(EVENT_URL, event).then((res) => console.log(res));
  } catch (err) {
    console.error(err);
  }
};

const updateEvent = async (event, id: string | number) => {
  try {
    await axios
      .patch(`${EVENT_URL}/${id}`, event)
      .then((res) => console.log(res));
  } catch (err) {
    console.error(err);
  }
};

const deleteEvent = async (id: string | number) => {
  try {
    await axios.delete(`${EVENT_URL}/${id}`).then((res) => console.log(res));
  } catch (err) {
    console.error(err);
  }
};

const createEventsJoinEventConsumer = async (eventsJoinEventConsumer) => {
  try {
    await axios
      .post(`${EVENTS_JOIN_EVENT_CONSUMER_URL}`, eventsJoinEventConsumer)
      .then((res) => console.log(res));
  } catch (err) {
    console.error(err);
  }
};

export {
  getEventConsumers,
  getEventProviders,
  getEventCategories,
  getEvents,
  getAllEventIds,
  getEventsByEmail,
  getEventByEventId,
  getAllRegions,
  getAllPrefectures,
  createEventConsumer,
  createEventProvider,
  updateEventProviderByEmail,
  updateEventConsumerByEmail,
  createEvent,
  updateEvent,
  deleteEvent,
  createEventsJoinEventConsumer,
};
