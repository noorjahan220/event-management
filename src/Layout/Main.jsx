
import { Outlet, useLocation } from 'react-router-dom';

import Footer from '../components/Footer';
import Navbar from './../components/Navbar';

const Main = () => {
     const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div className='bg-[#f7f5f2] '>
             {noHeaderFooter || <Navbar/>}
            <div className='max-w-6xl mx-auto'>
                <Outlet/>
            </div>
            {noHeaderFooter || <Footer/>}
        </div>
    );
};

export default Main;