import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, className = '' }) => (
    <div className={`relative overflow-hidden rounded-2xl group shadow-lg ${className}`}>
        {/* Background Image */}
        <img 
            src={event.image} 
            alt={event.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        
        {/* Content */}
        <div className="relative z-10 p-5 md:p-6 flex flex-col justify-end h-full text-white">
            <div>
                <p className="text-sm font-medium text-gray-200 mb-1">{event.date} - {event.location}</p>
                <h2 className="card-title font-bold text-xl lg:text-2xl mb-4 leading-tight">{event.title}</h2>
                <Link 
                    to={`/event/${event._id}`} 
                    className="btn bg-error btn-sm px-5 text-black transition-transform duration-300 group-hover:scale-105"
                >
                    View Details
                </Link>
            </div>
        </div>
    </div>
);

export default EventCard;