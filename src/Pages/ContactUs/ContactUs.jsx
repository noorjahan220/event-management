import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const ContactUs = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        console.log('Form Data:', data);
        
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            Swal.fire({
                title: 'Message Sent!',
                text: 'Thank you for contacting us. We\'ll get back to you within 24 hours.',
                icon: 'success',
                confirmButtonColor: '#F56565',
                background: '#f7f5f2',
                color: '#1f2937'
            });
            
            reset();
        } catch (error) {
            console.error("Failed to send message:", error); 
            Swal.fire({
                title: 'Error',
                text: 'Failed to send message. Please try again.',
                icon: 'error',
                confirmButtonColor: '#F56565',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: "Call Us",
            details: "+1 (555) 123-4567",
            description: "Mon to Fri 9am to 6pm"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Email Us",
            details: "support@eventech.com",
            description: "Send us your query anytime"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Visit Us",
            details: "123 Event Street, City",
            description: "Visit our headquarters"
        }
    ];

    return (
        <div className="min-h-screen pb-12 sm:pt-20 lg:pt-24 sm:pb-16">
            <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mb-16 text-center lg:mb-20">
                    <h1 className="mb-6 font-serif text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl">
                        Get In Touch
                    </h1>
                    <p className="max-w-3xl mx-auto text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
                        We're here to help you have the best event experience. Reach out to us with any questions or concerns.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3">
                    {/* Contact Information */}
                    <div className="lg:col-span-1">
                        <div className="sticky p-6 bg-white shadow-lg sm:p-8 rounded-2xl top-24">
                            <h2 className="mb-8 font-serif text-2xl font-bold text-gray-800 md:text-3xl">Contact Information</h2>
                            
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-[#F56565]/10 text-[#F56565]">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                            <p className="font-medium text-[#F56565]">{item.details}</p>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="pt-8 mt-8 border-t border-gray-200">
                                <h3 className="mb-4 font-semibold text-gray-800">Follow Us</h3>
                                <div className="flex space-x-4">
                                    {['Fb', 'Tw', 'In', 'Li'].map((social) => (
                                        <button
                                            key={social}
                                            aria-label={`Follow us on ${social}`}
                                            className="flex items-center justify-center w-10 h-10 text-gray-600 transition-all duration-300 bg-gray-100 rounded-lg hover:bg-[#F56565] hover:text-white"
                                        >
                                            <span className="text-sm font-semibold">{social}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-6 bg-white shadow-lg lg:col-span-2 sm:p-8 rounded-2xl">
                        <h2 className="mb-6 font-serif text-2xl font-bold text-gray-800 md:text-3xl">Send us a Message</h2>
                        <p className="mb-8 text-gray-600">
                            Fill out the form below and we'll get back to you as soon as possible.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className="block mb-2 font-semibold text-gray-800">First Name</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        {...register("firstName", { required: "First name is required" })}
                                        className="w-full h-12 px-4 transition-all duration-300 bg-gray-100 border-transparent rounded-lg focus:border-[#F56565] focus:bg-white focus:ring-2 focus:ring-[#F56565]/20"
                                        placeholder="John"
                                    />
                                    {errors.firstName && <p role="alert" className="mt-2 text-sm text-red-500">{errors.firstName.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block mb-2 font-semibold text-gray-800">Last Name</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        {...register("lastName", { required: "Last name is required" })}
                                        className="w-full h-12 px-4 transition-all duration-300 bg-gray-100 border-transparent rounded-lg focus:border-[#F56565] focus:bg-white focus:ring-2 focus:ring-[#F56565]/20"
                                        placeholder="Doe"
                                    />
                                    {errors.lastName && <p role="alert" className="mt-2 text-sm text-red-500">{errors.lastName.message}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 font-semibold text-gray-800">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                                    className="w-full h-12 px-4 transition-all duration-300 bg-gray-100 border-transparent rounded-lg focus:border-[#F56565] focus:bg-white focus:ring-2 focus:ring-[#F56565]/20"
                                    placeholder="john.doe@example.com"
                                />
                                {errors.email && <p role="alert" className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-2 font-semibold text-gray-800">Message</label>
                                <textarea
                                    id="message"
                                    {...register("message", { required: "Message is required", minLength: { value: 10, message: "Message must be at least 10 characters" } })}
                                    rows="5"
                                    className="w-full p-4 transition-all duration-300 bg-gray-100 border-transparent rounded-lg resize-none focus:border-[#F56565] focus:bg-white focus:ring-2 focus:ring-[#F56565]/20"
                                    placeholder="Tell us how we can help..."
                                ></textarea>
                                {errors.message && <p role="alert" className="mt-2 text-sm text-red-500">{errors.message.message}</p>}
                            </div>

                            <button type="submit" disabled={isSubmitting} className="flex items-center justify-center w-full h-14 px-6 text-base font-semibold text-white transition-all duration-300 rounded-lg sm:text-lg disabled:cursor-not-allowed disabled:bg-gray-400 bg-[#F56565] hover:bg-[#E53E3E] hover:scale-105 active:scale-100">
                                {isSubmitting ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        <span className="ml-3">Sending...</span>
                                    </>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;