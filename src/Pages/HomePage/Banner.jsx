import { IoSearch } from "react-icons/io5";

const Banner = ({ allEvents, searchTerm, setSearchTerm, handleSearch }) => {
    const images = [
        allEvents[0]?.image || 'https://i.ibb.co/L5BKnC4/cat-music.jpg',
        allEvents[1]?.image || 'https://i.ibb.co/hR8yXbV/watercolor-workshop.jpg',
        allEvents[2]?.image || 'https://i.ibb.co/DRV3r0Q/tech-conf.jpg',
        allEvents[3]?.image || 'https://i.ibb.co/pPZzYfC/food-fest.jpg',
        allEvents[4]?.image || 'https://i.ibb.co/pPZzYfC/food-fest.jpg',
    ];

    return (
        <section className="container px-4 pt-20 pb-12 mx-auto sm:px-6 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24">
            <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2 sm:gap-12">
                
                
                <div className="text-center lg:text-left">
                    <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-7xl text-neutral">
                        Find & Enjoy Your Next Event
                    </h1>
                    <p className="mt-3 mb-6 text-base text-[#F56565] sm:mt-4 sm:mb-8 sm:text-lg ">
                        From intimate workshops to grand festivals, discover experiences that inspire you. Search and book your tickets effortlessly.
                    </p>
                    
                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="max-w-md mx-auto form-control lg:mx-0">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search event by name or category..." 
                                className="input input-bordered w-full pr-12 text-sm sm:text-base focus:outline-none focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                className="btn btn-ghost btn-circle absolute top-1/2 right-1 -translate-y-1/2 hover:bg-[#F56565]/10"
                                aria-label="Search"
                            >
                                <IoSearch className="text-xl sm:text-2xl text-[#F56565]" />
                            </button>
                        </div>
                    </form>

                    {/* Stats section */}
                    <div className="flex justify-center gap-8 mt-8 lg:justify-start sm:gap-12 sm:mt-10">
                        <div>
                            <p className="text-2xl font-bold sm:text-3xl md:text-4xl text-neutral">100+</p>
                            <p className="text-sm text-[#F56565] sm:text-base">Successful Events</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold sm:text-3xl md:text-4xl text-neutral">1980</p>
                            <p className="text-sm text-[#F56565] sm:text-base">Since we're in the market</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Asymmetrical Image Grid - Desktop */}
                <div className="hidden lg:grid grid-cols-2 grid-rows-3 gap-4 h-[28rem] lg:h-[32rem]">
                    <div className="row-span-2 overflow-hidden rounded-lg shadow-lg">
                        <img src={images[0]} alt="Event 1" className="object-cover w-full h-full"/>
                    </div>
                    <div className="row-span-1 overflow-hidden rounded-lg shadow-lg">
                        <img src={images[1]} alt="Event 2" className="object-cover w-full h-full"/>
                    </div>
                    <div className="row-span-1 overflow-hidden rounded-lg shadow-lg">
                        <img src={images[2]} alt="Event 3" className="object-cover w-full h-full"/>
                    </div>
                    <div className="row-span-2 overflow-hidden rounded-lg shadow-lg">
                        <img src={images[3]} alt="Event 4" className="object-cover w-full h-full"/>
                    </div>
                    <div className="row-span-2 overflow-hidden rounded-lg shadow-lg">
                        <img src={images[4]} alt="Event 5" className="object-cover w-full h-full"/>
                    </div>
                </div>

                {/* Mobile Image Grid */}
                <div className="grid h-48 grid-cols-2 gap-3 mt-6 lg:hidden sm:gap-4 sm:h-64">
                    <div className="overflow-hidden rounded-lg shadow-lg">
                        <img src={images[0]} alt="Event 1" className="object-cover w-full h-full"/>
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-lg">
                        <img src={images[1]} alt="Event 2" className="object-cover w-full h-full"/>
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-lg">
                        <img src={images[2]} alt="Event 3" className="object-cover w-full h-full"/>
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-lg">
                        <img src={images[3]} alt="Event 4" className="object-cover w-full h-full"/>
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-lg">
                        <img src={images[4]} alt="Event 5" className="object-cover w-full h-full"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;