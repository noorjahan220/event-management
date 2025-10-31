import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [disabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setDisabled(false);
    }, []);

    const handleLogin = event => {
        event.preventDefault();
        setIsLoading(true);
        
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "Welcome Back!",
                    text: "Login successful!",
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
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: "Login Failed",
                    text: error.message,
                    icon: "error",
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
                                        Welcome Back to 
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F56565] to-[#E53E3E] mt-2">
                                            EvenTech
                                        </span>
                                    </h1>
                                    <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                                        Continue your journey with us. Discover amazing events, connect with communities, and create unforgettable memories.
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-2 h-2 bg-[#F56565] rounded-full"></div>
                                        <span>Access personalized event recommendations</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-2 h-2 bg-[#F56565] rounded-full"></div>
                                        <span>Manage your tickets and bookings</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-2 h-2 bg-[#F56565] rounded-full"></div>
                                        <span>Connect with like-minded people</span>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex justify-center lg:justify-start gap-8 pt-6">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-neutral">50K+</p>
                                        <p className="text-sm text-gray-500">Active Members</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-neutral">1K+</p>
                                        <p className="text-sm text-gray-500">Events Monthly</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-neutral">98%</p>
                                        <p className="text-sm text-gray-500">Satisfaction Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Login Form */}
                        <div className="w-full lg:w-1/2 max-w-md">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-neutral font-serif">Sign In</h2>
                                    <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-6">
                                    {/* Email Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-lg font-semibold text-neutral">Email</span>
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="email" 
                                                name="email" 
                                                placeholder="Enter your email" 
                                                className="input input-bordered w-full pl-12 focus:outline-none focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-14 text-lg" 
                                                required 
                                            />
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-lg font-semibold text-neutral">Password</span>
                                        </label>
                                        <div className="relative">
                                            <input 
                                                name='password'
                                                type="password" 
                                                placeholder="Enter your password" 
                                                className="input input-bordered w-full pl-12 focus:outline-none focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-14 text-lg" 
                                                required 
                                            />
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <label className="label">
                                            <a href="#" className="label-text-alt link link-hover text-[#F56565] font-semibold">Forgot password?</a>
                                        </label>
                                    </div>

                                    {/* Login Button */}
                                    <div className="form-control mt-8">
                                        <button 
                                            disabled={disabled || isLoading}
                                            className={`btn bg-[#F56565] border-[#F56565] text-white h-14 text-lg font-semibold transition-all duration-300 ${
                                                isLoading ? 'loading' : ''
                                            } ${
                                                !disabled && !isLoading ? 'hover:bg-[#E53E3E] hover:border-[#E53E3E] hover:scale-105 hover:shadow-lg' : ''
                                            }`}
                                        >
                                            {isLoading ? 'Signing In...' : 'Sign In'}
                                        </button>
                                    </div>
                                </form>

                                {/* Divider */}
                                <div className="divider my-8 text-gray-400">OR CONTINUE WITH</div>

                                {/* Social Login */}
                                <div className="mb-6">
                                    <SocialLogin />
                                </div>

                                {/* Sign Up Link */}
                                <div className="text-center">
                                    <p className="text-gray-600">
                                        New to EvenTech?{' '}
                                        <Link 
                                            to="/register" 
                                            className="link text-[#F56565] font-semibold text-lg hover:text-[#E53E3E] transition-colors duration-300"
                                        >
                                            Create an account
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

export default Login;