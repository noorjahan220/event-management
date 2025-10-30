import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Swal from 'sweetalert2';
import RegistrationForm from './RegistrationForm';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../Hooks/UseAxiosPublic';

const EventDetailsPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchEventData = () => {
        axiosPublic.get(`/event/${id}`)
            .then(res => {
                setEvent(res.data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchEventData();
    }, [id]);

    const handleRegisterClick = () => {
        if (!user) {
            Swal.fire({
                title: 'Not Logged In',
                text: "You need to log in to register for an event.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
            return;
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        fetchEventData(); // Re-fetch data to show updated seat count
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    if (!event) return <div className="pt-24 text-center">Event not found.</div>;

    return (
        <div className="pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <img src={event.image} alt={event.title} className="w-full h-96 object-cover rounded-lg shadow-lg" />
                <div className="mt-8 bg-base-100 p-8 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
                    <div className="prose max-w-none mb-6">
                        <p>{event.description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                        <div><strong>Organizer:</strong> {event.organizer.name}</div>
                        <div><strong>Location:</strong> {event.location}</div>
                        <div><strong>Date:</strong> {event.date}</div>
                        <div><strong>Registration Deadline:</strong> {event.deadline}</div>
                        <div><strong>Available Seats:</strong> <span className="font-extrabold text-accent">{event.seats}</span></div>
                        <div><strong>Fee:</strong> <span className="font-extrabold text-accent">${event.fee}</span></div>
                    </div>
                    <div className="mt-10 text-center">
                        <button
                            onClick={handleRegisterClick}
                            className="btn btn-primary btn-lg"
                            disabled={event.seats === 0}>
                            {event.seats > 0 ? 'Register Now' : 'Sold Out'}
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && <RegistrationForm event={event} onClose={handleCloseModal} />}
        </div>
    );
};

export default EventDetailsPage;