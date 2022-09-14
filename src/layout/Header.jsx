import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Logo from '../assets/images/logo.png';

const Header = () => {

  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);

  const onSubmit = e => {
    e.preventDefault();
    navigate(`/pokemon/${searchText.toLowerCase()}`);
    formRef.current.reset();
  }

  return (
    <div className='w-full bg-primary-yellow flex flex-col justify-center md:flex-row md:justify-between px-8 py-2'>
      <Link to="/" className='flex justify-center mb-4 md:mb-0'>
        <img src={Logo} alt="Logo Pokemon" className='w-32' />
      </Link>

      <form onSubmit={onSubmit} className='flex items-center w-full md:w-auto' ref={formRef}>
        <div className='relative w-full'>
          <input type="text" className='w-full focus:outline-none pl-4 py-2 pr-8' placeholder='Type Pokemon name' required onChange={e => setSearchText(e.target.value)} />
          <button className='absolute top-1/2 transform -translate-y-1/2 right-2'>
            <FontAwesomeIcon className='text-gray-400' icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;