import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../Hooks/UseAxiosPublic';

const ReviewModal = ({ booking, onClose }) => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const onSubmit = (data) => {
    const reviewData = {
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      rating: rating,
      comment: data.comment
    };
    
    axiosPublic.post(`/event/${booking.eventId}/review`, reviewData)
      .then(res => {
        if(res.data.modifiedCount > 0) {
          Swal.fire({
            title: 'Thank You! 🎉',
            text: 'Your review has been submitted successfully.',
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
          onClose();
        }
      });
  };

  return (
    <dialog id="review_modal" className="modal modal-open">
      <div className="modal-box max-w-md w-full mx-4 p-0 overflow-hidden rounded-2xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#F56565] to-[#E53E3E] p-4 sm:p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2">Share Your Experience</h3>
              <p className="text-white/90 text-xs sm:text-sm line-clamp-2">{booking.eventTitle}</p>
            </div>
            <button 
              onClick={onClose}
              className="btn btn-ghost btn-circle text-white hover:bg-white/20 transition-all duration-300 flex-shrink-0 ml-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-base-100 p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#F56565] to-[#E53E3E] rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
              {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">{user?.displayName || 'User'}</p>
              <p className="text-xs sm:text-sm text-gray-500">Reviewing your experience</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 bg-base-100">
          <div className="space-y-4 sm:space-y-6">

            {/* Rating */}
            <div>
              <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 font-serif">
                How would you rate this event?
              </label>
              <div className="flex justify-center gap-1 sm:gap-2 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`text-2xl sm:text-3xl transition-all duration-300 transform hover:scale-125 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  {rating === 0 ? 'Select a rating' : 
                   rating === 1 ? 'Poor' :
                   rating === 2 ? 'Fair' :
                   rating === 3 ? 'Good' :
                   rating === 4 ? 'Very Good' : 'Excellent'}
                </p>
                {rating === 0 && (
                  <p className="text-[#F56565] text-xs sm:text-sm mt-1 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Please select a rating
                  </p>
                )}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 font-serif">
                Share your thoughts
              </label>
              <textarea 
                {...register("comment", { 
                  required: "Please share your experience",
                  minLength: {
                    value: 10,
                    message: "Review must be at least 10 characters long"
                  }
                })} 
                placeholder="Tell us about your experience at this event. What did you enjoy? What could be improved?"
                className="textarea textarea-bordered w-full h-24 sm:h-32 focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 resize-none text-sm sm:text-base"
              />
              {errors.comment && (
                <p className="text-[#F56565] text-xs sm:text-sm mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.comment.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 py-2 sm:py-3 transition-all duration-300 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={rating === 0}
                className="btn bg-[#F56565] border-[#F56565] text-white hover:bg-[#E53E3E] hover:border-[#E53E3E] py-2 sm:py-3 transition-all duration-300 hover:scale-105 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed order-1 sm:order-2"
              >
                Submit Review
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>
    </dialog>
  );
};

export default ReviewModal;
