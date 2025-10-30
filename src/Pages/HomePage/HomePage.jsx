import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../Hooks/UseAxiosPublic';


// --- Reusable Card Components (No Changes Here) ---

const EventCard = ({ event }) => (
    <div className="card bg-base-100 shadow-xl transition-transform hover:scale-105">
        <figure><img src={event.image} alt={event.title} className="h-56 w-full object-cover" /></figure>
        <div className="card-body">
            <h2 className="card-title">{event.title}</h2>
            <p>{event.date} - {event.location}</p>
            <div className="card-actions justify-end">
                <Link to={`/event/${event._id}`} className="btn btn-primary">View Details</Link>
            </div>
        </div>
    </div>
);

const FeaturedEventCard = ({ event }) => (
    <div className="card bg-base-100 shadow-xl image-full">
        <figure><img src={event.image} alt={event.title} /></figure>
        <div className="card-body justify-end">
            <div>
                <h2 className="card-title text-white">{event.title}</h2>
                <p>{event.date} - {event.location}</p>
            </div>
            <div className="card-actions">
                <Link to={`/event/${event._id}`} className="btn btn-primary">View Details</Link>
            </div>
        </div>
    </div>
);

const ReviewCard = ({ review }) => (
    <div className="card bg-base-200 shadow-md">
        <div className="card-body items-center text-center">
            <div className="rating rating-sm">
                {[...Array(5)].map((_, index) => (
                    <input key={index} type="radio" className="mask mask-star-2 bg-orange-400" checked={index < review.rating} readOnly />
                ))}
            </div>
            <p className="text-gray-600 italic">"{review.comment}"</p>
            <p className="text-sm font-semibold mt-2">- {review.userName}</p>
        </div>
    </div>
);

// --- The Main HomePage Component (Rearranged Layout) ---

const HomePage = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const axiosPublic = useAxiosPublic();

    // --- All JavaScript Logic Remains Exactly the Same ---
    useEffect(() => {
        axiosPublic.get('/events')
            .then(res => {
                const eventsData = res.data;
                setAllEvents(eventsData);
                setFilteredEvents(eventsData);
                const uniqueCategories = [...new Set(eventsData.map(event => event.category).filter(Boolean))];
                setCategories(uniqueCategories);
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
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <div className="pt-16 bg-base-100">
            {/* Section 1: Banner */}
            <div className="hero min-h-[50vh]" style={{ backgroundImage: 'url(https://i.ibb.co/DRV3r0Q/tech-conf.jpg)' }}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-xl">
                        <h1 className="mb-5 text-5xl font-bold">Your Gateway to Unforgettable Events</h1>
                        <p className="mb-5">Discover, book, and experience events that matter to you. From local concerts to global conferences, your next adventure starts here.</p>
                    </div>
                </div>
            </div>

            {/* --- NEW LAYOUT STARTS HERE --- */}
            <div className="container mx-auto px-4 py-12 space-y-20">

                {/* Section 2: Search Bar */}
                <section className="bg-base-200 p-8 rounded-lg shadow-md -mt-32 relative z-10">
                    <h2 className="text-2xl font-bold text-center mb-4">Search for an Event</h2>
                    <form onSubmit={handleSearch} className="form-control">
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Search by event name or category..." 
                                className="input input-bordered w-full" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary">Search</button>
                        </div>
                    </form>
                </section>

                {/* Section 3: Event Cards (Search Results or All Events) */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-8">
                        {searchTerm ? 'Search Results' : 'Discover Events'}
                    </h2>
                    {filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map(event => <EventCard key={event._id} event={event} />)}
                        </div>
                    ) : (
                        <p className="text-center text-xl">No events found matching your criteria.</p>
                    )}
                </section>

                {/* Section 4: Featured Events */}
                <section className="bg-base-200 py-16 rounded-lg">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Featured Events</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allEvents.slice(0, 3).map(event => <FeaturedEventCard key={event._id} event={event} />)}
                        </div>
                    </div>
                </section>

                {/* Section 5: Categories */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button onClick={() => { setFilteredEvents(allEvents); setSearchTerm(''); }} className="btn btn-secondary">All Events</button>
                        {categories.map(category => (
                            <button key={category} onClick={() => handleCategoryFilter(category)} className="btn btn-outline">{category}</button>
                        ))}
                    </div>
                </section>

                {/* Section 6: Recent Reviews */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-8">Recent Reviews</h2>
                    {reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {reviews.map((review, index) => <ReviewCard key={index} review={review} />)}
                        </div>
                    ) : (
                        <p className="text-center">No reviews have been posted yet.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default HomePage;