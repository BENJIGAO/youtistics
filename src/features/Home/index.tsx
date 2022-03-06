import React from 'react';
import { Link } from 'react-router-dom';
import HomeNavbar from 'features/Home/Navbar'


const Home: React.FC = () => {
  return (
    <div>
      <HomeNavbar />
      <h1 className='text-2xl'>Home</h1>
      <nav>
        <Link to='/dashboard'>Dashboard</Link>
      </nav>
      <button
        onClick={() => console.log('Redirect to Google authentication page...')}
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;