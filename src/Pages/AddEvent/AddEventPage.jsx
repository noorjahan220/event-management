import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosPublic from '../Hooks/UseAxiosPublic';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const IMGBB_HOSTING_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

const AddEventPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const res = await axios.post(IMGBB_HOSTING_URL, imageFile, {
            headers: { 'content-type': 'multipart/form-data' }
        });
        
        if (res.data.success) {
            const eventData = {
                title: data.name,
                date: data.date,
                location: data.location,
                category: data.category,
                description: data.description,
                seats: parseInt(data.seats),
                image: res.data.data.display_url,
                organizer: { name: "Admin Event", email: "admin@eventech.com"},
                fee: parseInt(data.fee) || 0,
                deadline: data.date 
            };

            const eventRes = await axiosPublic.post('/events', eventData);
            if(eventRes.data.insertedId){
                reset();
                Swal.fire({
                    title: 'Event Created! 🎉',
                    text: `${data.name} has been successfully added.`,
                    icon: 'success',
                    confirmButtonColor: '#F56565',
                    background: '#f7f5f2',
                    color: '#1f2937',
                    showClass: {
                        popup: 'animate__animated animate__fadeInUp animate__faster'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutDown animate__faster'
                    }
                });
            }
        }
    };

    return (
        <div className="min-h-screen  pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12 lg:mb-16">
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                        Create New Event
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Fill in the details below to add a new event to our platform
                    </p>
                </div>

                {/* Form Container */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            {/* Event Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-800 text-lg">Event Name*</span>
                                </label>
                                <input 
                                    type="text" 
                                    {...register('name', { required: "Event name is required" })} 
                                    placeholder="Enter event name"
                                    className="input input-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-12 text-base"
                                />
                                {errors.name && (
                                    <span className="text-[#F56565] text-sm mt-2 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>

                            {/* Date & Location Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-gray-800 text-lg">Date*</span>
                                    </label>
                                    <input 
                                        type="date" 
                                        {...register('date', { required: "Event date is required" })} 
                                        className="input input-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-12 text-base"
                                    />
                                    {errors.date && (
                                        <span className="text-[#F56565] text-sm mt-2 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.date.message}
                                        </span>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-gray-800 text-lg">Location*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        {...register('location', { required: "Location is required" })} 
                                        placeholder="Enter event location"
                                        className="input input-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-12 text-base"
                                    />
                                    {errors.location && (
                                        <span className="text-[#F56565] text-sm mt-2 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.location.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            {/* Category & Seats Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-gray-800 text-lg">Category*</span>
                                    </label>
                                    <select 
                                        {...register('category', { required: "Category is required" })} 
                                        className="select select-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-12 text-base"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Music">Music</option>
                                        <option value="Tech">Tech</option>
                                        <option value="Art">Art</option>
                                        <option value="Food">Food</option>
                                    </select>
                                    {errors.category && (
                                        <span className="text-[#F56565] text-sm mt-2 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.category.message}
                                        </span>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-gray-800 text-lg">Available Seats*</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        {...register('seats', { 
                                            required: "Number of seats is required",
                                            min: { value: 1, message: "Must have at least 1 seat" }
                                        })} 
                                        placeholder="Enter number of seats"
                                        className="input input-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-12 text-base"
                                    />
                                    {errors.seats && (
                                        <span className="text-[#F56565] text-sm mt-2 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.seats.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Fee Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-800 text-lg">Registration Fee ($)</span>
                                </label>
                                <input 
                                    type="number" 
                                    {...register('fee')} 
                                    placeholder="Enter registration fee (0 for free)"
                                    className="input input-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-12 text-base"
                                />
                            </div>
                            
                            {/* Description */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-800 text-lg">Description</span>
                                </label>
                                <textarea 
                                    {...register('description')} 
                                    placeholder="Describe the event, including activities, speakers, or special features..."
                                    className="textarea textarea-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-32 text-base resize-none"
                                ></textarea>
                            </div>

                            {/* Image Upload */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-800 text-lg">Event Image*</span>
                                </label>
                                <input 
                                    type="file" 
                                    {...register('image', { required: "Event image is required" })} 
                                    className="file-input file-input-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300"
                                    accept="image/*"
                                />
                                {errors.image && (
                                    <span className="text-[#F56565] text-sm mt-2 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.image.message}
                                    </span>
                                )}
                                <p className="text-gray-500 text-sm mt-2">
                                    Upload a high-quality image that represents your event (JPG, PNG, etc.)
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button 
                                    type="submit" 
                                    className="btn bg-[#F56565] border-[#F56565] text-white hover:bg-[#E53E3E] hover:border-[#E53E3E] w-full py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                                >
                                    Create Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEventPage;