import React, { useContext, useEffect } from 'react'; // 1. Import useEffect
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';

const UserProfile = () => {
    const { user, updateUserProfile, loading } = useContext(AuthContext);
    
    // 2. Destructure `reset` from useForm
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // 3. Add this useEffect hook
    useEffect(() => {
        // This effect will run whenever the `user` object from context changes.
        // We check if `user` exists to avoid errors on initial load.
        if (user) {
            // `reset` updates the form fields with new default values.
            reset({
                name: user.displayName,
                photoURL: user.photoURL
            });
        }
    }, [user, reset]); // It depends on the user object and the reset function

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;

        updateUserProfile(name, photoURL)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Profile updated successfully.",
                    icon: "success"
                });
                // No need to reload! The useEffect will handle the update.
            })
            .catch(error => {
                console.error("Profile update error:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Could not update profile.",
                    icon: "error"
                });
            });
    };


    return (
        <div className="pt-24 bg-base-200 min-h-screen">
            <div className="max-w-4xl mx-auto p-8">
                <div className="card lg:card-side bg-base-100 shadow-xl">
                    {/* --- Profile Avatar and Basic Info --- */}
                    <div className="flex flex-col items-center p-8 border-b lg:border-r lg:border-b-0">
                        <div className="avatar">
                            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} alt="User Avatar" />
                            </div>
                        </div>
                        <h2 className="card-title mt-4 text-2xl">{user?.displayName}</h2>
                        <p>{user?.email}</p>
                    </div>

                    {/* --- Update Form --- */}
                    <div className="card-body">
                        <h2 className="card-title">Update Your Profile</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.displayName}
                                    {...register("name", { required: true })}
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-500 text-sm mt-1">Name is required.</span>}
                            </div>
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.photoURL}
                                    {...register("photoURL", { required: true })}
                                    className="input input-bordered"
                                />
                                {errors.photoURL && <span className="text-red-500 text-sm mt-1">Photo URL is required.</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Update Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;