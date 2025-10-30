import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../Hooks/UseAxiosPublic';


// --- Reusable Card Components (No Changes Here) ---

const EventCard = ({ event }) => (
    <div className="card bg-base-100 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100">
        <figure className="overflow-hidden">
            <img src={event.image} alt={event.title} className="h-56 w-full object-cover transition-transform duration-500 hover:scale-110" />
        </figure>
        <div className="card-body p-6">
            <h2 className="card-title text-gray-800 font-bold">{event.title}</h2>
            <p className="text-gray-600">{event.date} - {event.location}</p>
            <div className="card-actions justify-end mt-4">
                <Link to={`/event/${event._id}`} className="btn btn-primary px-6 rounded-lg transition-all duration-300 hover:shadow-lg">View Details</Link>
            </div>
        </div>
    </div>
);

const FeaturedEventCard = ({ event }) => (
    <div className="card bg-base-100 shadow-2xl image-full transition-all duration-300 hover:shadow-2xl border border-gray-200">
        <figure className="overflow-hidden">
            <img src={event.image} alt={event.title} className="transition-transform duration-700 hover:scale-110" />
        </figure>
        <div className="card-body justify-end p-6 ">
            <div className="mb-4">
                <h2 className="card-title text-white font-bold text-xl mb-2">{event.title}</h2>
                <p className="text-gray-200">{event.date} - {event.location}</p>
            </div>
            <div className="card-actions">
                <Link to={`/event/${event._id}`} className="btn btn-primary px-6 rounded-lg transition-all duration-300 hover:shadow-lg">View Details</Link>
            </div>
        </div>
    </div>
);

const ReviewCard = ({ review }) => (
    <div className="card bg-base-100 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
        <div className="card-body items-center text-center p-6">
            <div className="rating rating-sm mb-3">
                {[...Array(5)].map((_, index) => (
                    <input key={index} type="radio" className="mask mask-star-2 bg-orange-400" checked={index < review.rating} readOnly />
                ))}
            </div>
            <p className="text-gray-700 italic leading-relaxed">"{review.comment}"</p>
            <p className="text-sm font-semibold mt-4 text-gray-800">- {review.userName}</p>
        </div>
    </div>
);

// --- NEW: Static data and component for the visual category cards ---
const staticCategories = [
    { name: 'Music', image: 'https://i.ibb.co.com/RTxK0fs6/images-3.jpg' },
    { name: 'Tech', image: 'https://i.ibb.co.com/7tmSrT0k/images-4.jpg' },
    { name: 'Art', image: 'https://i.ibb.co.com/tPbpQgTc/360-F-530324548-tx-HUb-VJQkx-WFhj70o-C6-BXDUYxeyjt0-Dm.jpg' },
    { name: 'Food', image: 'https://i.ibb.co.com/bgKNq7Xb/images-5.jpg' },
];

const CategoryCard = ({ category, onClick }) => (
    <div
        className="card card-compact shadow-xl image-full cursor-pointer group transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-200 overflow-hidden"
        onClick={() => onClick(category.name)}
    >
        <figure className="overflow-hidden">
            <img src={category.image} alt={category.name} className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        </figure>
        <div className="card-body justify-center items-center relative">
            {/* Enhanced overlay with gradient */}
            <div className="absolute inset-0   opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
            {/* Enhanced title with better styling */}
            <h2 className="card-title text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10 text-center drop-shadow-lg">
                {category.name}
            </h2>
        </div>
    </div>
);

// --- The Main HomePage Component ---
const HomePage = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/events')
            .then(res => {
                const eventsData = res.data;
                setAllEvents(eventsData);
                setFilteredEvents(eventsData);
                const allReviews = eventsData.flatMap(event => (event.reviews ? event.reviews : [])).reverse();
                setReviews(allReviews.slice(0, 4));
                setLoading(false);
            });
    }, [axiosPublic]);

    const handleSearch = (e) => {
        e.preventDefault();
        const term = searchTerm.toLowerCase();
        const results = allEvents.filter(event => 
            event.title.toLowerCase().includes(term) ||
            (event.category && event.category.toLowerCase().includes(term))
        );
        setFilteredEvents(results);
    };

    const handleCategoryFilter = (category) => {
        const results = allEvents.filter(event => event.category === category);
        setFilteredEvents(results);
        setSearchTerm('');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-base-100">
                <div className="flex flex-col items-center gap-4">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-gray-600">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-16 bg-base-100">
            {/* Enhanced Banner Section */}
            <div className="hero min-h-[60vh] relative overflow-hidden" style={{ backgroundImage: 'url(https://i.ibb.co.com/ycRqxFnv/watermark-oimages-05.jpg)' }}>
                
                
            </div>

            {/* Enhanced Layout Container */}
            <div className="container mx-auto px-4 py-16 space-y-20">

                {/* Enhanced Search Section */}
                <section className="bg-base-100 p-8 rounded-2xl shadow-lg border border-gray-100 -mt-24 relative z-8 overflow-hidden transition-all duration-300">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Search for an Event</h2>
                    <form onSubmit={handleSearch} className="form-control max-w-2xl mx-auto">
                        <div className="input-group shadow-md rounded-2xl overflow-hidden">
                            <input 
                                type="text" 
                                placeholder="Search by event name or category..." 
                                className="input input-bordered w-full py-4 px-6 text-lg border-r-0 focus:outline-none focus:border-primary/20" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary px-8 text-lg font-semibold transition-all duration-300 hover:shadow-lg">Search</button>
                        </div>
                    </form>
                </section>

                {/* Enhanced Events Section */}
                <section className="transition-all duration-500">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        {searchTerm ? `Search Results for "${searchTerm}"` : 'Discover Events'}
                    </h2>
                    {filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map(event => <EventCard key={event._id} event={event} />)}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600 mb-4">No events found matching your criteria.</p>
                            <button 
                                onClick={() => {setFilteredEvents(allEvents); setSearchTerm('');}} 
                                className="btn btn-outline px-6 rounded-lg transition-all duration-300 hover:shadow-lg"
                            >
                                View All Events
                            </button>
                        </div>
                    )}
                </section>

                {/* Enhanced Featured Events Section */}
                <section className="bg-gradient-to-br from-base-200 to-base-100 py-16 rounded-2xl shadow-inner border border-gray-200">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Featured Events</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allEvents.slice(0, 3).map(event => <FeaturedEventCard key={event._id} event={event} />)}
                        </div>
                    </div>
                </section>

                {/* Enhanced Categories Section */}
                <section className="transition-all duration-500">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Browse by Category</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {staticCategories.map(category => (
                            <CategoryCard key={category.name} category={category} onClick={handleCategoryFilter} />
                        ))}
                    </div>
                </section>

                {/* Enhanced Reviews Section */}
                <section className="transition-all duration-500">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Recent Reviews</h2>
                    {reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {reviews.map((review, index) => <ReviewCard key={index} review={review} />)}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-600 text-lg">No reviews have been posted yet.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default HomePage;