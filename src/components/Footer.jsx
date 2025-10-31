import { Link } from "react-router-dom";

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-gray-600 hover:text-gray-800 hover:underline text-sm transition-colors"
    >
      {children}
    </Link>
  </li>
);

const Footer = () => {
  return (
    <footer
      className="bg-[#f7f5f2] w-full
    text-gray-800 border-t border-gray-200"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8 pb-10">
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-4">
              <span className="text-3xl text-red-400 mr-2 font-light">⚭</span>

              <span className="text-2xl font-bold">EvenTech</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover and manage events seamlessly. <br />
              Your ultimate event planning partner.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-5">Home</h4>
            <ul className="space-y-3">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/events">View all Events</FooterLink>
              <FooterLink to="/reviews">Reviews</FooterLink>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-5">Service</h4>
            <ul className="space-y-3">
              <FooterLink to="/service/wedding">Wedding</FooterLink>
              <FooterLink to="/service/decoration">Decoration</FooterLink>
              <FooterLink to="/service/plan">Plan</FooterLink>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-5">Support</h4>
            <ul className="space-y-3">
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/policy">Policy</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300"></div>

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
