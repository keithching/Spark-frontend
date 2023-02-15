import { Loading } from "../Loading";

const EventCategory = ({ eventCategory }) => {
  return <li>{eventCategory.name}</li>;
};

export const EventCategories = ({ eventCategories }) => {
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
