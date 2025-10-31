import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Banner from './Banner';
import ReviewsCarousel from './ReviewsCarousel';
import useAxiosPublic from '../Hooks/UseAxiosPublic';
import EventCard from './EventCard';
import FeaturedEventCard from './FeaturedEventCard';


const CategoryCard = ({ category, onClick, isActive }) => (
    <div 
        className={`card card-compact cursor-pointer group border-2 transition-all duration-500 hover:shadow-2xl overflow-hidden rounded-xl
                    ${isActive ? 'border-primary shadow-xl scale-105' : 'border-base-300 hover:border-error hover:scale-105'}`}
        onClick={() => onClick(category.name)}
    >
        <figure className="overflow-hidden h-48 md:h-56 lg:h-64">
            <img src={category.image} alt={category.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        </figure>
        <div className="card-body justify-end p-4 absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
            <div className="text-center transform transition-all duration-500">
                
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="text-center p-6">
                        <h3 className="text-white text-2xl font-bold font-serif mb-2 drop-shadow-2xl">
                            {category.name}
                        </h3>
                        <p className="text-white/90 text-sm drop-shadow-lg">
                            Click to explore events
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const staticCategories = [
    { name: 'Music', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { name: 'Tech', image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { name: 'Art', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80' },
    { name: 'Food', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
];

const HomePage = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    useEffect(() => {
        axiosPublic.get('/events')
            .then(res => {
                const eventsData = res.data;
                setAllEvents(eventsData);
                setFilteredEvents(eventsData);
                const allReviews = eventsData.flatMap(event => (event.reviews ? event.reviews : [])).reverse();
                setReviews(allReviews);
                setLoading(false);
            });
    }, [axiosPublic]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        const term = searchTerm.toLowerCase();
        const foundEvent = allEvents.find(event => 
            event.title.toLowerCase().includes(term) ||
            (event.category && event.category.toLowerCase().includes(term))
        );
        if (foundEvent) {
            navigate(`/event/${foundEvent._id}`);
        } else {
            Swal.fire({ icon: 'info', title: 'No Event Found', text: `We couldn't find any event matching "${searchTerm}".` });
        }
    };

    const handleCategoryClick = (categoryName) => {
        if (activeCategory === categoryName) {
            showAllEvents();
        } else {
            const results = allEvents.filter(event => event.category === categoryName);
            setFilteredEvents(results);
            setActiveCategory(categoryName);
            setSearchTerm('');
        }
    };

    const showAllEvents = () => {
        setFilteredEvents(allEvents);
        setActiveCategory(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col items-center gap-4">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-secondary">Loading events...</p>
                </div>
            </div>
        );
    }

   return (
        <div className="text-neutral">
            
            <Banner 
                allEvents={allEvents}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
            />

            <section className="py-16 lg:py-20">
                <div className="container mx-auto text-center px-6">
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral mb-4">
                        {filteredEvents.length < allEvents.length ? 'Filtered Events' : 'Discover Events'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-[22rem] mb-6">
                        {filteredEvents.slice(0, 4).map((event, index) => {
                            let gridClasses = '';
                            switch (index) {
                                case 0: gridClasses = 'lg:col-span-3'; break;
                                case 1: gridClasses = 'lg:col-span-2'; break;
                                case 2: gridClasses = 'lg:col-span-2'; break;
                                case 3: gridClasses = 'lg:col-span-3'; break;
                                default: gridClasses = '';
                            }
                            return <EventCard key={event._id} event={event} className={gridClasses} />;
                        })}
                    </div>
                    {filteredEvents.length > 4 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
                            {filteredEvents.slice(4).map(event => <EventCard key={event._id} event={event} />)}
                        </div>
                    )}
                </div>
            </section>
            
            <section className=" py-16 lg:py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral mb-4">Featured Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allEvents.slice(0, 3).map(event => <FeaturedEventCard key={event._id} event={event} />)}
                    </div>
                </div>
            </section>

            
            <section className="py-16 lg:py-20 ">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral mb-4">
                            Browse by Category
                        </h2>
                        <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
                            Discover amazing events across different categories. Find what excites you!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8">
                        {staticCategories.map(category => (
                            <CategoryCard 
                                key={category.name} 
                                category={category} 
                                onClick={handleCategoryClick}
                                isActive={activeCategory === category.name}
                            />
                        ))}
                    </div>
                    
                    
                </div>
            </section>

            {reviews.length > 0 && (
                <ReviewsCarousel reviews={reviews} />
            )}
        </div>
    );
};

export default HomePage;