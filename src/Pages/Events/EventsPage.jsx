import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../Hooks/UseAxiosPublic';

const EventCard = ({ event }) => {
  return (
    <div className="card   transition-all duration-300 hover:-translate-y-2 rounded-2xl overflow-hidden border border-gray-100">
      <figure className="overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="h-56 w-full object-cover transition-transform duration-700 hover:scale-110" 
        />
      </figure>
      <div className="card-body p-6">
        <h2 className="card-title text-xl font-bold text-gray-800 font-serif line-clamp-2 mb-2">
          {event.title}
        </h2>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4 text-[#F56565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">{event.date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4 text-[#F56565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="text-sm font-medium line-clamp-1">{event.location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#F56565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm font-semibold text-[#F56565]">
              {event.seats} seats available
            </span>
          </div>
        </div>

        <div className="card-actions">
          <Link to={`/event/${event._id}`} className="w-full">
            <button className="btn bg-[#F56565] border-[#F56565] text-white hover:bg-[#E53E3E] hover:border-[#E53E3E] w-full transition-all duration-300 hover:scale-105">
              View Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
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
    return (
      <div className="min-h-screen  pt-24 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-[#F56565]"></span>
          <p className="text-lg text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing events happening near you. From workshops to conferences, find your next experience.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

       

        
      </div>
    </div>
  );
};

export default EventsPage;