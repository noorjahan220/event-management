import { Link } from "react-router-dom";

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-sm text-gray-600 transition-all duration-300 hover:text-[#F56565] hover:underline hover:font-medium"
    >
      {children}
    </Link>
  </li>
);

const Footer = () => {
  return (
    <footer className="bg-[#f7f5f2] w-full text-gray-800 border-t border-gray-200 font-serif">
      <div className="max-w-screen-xl px-6 py-12 mx-auto lg:px-8">
        <div className="grid grid-cols-1 pb-10 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8">
          {/* Brand Section */}
          <div className="text-center sm:col-span-2 lg:col-span-2 sm:text-left">
            <div className="flex items-center justify-center mb-4 sm:justify-start">
              <span className="mr-2 text-3xl font-light text-[#F56565]">⚭</span>
              <span className="font-serif text-2xl font-bold text-gray-800">EvenTech</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-600">
              Discover and manage events seamlessly. Your ultimate event planning partner for unforgettable experiences.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="text-center sm:text-left">
            <h4 className="mb-5 font-bold text-gray-800">Navigation</h4>
            <ul className="space-y-3">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/events">All Events</FooterLink>
              <FooterLink to="/my-bookings">My Bookings</FooterLink>
              <FooterLink to="/add-event">Add Event</FooterLink>
            </ul>
          </div>

          {/* Account Section */}
          <div className="text-center sm:text-left">
            <h4 className="mb-5 font-bold text-gray-800">Account</h4>
            <ul className="space-y-3">
              <FooterLink to="/login">Login</FooterLink>
              <FooterLink to="/register">Register</FooterLink>
              <FooterLink to="/companyProfile">Profile</FooterLink>
              <FooterLink to="/events">Browse Events</FooterLink>
            </ul>
          </div>

          {/* Support Section */}
          <div className="text-center sm:text-left">
            <h4 className="mb-5 font-bold text-gray-800">Support</h4>
            <ul className="space-y-3">
              <FooterLink to="/aboutUs">About Us</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/policy">Privacy Policy</FooterLink>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300"></div>

        {/* Copyright */}
        <div className="pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EvenTech. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;