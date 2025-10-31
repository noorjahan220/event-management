import { Link } from 'react-router-dom';

const FeaturedEventCard = ({ event }) => {
  return (
    <Link 
      to={`/event/${event._id}`} 
      className="card shadow-xl image-full overflow-hidden group border-2 border-transparent 
                 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-2xl
                 hover:border-error/20 bg-base-100"
    >
      {/* Image with enhanced overlay */}
      <figure className="relative overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-64 object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent 
                       opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
      </figure>

      {/* Card body with enhanced styling */}
      <div className="card-body justify-end p-6 relative z-10">
        {/* Content wrapper with enhanced animations */}
        <div className="transition-all duration-500 ease-out group-hover:-translate-y-3 space-y-3">
          {/* Event title with better typography */}
          <h2 className="card-title text-white font-bold text-2xl lg:text-3xl leading-tight drop-shadow-2xl">
            {event.title}
          </h2>
          
          {/* Event details with improved layout */}
          <div className="space-y-2">
            <p className="text-gray-200 text-base font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {event.date}
            </p>
            <p className="text-gray-200 text-base font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </p>
          </div>

          {/* Hover indicator */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            <div className="flex items-center gap-2 text-error font-semibold text-sm">
              <span>View Details</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                     -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </Link>
  );
};

export default FeaturedEventCard;