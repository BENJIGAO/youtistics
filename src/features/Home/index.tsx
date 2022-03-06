import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1 className='text-2xl'>Home</h1>
      <nav>
        <Link to='/dashboard'>Dashboard</Link>
      </nav>
    </div>
  );
}

export default Home;