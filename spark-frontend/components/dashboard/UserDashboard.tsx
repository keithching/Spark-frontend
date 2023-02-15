import { useState, useEffect } from "react";
import userDashboardStyles from "../../styles/userDashboard.module.css";
import {
  getEventProviders,
  getEventCategories,
  getEvents,
  getEventsByEmail,
  getAllRegions,
  useRole,
  useEventsJoinEventConsumerByEmail,
} from "../../utils/helper";
import { Modal } from "./Modal";
import { useAuth } from "../../contexts/AuthContext";
import {
  EventProviderProps,
  EventCategoryProps,
  EventProps,
  JpRegionProps,
} from "../../lib/customProp";
import { EventProviders } from "./EventProviders";
import { EventCategories } from "./EventCategories";
import { EventsDashboard } from "./EventsDashboard";

interface ModalProps {
  title: string;
  operation: string;
}

type Role = string;

const UserDashboard = () => {
  const { currentUser, adminEmail } = useAuth();
  const { role } = useRole(currentUser?.email);
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

  return (
    <div className={userDashboardStyles.Main}>
      {role && currentUser && currentUser.email === adminEmail ? (
        <>
          <EventProviders
            eventProviders={eventProviders}
            loading={loading}
            currentUser={currentUser}
          />
          <EventCategories eventCategories={eventCategories} />
        </>
      ) : null}
      <EventsDashboard
        loading={loading}
        events={events}
        setSelectedEvent={setSelectedEvent}
        setModalContent={setModalContent}
        setShowModal={setShowModal}
        isLoadingEJEC={isLoadingEJEC}
        eventsJoinEventConsumer={eventsJoinEventConsumer}
      />
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

export default UserDashboard;
