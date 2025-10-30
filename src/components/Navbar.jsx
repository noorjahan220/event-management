import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAdmin from '../Pages/Hooks/useAdmin';

const defaultUserImage = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
const [isAdmin] = useAdmin();
    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
    };

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/events">Event</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/my-bookings">My Bookings</NavLink></li>
                    
                </>
            )}
            {user && isAdmin && (
                <li><NavLink to="/add-event">Add Event</NavLink></li>
            )}
        </>
    );

    return (
        <div className="navbar fixed z-10 bg-opacity-30 bg-white text-black max-w-screen-xl">
       
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className='text-3xl font-bold'>EvenTech</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Profile"
                                    src={user.photoURL || defaultUserImage}
                                />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                            <li className="p-2 font-semibold border-b">
                                {user.displayName}
                            </li>
                            {/* --- ADDED PROFILE LINK HERE --- */}
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogOut} className="btn btn-sm btn-ghost text-red-500">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-outline btn-warning">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;