import userDashboardStyles from "../../styles/userDashboard.module.css";
import { GrAddCircle } from "react-icons/gr";
import { useAuth } from "../../contexts/AuthContext";
import { useRole } from "../../utils/helper";
import { ProviderEvents } from "./ProviderEvents";
import { ConsumerEvents } from "./ConsumerEvents";
import { Loading } from "../Loading";

export const EventsDashboard = ({
  loading,
  events,
  setSelectedEvent,
  setModalContent,
  setShowModal,
  isLoadingEJEC,
  eventsJoinEventConsumer,
}) => {
  const { currentUser, adminEmail } = useAuth();
  const { role } = useRole(currentUser?.email);

  const handleAddEventClick = () => {
    setModalContent({
      title: "Add Event",
      operation: "create",
    });
    setShowModal((prev) => !prev);
  };

  return (
    <section className={userDashboardStyles.eventsContainer}>
      <header className={userDashboardStyles["events-header"]}>
        <h1>Events</h1>
        {role === "provider" && (
          <GrAddCircle onClick={handleAddEventClick} id="add-event-btn" />
        )}
      </header>
      <div className={userDashboardStyles["event-cards"]}>
        {!loading && events.length > 0 ? (
          <ProviderEvents
            events={events}
            setSelectedEvent={setSelectedEvent}
            setModalContent={setModalContent}
            setShowModal={setShowModal}
          />
        ) : !loading && currentUser && events.length === 0 ? (
          role === "provider" ? (
            <span>Create your first event</span>
          ) : !isLoadingEJEC &&
            eventsJoinEventConsumer &&
            eventsJoinEventConsumer.length === 0 ? (
            <span>Join your first event</span>
          ) : !isLoadingEJEC &&
            eventsJoinEventConsumer &&
            role === "consumer" ? (
            <ConsumerEvents eventsJoinEventConsumer={eventsJoinEventConsumer} />
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
