import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import RegistrationForm from "./RegistrationForm";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../Hooks/UseAxiosPublic";

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
    axiosPublic.get(`/event/${id}`).then((res) => {
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
        title: "Not Logged In",
        text: "You need to log in to register for an event.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchEventData();
  };

  if (loading)
    return (
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-[#F56565]"></span>
        <p className="text-lg text-gray-600">Loading event details...</p>
      </div>
    );

  if (!event)
    return (
      <div className="pt-24 text-center min-h-screen bg-base-100 flex items-center justify-center">
        <div className="max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Event Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="btn bg-[#F56565] border-[#F56565] text-white hover:bg-[#E55353] hover:border-[#E55353]"
          >
            Browse All Events
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen  pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl lg:text-5xl font-bold text-white font-serif mb-2 drop-shadow-2xl">
                {event.title}
              </h1>
              <p className="text-white/90 text-lg drop-shadow-lg">
                Organized by {event.organizer.name}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">
                About This Event
              </h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
                <p>{event.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 font-serif">
                Event Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F56565]/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#F56565]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-800">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F56565]/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#F56565]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-semibold text-gray-800">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F56565]/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#F56565]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Registration Deadline
                    </p>
                    <p className="font-semibold text-gray-800">
                      {event.deadline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#F56565] to-[#E53E3E] rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4 font-serif">
                Registration
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Registration Fee</span>
                  <span className="text-2xl font-bold">${event.fee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Available Seats</span>
                  <span
                    className={`text-2xl font-bold ${
                      event.seats < 10 ? "text-red-200" : "text-green-200"
                    }`}
                  >
                    {event.seats}
                  </span>
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleRegisterClick}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      event.seats === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-white text-[#F56565] hover:scale-105 hover:shadow-2xl"
                    }`}
                    disabled={event.seats === 0}
                  >
                    {event.seats > 0 ? "Register Now" : "Sold Out"}
                  </button>
                  {event.seats < 10 && event.seats > 0 && (
                    <p className="text-yellow-200 text-sm text-center mt-2">
                      ⚠️ Only {event.seats} seats left!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <RegistrationForm event={event} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default EventDetailsPage;
