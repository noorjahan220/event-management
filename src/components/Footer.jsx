import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation

// Reusable FooterLink component now uses React Router's Link
const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-gray-600 hover:text-gray-800 hover:underline text-sm transition-colors">
      {children}
    </Link>
  </li>
);

const Footer = () => {
  return (
    // The main footer element takes the full width and background color.
    <footer className="bg-[#f7f5f2] w-full
    text-gray-800 border-t border-gray-200">
      
     
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-12">
        
        {/* Top section with an improved responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8 pb-10">
          
          {/* Column 1: Logo and Description (Spans more columns for a balanced layout) */}
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-4">
              {/* Using a unicode character that resembles interlocking rings */}
              <span className="text-3xl text-red-400 mr-2 font-light">⚭</span>
              {/* Changed to EvenTech to match your Navbar */}
              <span className="text-2xl font-bold">EvenTech</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover and manage events seamlessly. <br />
              Your ultimate event planning partner.
            </p>
          </div>

          {/* Column 2: Home */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-5">Home</h4>
            <ul className="space-y-3">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/events">View all Events</FooterLink>
              <FooterLink to="/reviews">Reviews</FooterLink>
            </ul>
          </div>

          {/* Column 3: Service */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-5">Service</h4>
            <ul className="space-y-3">
              <FooterLink to="/service/wedding">Wedding</FooterLink>
              <FooterLink to="/service/decoration">Decoration</FooterLink>
              <FooterLink to="/service/plan">Plan</FooterLink>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-5">Support</h4>
            <ul className="space-y-3">
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/policy">Policy</FooterLink>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300"></div>

        {/* Bottom section: Copyright */}
        <div className="text-center pt-8">
          <p className="text-sm text-gray-500">
            &copy; Copyright EvenTech 2024. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;