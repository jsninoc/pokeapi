import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className='bg-primary-blue rounded-md flex flex-col items-center p-4' key={pokemon.id}>
      <img src={pokemon.img} alt={pokemon.name} />
      <p className='text-white text-center capitalize mb-2'>{ pokemon.name }</p>
      <Link to={`/pokemon/${pokemon.id}`}>
        <div className='bg-secondary-yellow p-2 rounded-full'>
          <p className='text-primary-blue text-center'>See details</p>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;