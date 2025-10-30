import React from 'react';
import { FaGoogle } from 'react-icons/fa6';

import { useNavigate } from 'react-router-dom';
import useAuth from './../Pages/Hooks/UseAuth';
import useAxiosPublic from '../Pages/Hooks/UseAxiosPublic';
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        // --- FIX: Add a log to see the backend response ---
                        console.log('User saved or already exists:', res.data);
                        navigate('/');
                    });
            })
            // --- FIX: Add error handling for when user closes the popup ---
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Could not sign in with Google. Please try again.',
                });
            });
    };
    return (
        <div className='p-8'>
            <div className="divider"></div>
            <button onClick={handleGoogleSignIn} className="btn">
                <FaGoogle className='mr-2'/>
               Google

            </button>
        </div>
    );
};

export default SocialLogin;