import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAdmin from '../Pages/Hooks/useAdmin';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isScrolled, setIsScrolled] = useState(false);

    // Effect to detect scroll and add a subtle background change
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
    };

    // NavLink class for active state styling
    const navLinkClass = ({ isActive }) =>
        isActive ? 'font-bold black' : 'font-normal text-black hover:font-bold black transition-colors';

    const navLinks = (
        <>
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/events" className={navLinkClass}>Events</NavLink></li>
            {user && (
                <li><NavLink to="/my-bookings" className={navLinkClass}>My Bookings</NavLink></li>
            )}
            {user && isAdmin && (
                <li><NavLink to="/add-event" className={navLinkClass}>Add Event</NavLink></li>
            )}
        </>
    );

    return (
        // The outer header provides the full-width glassy background
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
                        ${isScrolled ? 'bg-black/20 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}
        >
            <div className="navbar font-serif max-w-screen-xl mx-auto text-black">
                <div className="navbar-start">
                    {/* Mobile Dropdown */}
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52
                                                    bg-black/60 backdrop-blur-xl border border-gray-700">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className=' font-serif text-3xl font-bold drop-shadow-md'>EvenTech</Link>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center font-serif hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        {navLinks}
                    </ul>
                </div>

                <div className="navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-white/50 hover:ring-white">
                                <div className="w-10 rounded-full bg-error flex items-center justify-center text-white font-bold">
                                    <span>{user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}</span>
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52
                                                        bg-black/60 backdrop-blur-xl text-white border border-gray-700">
                                <li className="p-2 font-semibold border-b border-gray-600">
                                    {user.displayName || 'User'}
                                </li>
                                <li>
                                    <Link to="/profile" className="justify-between hover:bg-white/10">Profile</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogOut} className="w-full text-left text-red-400 hover:bg-red-500/30">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-outline border-white text-white hover:bg-white hover:text-black">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;