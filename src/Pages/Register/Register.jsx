import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import useAxiosPublic from '../Hooks/UseAxiosPublic';
import SocialLogin from '../../components/SocialLogin';

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true);
        createUser(data.email, data.password)
            .then(() => {
                updateUserProfile(data.name, null)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        };
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId || res.data.message === 'user already exists') {
                                    reset();
                                    Swal.fire({
                                        title: "Welcome to EventFlow!",
                                        text: "Your account has been created successfully!",
                                        icon: "success",
                                        showClass: {
                                            popup: `
                                                animate__animated
                                                animate__fadeInUp
                                                animate__faster
                                            `
                                        },
                                        hideClass: {
                                            popup: `
                                                animate__animated
                                                animate__fadeOutDown
                                                animate__faster
                                            `
                                        },
                                        background: '#f7f5f2',
                                        color: '#1f2937'
                                    });
                                    navigate('/');
                                }
                            })
                            .catch(error => {
                                console.error(error);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Registration Error',
                                    text: 'Failed to save user data. Please try again.',
                                    background: '#f7f5f2',
                                    color: '#1f2937'
                                });
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Profile Update Failed',
                            text: 'Account created but profile update failed.',
                            background: '#f7f5f2',
                            color: '#1f2937'
                        });
                    });
            })
            .catch(error => {
                console.error(error);
                let errorMessage = "Registration failed. Please try again.";
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = "This email is already in use. Please log in.";
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = "Password is too weak. Please choose a stronger password.";
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: errorMessage,
                    background: '#f7f5f2',
                    color: '#1f2937'
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-center justify-center min-h-[80vh]">
                        
                        {/* Left Column - Branding & Info */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <div className="space-y-8">
                                <div>
                                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-neutral">
                                        Join 
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2">
                                            EvenTech
                                        </span>
                                    </h1>
                                    <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                                        Create your account and unlock a world of amazing events. Connect with communities, discover experiences, and create memories that last forever.
                                    </p>
                                </div>

                                {/* Benefits List */}
                                <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        <span>Personalized event recommendations</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                                        <span>Easy ticket booking and management</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                                        <span>Exclusive early access to events</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-2 h-2 bg-info rounded-full"></div>
                                        <span>Connect with like-minded people</span>
                                    </div>
                                </div>

                                {/* Community Stats */}
                                <div className="flex justify-center lg:justify-start gap-8 pt-6">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-neutral">50K+</p>
                                        <p className="text-sm text-gray-500">Community Members</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-neutral">1K+</p>
                                        <p className="text-sm text-gray-500">Events Monthly</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-neutral">4.9★</p>
                                        <p className="text-sm text-gray-500">User Rating</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Registration Form */}
                        <div className="w-full lg:w-1/2 max-w-md">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-neutral font-serif">Create Account</h2>
                                    <p className="text-gray-600 mt-2">Join our community today</p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Name Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-lg font-semibold text-neutral">Full Name</span>
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                {...register("name", { required: true })} 
                                                placeholder="Enter your full name" 
                                                className="input input-bordered w-full pl-12 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-14 text-lg" 
                                            />
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.name && (
                                            <span className="text-red-600 text-sm mt-2 flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Name is required
                                            </span>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-lg font-semibold text-neutral">Email</span>
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="email" 
                                                {...register("email", { required: true })} 
                                                placeholder="Enter your email" 
                                                className="input input-bordered w-full pl-12 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-14 text-lg" 
                                            />
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.email && (
                                            <span className="text-red-600 text-sm mt-2 flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Email is required
                                            </span>
                                        )}
                                    </div>

                                    {/* Password Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-lg font-semibold text-neutral">Password</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                {...register("password", {
                                                    required: true,
                                                    minLength: 6,
                                                    maxLength: 20,
                                                    pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/
                                                })}
                                                placeholder="Create a strong password"
                                                className="input input-bordered w-full pl-12 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-14 text-lg"
                                            />
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.password?.type === 'required' && (
                                            <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Password is required
                                            </p>
                                        )}
                                        {errors.password?.type === 'minLength' && (
                                            <p className="text-red-600 text-sm mt-2">Password must be at least 6 characters long.</p>
                                        )}
                                        {errors.password?.type === 'maxLength' && (
                                            <p className="text-red-600 text-sm mt-2">Password must be less than 20 characters long.</p>
                                        )}
                                        {errors.password?.type === 'pattern' && (
                                            <p className="text-red-600 text-sm mt-2">Password must include at least one uppercase letter, one lowercase letter, and one number.</p>
                                        )}
                                    </div>

                                    

                                    {/* Register Button */}
                                    <div className="form-control mt-8">
                                        <button 
                                            type="submit"
                                            className={`btn btn-primary h-14 text-lg font-semibold transition-all duration-300 ${
                                                isLoading ? 'loading' : ''
                                            } ${
                                                !isLoading ? 'hover:scale-105 hover:shadow-lg' : ''
                                            }`}
                                        >
                                            {isLoading ? 'Creating Account...' : 'Create Account'}
                                        </button>
                                    </div>
                                </form>

                                {/* Divider */}
                                <div className="divider my-8 text-gray-400">OR SIGN UP WITH</div>

                                {/* Social Login */}
                                <div className="mb-6">
                                    <SocialLogin />
                                </div>

                                {/* Login Link */}
                                <div className="text-center">
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <Link 
                                            to="/login" 
                                            className="link link-primary font-semibold text-lg hover:text-secondary transition-colors duration-300"
                                        >
                                            Sign in here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;