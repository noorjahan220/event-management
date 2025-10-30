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

  const handleCancelBooking = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/booking/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
              fetchBookings(); // Refresh the list
            }
          });
      }
    });
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="pt-24 pb-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">My Bookings</h1>
      <div className="overflow-x-auto">
        {bookings.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Tickets</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.eventTitle}</td>
                  <td>{booking.eventDate}</td>
                  <td>{booking.tickets}</td>
                  <td className="space-x-2">
                    <button onClick={() => handleCancelBooking(booking._id)} className="btn btn-error btn-sm">Cancel</button>
                    <button onClick={() => setSelectedBooking(booking)} className="btn btn-info btn-sm">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-lg">You have no bookings yet.</p>
        )}
      </div>
      {selectedBooking && <ReviewModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />}
    </div>
  );
};

export default MyBookingsPage;