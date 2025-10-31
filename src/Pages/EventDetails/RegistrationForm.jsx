import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../Hooks/UseAxiosPublic';

const RegistrationForm = ({ event, onClose }) => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || ''
    }
  });

  const onSubmit = (data) => {
    const bookingData = {
      userName: data.name,
      userEmail: data.email,
      phone: data.phone,
      tickets: data.tickets,
      paymentMethod: data.paymentMethod,
      eventId: event._id,
      eventTitle: event.title,
      eventDate: event.date
    };

    axiosPublic.post('/bookings', bookingData)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            title: 'Booking Confirmed! 🎉',
            text: `You have successfully registered for ${event.title}`,
            icon: 'success',
            background: '#f7f5f2',
            color: '#1f2937',
            confirmButtonColor: '#F56565',
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
    <dialog id="register_modal" className="modal modal-open">
      <div className="modal-box max-w-2xl p-0 overflow-hidden rounded-2xl shadow-2xl border border-gray-200 max-h-[80vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#F56565] to-[#E53E3E] p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="mb-2 font-serif text-2xl font-bold">Complete Your Registration</h3>
              <p className="text-lg font-semibold text-white/90">{event.title}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white transition-all duration-300 btn btn-ghost btn-circle hover:bg-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Event Summary */}
        <div className="p-6 border-b border-gray-100 bg-base-100">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F56565]/10 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#F56565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="font-semibold text-gray-800">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F56565]/10 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#F56565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-semibold text-gray-800">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F56565]/10 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#F56565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="font-semibold text-gray-800">${event.fee} per ticket</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-base-100">
          <div className="space-y-6">
           
            <div>
              <h4 className="mb-4 font-serif text-xl font-bold text-gray-800">Personal Information</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                
                <div className="form-control">
                  <label className="label">
                    <span className="font-semibold text-gray-700 label-text">Full Name</span>
                  </label>
                  <input 
                    type="text" 
                    {...register("name")} 
                    className="input input-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-12 bg-gray-50" 
                    readOnly 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-semibold text-gray-700 label-text">Email</span>
                  </label>
                  <input 
                    type="email" 
                    {...register("email")} 
                    className="input input-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-12 bg-gray-50" 
                    readOnly 
                  />
                </div>
              </div>
            </div>

            {/* Contact & Booking Details */}
            <div>
              <h4 className="mb-4 font-serif text-xl font-bold text-gray-800">Booking Details</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                
                <div className="form-control">
                  <label className="label">
                    <span className="font-semibold text-gray-700 label-text">Phone Number</span>
                  </label>
                  <input 
                    type="tel" 
                    {...register("phone", { required: true })} 
                    placeholder="Enter your phone number"
                    className="input input-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-12" 
                  />
                  {errors.phone && (
                    <span className="text-[#F56565] text-sm mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Phone number is required
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-semibold text-gray-700 label-text">Number of Tickets</span>
                    <span className="text-gray-500 label-text-alt">Max: {event.seats}</span>
                  </label>
                  <input 
                    type="number" 
                    {...register("tickets", { 
                      required: true, 
                      min: 1, 
                      max: event.seats 
                    })} 
                    defaultValue="1"
                    className="input input-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-12" 
                  />
                  {errors.tickets && (
                    <span className="text-[#F56565] text-sm mt-2">
                      Please enter between 1 and {event.seats} tickets
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 form-control">
                <label className="label">
                  <span className="font-semibold text-gray-700 label-text">Payment Method</span>
                </label>
                <select 
                  {...register("paymentMethod", { required: true })}
                  className="select select-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-12"
                >
                  <option value="">Select payment method</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                </select>
                {errors.paymentMethod && (
                  <span className="text-[#F56565] text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Please select a payment method
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 py-3 font-semibold text-gray-700 transition-all duration-300 border-gray-300 text-md btn btn-outline hover:bg-gray-50 hover:border-gray-400"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn bg-[#F56565] border-[#F56565] text-white hover:bg-[#E53E3E] hover:border-[#E53E3E] flex-1 py-3 text-md font-semibold transition-all duration-300 hover:scale-105"
              >
                Confirm Booking
              </button>
            </div>

          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RegistrationForm;
