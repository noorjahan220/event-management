import React from 'react';
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosPublic from '../Hooks/UseAxiosPublic';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const IMGBB_HOSTING_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

const AddEventPage = () => {
    const { register, handleSubmit, reset } = useForm();
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
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been added.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <div className="pt-24 pb-12 px-4">
            <h1 className="text-4xl font-bold text-center mb-10">Add a New Event</h1>
            <div className="max-w-4xl mx-auto bg-base-200 p-8 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Event Name*</span></label>
                        <input type="text" {...register('name', { required: true })} className="input input-bordered" />
                    </div>

                    <div className="flex gap-6">
                        <div className="form-control w-1/2">
                            <label className="label"><span className="label-text">Date*</span></label>
                            <input type="date" {...register('date', { required: true })} className="input input-bordered" />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label"><span className="label-text">Location*</span></label>
                            <input type="text" {...register('location', { required: true })} className="input input-bordered" />
                        </div>
                    </div>
                    
                    <div className="flex gap-6">
                        <div className="form-control w-1/2">
                            <label className="label"><span className="label-text">Category*</span></label>
                            <select {...register('category', { required: true })} className="select select-bordered">
                                <option disabled selected>Select a category</option>
                                <option>Music</option>
                                <option>Tech</option>
                                <option>Art</option>
                                <option>Food</option>
                            </select>
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label"><span className="label-text">Available Seats*</span></label>
                            <input type="number" {...register('seats', { required: true })} className="input input-bordered" />
                        </div>
                    </div>
                    
                    <div className="form-control">
                        <label className="label"><span className="label-text">Description</span></label>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24"></textarea>
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Event Image*</span></label>
                        <input type="file" {...register('image', { required: true })} className="file-input file-input-bordered w-full" />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">Add Event</button>
                </form>
            </div>
        </div>
    );
};

export default AddEventPage;