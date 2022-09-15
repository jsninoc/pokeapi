import React from 'react';
import PokemonCard from '../components/PokemonCard';
import useFavorites from '../hooks/useFavorites';

const FavoritesPokemon = () => {

  const { favorites } = useFavorites();

  return (
    <div className='flex flex-col items-center py-6 w-11/12 relative'>
      <h1 className='text-2xl mb-4 text-primary-blue'>Favorites Pokemon</h1>
        <div className='grid grid-cols-2 gap-4 w-full md:grid-cols-4'>
          {favorites.map(pokemon => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))}
        </div>
    </div>
  );
};

export default FavoritesPokemon;