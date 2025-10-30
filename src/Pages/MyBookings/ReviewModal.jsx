import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../Hooks/UseAxiosPublic';

const ReviewModal = ({ booking, onClose }) => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const [rating, setRating] = useState(0);

  const onSubmit = (data) => {
    const reviewData = {
      userName: user.displayName,
      userEmail: user.email,
      rating: rating,
      comment: data.comment
    };
    
    axiosPublic.post(`/event/${booking.eventId}/review`, reviewData)
      .then(res => {
        if(res.data.modifiedCount > 0) {
          Swal.fire('Thank you!', 'Your review has been submitted.', 'success');
          onClose();
        }
      });
  };

  return (
    <dialog id="review_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Review: {booking.eventTitle}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

          <div className="form-control">
            <label className="label"><span className="label-text">Rating</span></label>
            <div className="rating">
              {[1, 2, 3, 4, 5].map(star => (
                <input key={star} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onClick={() => setRating(star)} />
              ))}
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Comment</span></label>
            <textarea {...register("comment", { required: true })} className="textarea textarea-bordered h-24"></textarea>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ReviewModal;