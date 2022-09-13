import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <div className='w-full bg-primary-yellow flex justify-center md:justify-between px-8 py-2'>
      <Link to="/">
        <img src={Logo} alt="Logo Pokemon" className='w-32' />
      </Link>
    </div>
  );
};

export default Header;