import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    // --- MOCK COMPANY DATA ---
    const companyData = {
        name: 'EvenTech Solutions',
        tagline: 'Pioneering Event Technology for Unforgettable Experiences',
        logo: 'https://cdn-icons-png.flaticon.com/512/3050/3050720.png',
        coverPhoto: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        description: "EvenTech Solutions is a leading technology firm revolutionizing the event management industry. We provide comprehensive SaaS solutions that empower organizers to create, manage, and scale unforgettable events while delivering exceptional experiences for attendees worldwide.",
        website: 'www.eventech.com',
        location: 'San Francisco, CA | New York | London',
        founded: 2018,
        mission: "To transform how people discover, experience, and connect through innovative event technology solutions that bridge the gap between organizers and attendees."
    };

    // Event categories with professional images
    const eventCategories = [
        { name: 'Corporate Events', count: '1,200+', description: 'Conferences, seminars, and business gatherings', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', icon: '🏢' },
        { name: 'Music Festivals', count: '850+', description: 'Large-scale concerts and music events', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', icon: '🎵' },
        { name: 'Tech Conferences', count: '650+', description: 'Industry-leading technology summits', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', icon: '💻' },
        { name: 'Art Exhibitions', count: '420+', description: 'Curated art shows and cultural events', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', icon: '🎨' }
    ];

    // Company achievements
    const achievements = [
        { number: '5,000+', label: 'Events Managed', icon: '🎪' },
        { number: '2.5M+', label: 'Tickets Processed', icon: '🎫' },
        { number: '150+', label: 'Global Cities', icon: '🌍' },
        { number: '99.8%', label: 'Uptime Reliability', icon: '⚡' }
    ];

    // Team members
    const leadershipTeam = [
        { name: 'Sarah Johnson', role: 'Chief Executive Officer', bio: 'Former Google Product Lead with 15+ years in tech innovation', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
        { name: 'Michael Chen', role: 'Chief Technology Officer', bio: 'Ex-Microsoft Architect specializing in scalable cloud solutions', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
        { name: 'Emily Rodriguez', role: 'VP of Product', bio: 'Product visionary with expertise in user-centered design', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ];

    // Client testimonials
    const testimonials = [
        { quote: "EvenTech transformed our annual conference from chaotic to seamless. The platform handled 10,000+ attendees flawlessly.", author: "Alex Thompson", company: "TechGlobal Summit", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
        { quote: "The analytics and reporting features gave us insights we never had before. Game-changing for event ROI.", author: "Maria Garcia", company: "MusicFest International", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
    ];

    return (
        <div className="min-h-screen pb-16 ">
            {/* Hero Banner */}
            <div className="relative text-white bg-center bg-cover" style={{ backgroundImage: `url(${companyData.coverPhoto})` }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container relative px-4 py-20 mx-auto sm:px-6 lg:px-8 sm:py-24 lg:py-28">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="mb-4 font-serif text-4xl font-bold sm:text-5xl lg:text-6xl">
                            {companyData.name}
                        </h1>
                        <p className="mb-8 text-lg text-white/90 sm:text-xl lg:text-2xl">
                            {companyData.tagline}
                        </p>
                    </div>
                </div>
            </div>

            
            <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                
                <div className="relative p-6 mb-12 -mt-16 bg-white shadow-xl sm:p-8 rounded-2xl md:mb-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="mb-6 font-serif text-2xl font-bold text-gray-800 md:text-3xl">Leading Event Technology Platform</h2>
                        <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
                            {companyData.description}
                        </p>
                        <div className="grid grid-cols-2 gap-6 mb-8 md:grid-cols-4">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="text-center">
                                    <div className="mb-2 text-3xl">{achievement.icon}</div>
                                    <div className="text-xl font-bold text-[#F56565] sm:text-2xl mb-1">{achievement.number}</div>
                                    <div className="text-sm text-gray-600">{achievement.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Event Categories Section */}
                <div className="mb-12 md:mb-16">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 font-serif text-2xl font-bold text-gray-800 md:text-3xl">Event Categories We Excel In</h2>
                        <p className="max-w-2xl mx-auto text-base text-gray-600 sm:text-lg">
                            Specialized solutions for every type of event, from intimate gatherings to massive festivals
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {eventCategories.map((category, index) => (
                            <div key={index} className="overflow-hidden transition-shadow duration-300 bg-white shadow-lg rounded-2xl group hover:shadow-2xl">
                                <div className="flex flex-col md:flex-row">
                                    <div className="relative overflow-hidden md:w-2/5">
                                        <img src={category.image} alt={category.name} className="object-cover w-full h-48 transition-transform duration-500 md:h-full group-hover:scale-105" />
                                        <div className="absolute p-2 text-3xl rounded-lg top-4 left-4 bg-white/90 backdrop-blur-sm">{category.icon}</div>
                                    </div>
                                    <div className="flex flex-col p-6 md:w-3/5">
                                        <h3 className="mb-2 text-xl font-bold text-gray-800">{category.name}</h3>
                                        <div className="text-[#F56565] font-semibold text-lg mb-3">{category.count} Events</div>
                                        <p className="flex-grow mb-4 text-gray-600">{category.description}</p>
                                        <button className="self-start font-semibold text-[#F56565] hover:text-[#E53E3E] transition-colors duration-300">
                                            View Case Studies →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leadership Team Section */}
                <div className="mb-12 md:mb-16">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 font-serif text-2xl font-bold text-gray-800 md:text-3xl">Executive Leadership</h2>
                        <p className="max-w-2xl mx-auto text-base text-gray-600 sm:text-lg">Industry veterans driving innovation in event technology</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {leadershipTeam.map((member, index) => (
                            <div key={index} className="p-6 text-center transition-all duration-300 bg-white shadow-lg rounded-2xl group hover:shadow-xl hover:-translate-y-1">
                                <img src={member.image} alt={member.name} className="w-24 h-24 mx-auto mb-4 overflow-hidden border-4 border-white rounded-full shadow-lg" />
                                <h3 className="mb-1 text-xl font-bold text-gray-800">{member.name}</h3>
                                <p className="mb-3 font-semibold text-[#F56565]">{member.role}</p>
                                <p className="text-sm text-gray-600">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="mb-12 md:mb-16">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 font-serif text-2xl font-bold text-gray-800 md:text-3xl">Client Success Stories</h2>
                        <p className="max-w-2xl mx-auto text-base text-gray-600 sm:text-lg">Trusted by leading event organizers worldwide</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="p-6 transition-shadow duration-300 bg-white shadow-lg sm:p-8 rounded-2xl hover:shadow-xl">
                                <p className="mb-6 italic text-gray-600">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={testimonial.image} alt={testimonial.author} className="object-cover w-12 h-12 rounded-full" />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                                        <p className="text-sm text-[#F56565]">{testimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="p-8 text-center text-white bg-gradient-to-r from-[#F56565] to-[#E53E3E] rounded-2xl shadow-2xl md:p-12">
                    <h2 className="mb-4 font-serif text-2xl font-bold md:text-3xl">Ready to Transform Your Events?</h2>
                    <p className="max-w-2xl mx-auto mb-8 text-base text-white/90 sm:text-lg">
                        Join thousands of event professionals who trust EvenTech for their most important gatherings.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <button className="px-8 py-3 font-semibold text-[#F56565] bg-white rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                            Start Free Trial
                        </button>
                        <Link to="/contact" className="px-8 py-3 font-semibold text-white transition-all duration-300 border border-white rounded-lg hover:bg-white hover:text-[#F56565]">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;