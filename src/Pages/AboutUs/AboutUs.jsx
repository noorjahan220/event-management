import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


const CountUp = ({ end, duration = 2000, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const frameDuration = 16; // Target 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const increment = end / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
};

const AboutUs = () => {
    const teamMembers = [
        {
            name: "Sarah Johnson",
            role: "Founder & CEO",
            description: "Passionate about bringing people together through memorable events.",
            initial: "S"
        },
        {
            name: "Michael Chen",
            role: "Technical Director",
            description: "Ensures our platform runs smoothly and securely for all users.",
            initial: "M"
        },
        {
            name: "Emily Rodriguez",
            role: "Event Curator",
            description: "Handpicks the best events to ensure quality experiences.",
            initial: "E"
        },
        {
            name: "David Kim",
            role: "Customer Success",
            description: "Dedicated to making every user's journey exceptional.",
            initial: "D"
        }
    ];

    const stats = [
        { number: 50000, label: "Community Members", suffix: "+" },
        { number: 1000, label: "Events Monthly", suffix: "+" },
        { number: 100, label: "Cities Covered", suffix: "+" },
        { number: 4.9, label: "User Rating", suffix: "★", isDecimal: true }
    ];

    const foundingStats = [
        { number: 2018, label: "Founded", suffix: "" },
        { number: 100, label: "Event Categories", suffix: "+" },
        { number: 98, label: "Satisfaction Rate", suffix: "%" },
        { number: 24, label: "Support", suffix: "/7" }
    ];

    return (
        <div className="min-h-screen pt-16 pb-12 sm:pt-20 lg:pt-24 sm:pb-16">
            <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mb-16 text-center lg:mb-20">
                    <h1 className="mb-6 font-serif text-4xl font-bold text-gray-800 sm:text-5xl lg:text-6xl">
                        About EvenTech
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600 sm:text-xl">
                        We're on a mission to transform how people discover, experience, 
                        and connect through extraordinary events.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="p-6 mb-16 bg-white shadow-lg sm:p-8 rounded-2xl lg:p-12">
                    <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-6 font-serif text-3xl font-bold text-gray-800 lg:text-4xl">
                                Our Mission
                            </h2>
                            <p className="mb-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                                At EvenTech, we believe that life's most memorable moments happen when people come together. 
                                We're dedicated to creating a platform that makes event discovery seamless, booking effortless, 
                                and experiences unforgettable.
                            </p>
                            <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
                                From intimate workshops to grand festivals, we're here to help you find your next adventure 
                                and connect with like-minded individuals who share your passions.
                            </p>
                            <Link 
                                to="/events" 
                                className="inline-block px-6 py-3 text-base font-semibold text-white transition-all duration-300 border-[#F56565] rounded-md bg-[#F56565] hover:bg-[#E53E3E] hover:border-[#E53E3E] hover:scale-105 sm:px-8 sm:text-lg"
                            >
                                Explore Events
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {foundingStats.map((stat, index) => (
                                <div 
                                    key={index} 
                                    className={`rounded-2xl p-4 sm:p-6 text-center ${
                                        index === 0 || index === 3 
                                            ? 'bg-gradient-to-br from-[#F56565] to-[#E53E3E] text-white' 
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    <div className="mb-2 text-3xl font-bold">
                                        <CountUp end={stat.number} duration={2500} />
                                        {stat.suffix}
                                    </div>
                                    <div className="text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Animated Stats Section */}
                <div className="p-6 mb-16 bg-white shadow-lg sm:p-8 rounded-2xl">
                    <div className="mb-8 text-center">
                        <h2 className="mb-4 font-serif text-3xl font-bold text-gray-800 lg:text-4xl">
                            Our Impact
                        </h2>
                        <p className="max-w-2xl mx-auto text-base text-gray-600 sm:text-lg">
                            Numbers that tell our story of growth and community engagement
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4 md:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="p-4 sm:p-6">
                                <div className="text-3xl lg:text-4xl font-bold text-[#F56565] mb-2">
                                    <CountUp 
                                        end={stat.number} 
                                        duration={2000} 
                                        decimals={stat.isDecimal ? 1 : 0} 
                                    />
                                    {stat.suffix}
                                </div>
                                <div className="text-sm text-gray-600 lg:text-base">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="p-6 mb-16 bg-white shadow-lg sm:p-8 rounded-2xl lg:p-12">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 font-serif text-3xl font-bold text-gray-800 lg:text-4xl">
                            Meet Our Team
                        </h2>
                        <p className="max-w-2xl mx-auto text-base text-gray-600 sm:text-lg">
                            Passionate individuals dedicated to creating exceptional event experiences for our community.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 sm:gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#F56565] to-[#E53E3E] flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                                    {member.initial}
                                </div>
                                <h3 className="mb-1 text-lg font-semibold text-gray-800">
                                    {member.name}
                                </h3>
                                <p className="text-[#F56565] text-sm font-medium mb-2">
                                    {member.role}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div className="p-6 bg-white shadow-lg sm:p-8 rounded-2xl lg:p-12">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 font-serif text-3xl font-bold text-gray-800 lg:text-4xl">
                            Our Values
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="p-4 text-center sm:p-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-[#F56565]/10 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-[#F56565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-800">Community First</h3>
                            <p className="text-gray-600">
                                We prioritize building strong connections and fostering a vibrant community of event enthusiasts.
                            </p>
                        </div>
                        <div className="p-4 text-center sm:p-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-[#F56565]/10 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-[#F56565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-800">Trust & Safety</h3>
                            <p className="text-gray-600">
                                Your security and peace of mind are our top priorities in every event and transaction.
                            </p>
                        </div>
                        <div className="p-4 text-center sm:p-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-[#F56565]/10 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-[#F56565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-800">Innovation</h3>
                            <p className="text-gray-600">
                                We continuously evolve our platform to deliver cutting-edge event discovery experiences.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <h2 className="mb-6 font-serif text-3xl font-bold text-gray-800 lg:text-4xl">
                        Ready to Find Your Next Adventure?
                    </h2>
                    <p className="max-w-2xl mx-auto mb-8 text-base text-gray-600 sm:text-lg">
                        Join thousands of event enthusiasts discovering unforgettable experiences every day.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link 
                            to="/events" 
                            className="inline-block w-full px-6 py-3 text-base font-semibold text-white transition-all duration-300 border-[#F56565] rounded-md bg-[#F56565] hover:bg-[#E53E3E] hover:border-[#E53E3E] hover:scale-105 sm:w-auto sm:px-8 sm:text-lg"
                        >
                            Browse Events
                        </Link>
                        <Link 
                            to="/register" 
                            className="inline-block w-full px-6 py-3 text-base font-semibold text-[#F56565] transition-all duration-300 border border-[#F56565] rounded-md hover:bg-[#F56565] hover:text-white sm:w-auto sm:px-8 sm:text-lg"
                        >
                            Join Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;