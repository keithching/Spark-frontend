import { Loading } from "../Loading";

const EventProvider = ({ eventProvider }) => {
  return <li>{eventProvider.name}</li>;
};

export const EventProviders = ({ eventProviders, loading, currentUser }) => {
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
