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
          Swal.fire('Success!', 'Your booking is confirmed.', 'success');
          onClose(); // Close the modal and trigger a refresh on the details page
        }
      });
  };

  return (
    <dialog id="register_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Register for: {event.title}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          
          <div>
            <label className="label"><span className="label-text">Name</span></label>
            <input type="text" {...register("name")} className="input input-bordered w-full" readOnly />
          </div>

          <div>
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" {...register("email")} className="input input-bordered w-full" readOnly />
          </div>
          
          <div>
            <label className="label"><span className="label-text">Phone Number</span></label>
            <input type="tel" {...register("phone", { required: true })} className="input input-bordered w-full" />
            {errors.phone && <span className="text-red-500">Phone number is required.</span>}
          </div>

          <div>
            <label className="label"><span className="label-text">Number of Tickets</span></label>
            <input type="number" {...register("tickets", { required: true, min: 1, max: event.seats })} defaultValue="1" className="input input-bordered w-full" />
            {errors.tickets && <span className="text-red-500">Please enter a valid number of tickets.</span>}
          </div>

          <div>
            <label className="label"><span className="label-text">Payment Method</span></label>
            <input type="text" {...register("paymentMethod")} placeholder="e.g., Credit Card, PayPal" className="input input-bordered w-full" />
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Confirm Booking</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RegistrationForm;