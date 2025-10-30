import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import useAxiosPublic from '../Hooks/UseAxiosPublic';

const EventCard = ({ event }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={event.image} alt={event.title} className="h-56 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
        <p>{event.date} - {event.location}</p>
        <p>Available Seats: <span className="font-bold text-secondary">{event.seats}</span></p>
        <div className="card-actions justify-end">
          <Link to={`/event/${event._id}`}>
            <button className="btn btn-primary">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get('/events')
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      });
  }, [axiosPublic]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <div className="pt-24 pb-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => <EventCard key={event._id} event={event} />)}
      </div>
    </div>
  );
};

export default EventsPage;