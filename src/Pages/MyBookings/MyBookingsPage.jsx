import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ReviewModal from './ReviewModal';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../Hooks/UseAxiosPublic';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const fetchBookings = () => {
    axiosPublic.get(`/bookings?email=${user?.email}`)
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleCancelBooking = (id, eventTitle) => {
    Swal.fire({
      title: 'Cancel Booking?',
      text: `Are you sure you want to cancel your booking for "${eventTitle}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F56565',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'Keep Booking',
      background: '#f7f5f2',
      color: '#1f2937'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/booking/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: 'Cancelled!',
                text: 'Your booking has been cancelled.',
                icon: 'success',
                confirmButtonColor: '#F56565',
                background: '#f7f5f2',
                color: '#1f2937'
              });
              fetchBookings();
            }
          });
      }
    });
  };

  if (loading) return (
    
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-[#F56565]"></span>
        <p className="text-lg text-gray-600">Loading your bookings...</p>
      </div>
    
  );

  return (
    <div className="min-h-screen  pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            My Bookings
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your event registrations and share your experiences
          </p>
        </div>

        {/* Bookings Content */}
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-[#F56565] to-[#E53E3E] p-6 rounded-t-2xl text-white">
                  <h3 className="font-serif text-xl font-bold line-clamp-2 mb-2">
                    {booking.eventTitle}
                  </h3>
                  <p className="text-white/90 text-sm">Booking ID: {booking._id.slice(-8)}</p>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#F56565]/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#F56565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Event Date</p>
                        <p className="font-semibold text-gray-800">{booking.eventDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#F56565]/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#F56565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tickets</p>
                        <p className="font-semibold text-gray-800">{booking.tickets}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#F56565]/10 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#F56565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment Method</p>
                      <p className="font-semibold text-gray-800">{booking.paymentMethod || 'Not specified'}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => handleCancelBooking(booking._id, booking.eventTitle)}
                      className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 flex-1 py-2 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => setSelectedBooking(booking)}
                      className="btn bg-[#F56565] border-[#F56565] text-white hover:bg-[#E53E3E] hover:border-[#E53E3E] flex-1 py-2 transition-all duration-300 hover:scale-105"
                    >
                      Write Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6">📅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">No Bookings Yet</h2>
            <p className="text-gray-600 mb-8 text-lg">
              You haven't registered for any events yet. Explore our upcoming events and book your spot!
            </p>
            <button 
              onClick={() => window.location.href = '/events'}
              className="btn bg-[#F56565] border-[#F56565] text-white hover:bg-[#E53E3E] hover:border-[#E53E3E] px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Browse Events
            </button>
          </div>
        )}


        {/* Review Modal */}
        {selectedBooking && (
          <ReviewModal 
            booking={selectedBooking} 
            onClose={() => setSelectedBooking(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;