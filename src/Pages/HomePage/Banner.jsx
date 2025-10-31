import { IoSearch } from "react-icons/io5";

const Banner = ({ allEvents, searchTerm, setSearchTerm, handleSearch }) => {
    const images = [
        allEvents[0]?.image || 'https://i.ibb.co/L5BKnC4/cat-music.jpg',
        allEvents[1]?.image || 'https://i.ibb.co/hR8yXbV/watercolor-workshop.jpg',
        allEvents[2]?.image || 'https://i.ibb.co/DRV3r0Q/tech-conf.jpg',
        allEvents[3]?.image || 'https://i.ibb.co/pPZzYfC/food-fest.jpg',
    ];

    return (
        <section className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 lg:pt-32 lg:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                
               
                <div className="text-center lg:text-left">
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-neutral">
                        Find & Enjoy Your Next Event
                    </h1>
                    <p className="mt-3 sm:mt-4 mb-6 sm:mb-8 text-base sm:text-lg text-secondary">
                        From intimate workshops to grand festivals, discover experiences that inspire you. Search and book your tickets effortlessly.
                    </p>
                    
                   
                    <form onSubmit={handleSearch} className="form-control max-w-md mx-auto lg:mx-0">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search event by name or category..." 
                                className="input input-bordered w-full pr-12 text-sm sm:text-base focus:outline-none focus:border-primary/50" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                className="btn btn-ghost btn-circle absolute top-1/2 right-1 -translate-y-1/2"
                                aria-label="Search"
                            >
                                <IoSearch className="text-xl sm:text-2xl text-secondary" />
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-center lg:justify-start gap-8 sm:gap-12 mt-8 sm:mt-10">
                        <div>
                            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral">100+</p>
                            <p className="text-sm sm:text-base text-secondary">Successful Events</p>
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral">1980</p>
                            <p className="text-sm sm:text-base text-secondary">Since we're in the market</p>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:grid grid-cols-2 grid-rows-3 gap-4 h-[28rem] lg:h-[32rem]">
                    <div className="row-span-2 rounded-lg overflow-hidden shadow-lg">
                        <img src={images[0]} alt="Event 1" className="w-full h-full object-cover"/>
                    </div>
                    <div className="row-span-1 rounded-lg overflow-hidden shadow-lg">
                        <img src={images[1]} alt="Event 2" className="w-full h-full object-cover"/>
                    </div>
                    <div className="row-span-1 rounded-lg overflow-hidden shadow-lg">
                        <img src={images[2]} alt="Event 3" className="w-full h-full object-cover"/>
                    </div>
                    <div className="row-span-2 rounded-lg overflow-hidden shadow-lg">
                        <img src={images[3]} alt="Event 4" className="w-full h-full object-cover"/>
                    </div>
                </div>

                {/* Mobile Image Grid - Show a simpler version on mobile */}
                <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-4 h-48 sm:h-64 mt-6">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <img src={images[0]} alt="Event 1" className="w-full h-full object-cover"/>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <img src={images[1]} alt="Event 2" className="w-full h-full object-cover"/>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <img src={images[2]} alt="Event 3" className="w-full h-full object-cover"/>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <img src={images[3]} alt="Event 4" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;