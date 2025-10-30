import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/UseAxiosPublic';
import SocialLogin from '../../components/SocialLogin';

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
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
                                // --- FIX: Handle both new and existing users as a success ---
                                if (res.data.insertedId || res.data.message === 'user already exists') {
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User created successfully!",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            });
                    })
            })
            // --- FIX: Add error handling for a better UX ---
            .catch(error => {
                console.error(error);
                let errorMessage = "Registration failed. Please try again.";
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = "This email is already in use. Please log in.";
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                });
            });
    };

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* --- Name Input --- */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600'>Name is required</span>}
                            </div>
                            
                            {/* --- REMOVED PHOTOURL INPUT FIELD --- */}

                            {/* --- Email Input --- */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>

                            {/* --- Password Input --- */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/
                                    })}
                                    placeholder="Password"
                                    className="input input-bordered"
                                />
                                {errors.password?.type === 'required' && <p>Password is required.</p>}
                                {errors.password?.type === 'minLength' && <p>Password must be at least 6 characters long.</p>}
                                {errors.password?.type === 'maxLength' && <p>Password must be less than 20 characters long.</p>}
                                {errors.password?.type === 'pattern' && (
                                    <p>Password must include at least one uppercase letter, one lowercase letter, and one number.</p>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;