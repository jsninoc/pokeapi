import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;