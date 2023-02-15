import { useState, useEffect } from "react";
import mainStyles from "../styles/main.module.css";
import {
  getEventProviders,
  getEventCategories,
  getEvents,
  getEventsByEmail,
  getAllRegions,
  useRole,
  useEventsJoinEventConsumerByEmail,
} from "../utils/helper";
import { Modal } from "./Modal";
import { Loading } from "./Loading";
import { GrAddCircle } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAuth } from "../contexts/AuthContext";
import {
  EventProviderProps,
  EventCategoryProps,
  EventProps,
  JpRegionProps,
} from "../lib/customProp";
import { useRouter } from "next/router";

interface ModalProps {
  title: string;
  operation: string;
}

type Role = string;

const Main = () => {
  const { currentUser, adminEmail } = useAuth();
  const { role } = useRole(currentUser?.email);
  const router = useRouter();
  const { eventsJoinEventConsumer, isLoadingEJEC } =
    useEventsJoinEventConsumerByEmail(currentUser?.email);

  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("stop-scrolling");
    } else {
      document.body.classList.remove("stop-scrolling");
    }
  }, [showModal]);

  const [eventProviders, setEventProviders] = useState<EventProviderProps[]>(
    []
  );
  const [eventCategories, setEventCategories] = useState<EventCategoryProps[]>(
    []
  );
  const [events, setEvents] = useState<EventProps[]>([]);
  const [regions, setRegions] = useState<JpRegionProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [modalContent, setModalContent] = useState<ModalProps>({
    title: "", // title for the modal
    operation: "", // create, edit, delete
  });
  const [selectedEvent, setSelectedEvent] = useState<number>(null);

  useEffect(() => {
    async function fetchData() {
      setEventProviders(await getEventProviders());
      setEventCategories(await getEventCategories());
      setEvents(
        currentUser && currentUser.email !== adminEmail
          ? await getEventsByEmail(currentUser.email)
          : await getEvents()
      );
      setRegions(await getAllRegions());
    }
    fetchData();
    setLoading(false);
  }, [currentUser, adminEmail]);

  useEffect(() => {
    // update the event divs in the DOM
    async function updateData() {
      setEvents(
        currentUser && currentUser.email !== adminEmail
          ? await getEventsByEmail(currentUser.email)
          : await getEvents()
      );
    }
    updateData();
  }, [showModal, currentUser, adminEmail]);

  const EventProvider = (props) => {
    const { eventProvider } = props;
    return <li>{eventProvider.name}</li>;
  };

  const Event = (props) => {
    const { event } = props;

    const handleEditEventClick = () => {
      setSelectedEvent(event.id);
      setModalContent({
        title: "Edit Event",
        operation: "edit",
      });
      setShowModal((prev) => !prev);
    };

    const handleDeleteEventClick = () => {
      setSelectedEvent(event.id);
      setModalContent({
        title: "Delete Event",
        operation: "delete",
      });
      setShowModal((prev) => !prev);
    };

    return (
      <div className={mainStyles["event-card"]}>
        <div>Title: {event.title}</div>
        <div>Provider: {event.eventProvider}</div>
        <div>Category: {event.eventCategory}</div>
        <div>Location: {event.location}</div>
        <div>
          Date: {event.dateStart} ~ {event.dateEnd}
        </div>
        <div className={mainStyles["event-function-btn-container"]}>
          <FiEdit
            className={mainStyles["edit-event-btn"]}
            onClick={handleEditEventClick}
          />
          <RiDeleteBinLine
            className={mainStyles["delete-event-btn"]}
            onClick={handleDeleteEventClick}
          />
        </div>
      </div>
    );
  };

  const ConsumerEvents = () => {
    return (
      <div className={mainStyles.consumerEventsContainer}>
        {eventsJoinEventConsumer.map((item) => {
          return (
            <div
              key={item.id}
              className={mainStyles.consumerEventDiv}
              onClick={() => router.push(`/events/${item.event_id}`)}
            >
              {item.event_name}
            </div>
          );
        })}
      </div>
    );
  };

  const ProviderEvents = () => {};

  const Events = () => {
    const handleAddEventClick = () => {
      setModalContent({
        title: "Add Event",
        operation: "create",
      });
      setShowModal((prev) => !prev);
    };

    return (
      <section className={mainStyles.eventsContainer}>
        <header className={mainStyles["events-header"]}>
          <h1>Events</h1>
          {role === "provider" && (
            <GrAddCircle onClick={handleAddEventClick} id="add-event-btn" />
          )}
        </header>
        <div className={mainStyles["event-cards"]}>
          {!loading && events.length > 0 ? (
            events.map((event) => {
              return <Event event={event} key={event.id} />;
            })
          ) : !loading && currentUser && events.length === 0 ? (
            role === "provider" ? (
              <span>Create your first event</span>
            ) : !isLoadingEJEC &&
              eventsJoinEventConsumer &&
              eventsJoinEventConsumer.length === 0 ? (
              <span>Join your first event</span>
            ) : !isLoadingEJEC && eventsJoinEventConsumer ? (
              <ConsumerEvents />
            ) : (
              <Loading />
            )
          ) : (
            <Loading />
          )}
        </div>
      </section>
    );
  };

  const EventProviders = () => {
    return (
      <>
        <h1>Event Providers</h1>
        {eventProviders.length > 0 ? (
          eventProviders.map((eventProvider) => {
            return (
              <EventProvider
                eventProvider={eventProvider}
                key={eventProvider.id}
              />
            );
          })
        ) : !loading && currentUser && eventProviders.length === 0 ? (
          <span>null</span>
        ) : (
          <Loading />
        )}
      </>
    );
  };

  const EventCategories = () => {
    return (
      <>
        <h1>Event Categories</h1>
        {eventCategories.length > 0 ? (
          eventCategories.map((eventCategory) => {
            return (
              <EventCategory
                eventCategory={eventCategory}
                key={eventCategory.id}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </>
    );
  };

  const EventCategory = ({ eventCategory }) => {
    return <li>{eventCategory.name}</li>;
  };

  return (
    <div className={mainStyles.Main}>
      {role && currentUser && currentUser.email === adminEmail ? (
        <>
          <EventProviders />
          <EventCategories />
        </>
      ) : null}
      <Events />
      {showModal && Object.keys(modalContent).length > 0 ? (
        <Modal
          modalContent={modalContent}
          events={events}
          selectedEvent={selectedEvent}
          showModal={showModal}
          setShowModal={setShowModal}
          eventProviders={eventProviders}
          eventCategories={eventCategories}
          regions={regions}
        />
      ) : null}
    </div>
  );
};

export default Main;
