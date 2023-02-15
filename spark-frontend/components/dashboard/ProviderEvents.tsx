import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import userDashboardStyles from "../../styles/userDashboard.module.css";

const ProviderEvent = ({
  event,
  setSelectedEvent,
  setModalContent,
  setShowModal,
}) => {
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
    <div className={userDashboardStyles["event-card"]}>
      <div>Title: {event.title}</div>
      <div>Provider: {event.eventProvider}</div>
      <div>Category: {event.eventCategory}</div>
      <div>Location: {event.location}</div>
      <div>
        Date: {event.dateStart} ~ {event.dateEnd}
      </div>
      <div className={userDashboardStyles["event-function-btn-container"]}>
        <FiEdit
          className={userDashboardStyles["edit-event-btn"]}
          onClick={handleEditEventClick}
        />
        <RiDeleteBinLine
          className={userDashboardStyles["delete-event-btn"]}
          onClick={handleDeleteEventClick}
        />
      </div>
    </div>
  );
};

export const ProviderEvents = ({
  events,
  setSelectedEvent,
  setModalContent,
  setShowModal,
}) => {
  return (
    <>
      {events.map((event) => {
        return (
          <ProviderEvent
            event={event}
            key={event.id}
            setSelectedEvent={setSelectedEvent}
            setModalContent={setModalContent}
            setShowModal={setShowModal}
          />
        );
      })}
    </>
  );
};
