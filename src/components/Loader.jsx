import React from 'react';
import styles from '../styles/modules/Loader.module.css'

const Loader = () => {
  return (
    <div className='flex flex-col items-center justify-center fixed top-0 left-0 w-full min-h-screen z-10 bg-black bg-opacity-60'>
      <div className={styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default Loader;