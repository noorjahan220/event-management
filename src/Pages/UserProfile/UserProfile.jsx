import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const UserProfile = () => {
  const { user, updateUserProfile, loading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    setIsUpdating(true);
    const name = data.name;
    const photoURL = data.photoURL;

    updateUserProfile(name, photoURL)
      .then(() => {
        Swal.fire({
          title: "Profile Updated! 🎉",
          text: "Your profile has been updated successfully.",
          icon: "success",
          confirmButtonColor: "#F56565",
          background: "#f7f5f2",
          color: "#1f2937",
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });
      })
      .catch((error) => {
        console.error("Profile update error:", error);
        Swal.fire({
          title: "Update Failed",
          text: "Could not update profile. Please try again.",
          icon: "error",
          confirmButtonColor: "#F56565",
          background: "#f7f5f2",
          color: "#1f2937",
        });
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-[#F56565]"></span>
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            My Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your account information and preferences
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="bg-gradient-to-b from-[#F56565] to-[#E53E3E] p-8 text-white lg:col-span-1">
                <div className="flex flex-col items-center text-center">
                  <div className="avatar mb-6">
                    <div className="w-32 h-32 rounded-full ring-4 ring-white/20 ring-offset-2 ring-offset-[#F56565] bg-white/10 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-white/80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold font-serif mb-2">
                    {user?.displayName || "User"}
                  </h2>
                  <p className="text-white/90 mb-1">{user?.email}</p>
                  <div className="badge badge-outline badge-sm mt-2 text-white/80 border-white/50">
                    Member since{" "}
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).getFullYear()
                      : "2024"}
                  </div>

                  <div className="mt-8 w-full space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/80">Account Status</span>
                      <span className="badge badge-success">Active</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/80">Email Verified</span>
                      <span
                        className={`badge ${
                          user?.emailVerified
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {user?.emailVerified ? "Verified" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:col-span-2">
                <div className="mb-8">
                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">
                    Profile Information
                  </h3>
                  <p className="text-gray-600">
                    Update your personal information and profile picture
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-800 text-lg">
                        Full Name
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                        className="input input-bordered w-full focus:border-[#F56565] focus:ring-2 focus:ring-[#F56565]/20 transition-all duration-300 h-12 text-base pl-12"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.name && (
                      <span className="text-[#F56565] text-sm mt-2 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-800 text-lg">
                        Email Address
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="input input-bordered w-full bg-gray-50 text-gray-600 h-12 text-base pl-12 cursor-not-allowed"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      Email address cannot be changed
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={!isDirty || isUpdating}
                      className={`btn w-full py-4 text-lg font-semibold transition-all duration-300 ${
                        !isDirty || isUpdating
                          ? "bg-gray-400 border-gray-400 cursor-not-allowed"
                          : "bg-[#F56565] border-[#F56565] text-white hover:bg-[#E53E3E] hover:border-[#E53E3E] hover:scale-105"
                      }`}
                    >
                      {isUpdating ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Updating Profile...
                        </>
                      ) : (
                        "Update Profile"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
