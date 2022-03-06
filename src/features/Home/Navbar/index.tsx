import * as React from 'react';

interface IHomeNavbarProps {
}

const HomeNavbar: React.FC<IHomeNavbarProps> = (props) => {
  return (
    <div className='flex justify-center w-full'>
      <div className='flex justify-between w-3/5'>
        <div>
          Youtistics
        </div>
        <div>
          Get Started
        </div>
        <div>
          Developer
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
