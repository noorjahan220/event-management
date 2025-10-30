import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/HomePage/HomePage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import UserProfile from "../Pages/UserProfile/UserProfile";
import EventsPage from "../Pages/Events/EventsPage";
import EventDetailsPage from "../Pages/EventDetails/EventDetailsPage";
import MyBookingsPage from "../Pages/MyBookings/MyBookingsPage";
import AdminRoute from "./AdminRoute";
import AddEventPage from "../Pages/AddEvent/AddEventPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
       {
        path: "/events",
        element: <EventsPage />
      },
      {
        path: "/event/:id",
        element: <EventDetailsPage />
      },
       {
            path: 'my-bookings',
            element: <MyBookingsPage />
        },
        {
            path: 'add-event',
            element: <AdminRoute><AddEventPage /></AdminRoute>
        }
    ],
  },
]);
