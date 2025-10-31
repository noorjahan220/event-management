import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, className = '' }) => (
    <div className={`relative overflow-hidden rounded-2xl group shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
        
        <img 
            src={event.image} 
            alt={event.title} 
            className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
        />
       
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        
      
        <div className="relative z-10 flex flex-col justify-end h-full p-5 text-white md:p-6">
            <div>
                <p className="mb-1 text-sm font-medium text-gray-200">{event.date} - {event.location}</p>
                <h2 className="mb-4 text-xl font-bold leading-tight card-title lg:text-2xl">{event.title}</h2>
                <Link 
                    to={`/event/${event._id}`} 
                    className="btn bg-[#F56565] border-[#F56565] text-white btn-sm px-5 transition-all duration-300 hover:bg-[#E53E3E] hover:border-[#E53E3E] hover:scale-105"
                >
                    View Details
                </Link>
            </div>
        </div>
    </div>
);

export default EventCard;