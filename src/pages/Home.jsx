import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import Loader from '../components/Loader';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPokemons = useCallback(async () => {
    let newArray = [];
    try {
      const pokemonsData = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=10");
      for (let index = 0; index < pokemonsData.data.results.length; index++) {
        const pokemon = pokemonsData.data.results[index];
        const pokemonApi = await axios.get(pokemon.url);
        newArray.push({
          id: pokemonApi.data.id,
          name: pokemonApi.data.name,
          img: pokemonApi.data.sprites.front_default
        })
      }
      setPokemons(newArray);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    getPokemons();

    return () => {
      setPokemons([]);
    };
  }, [getPokemons]);


  return (
    <div className='flex flex-col items-center py-6 w-11/12 relative'>
      <h1 className='text-2xl mb-4'>First 10 Pokemon</h1>
        {isLoading ? (
          <Loader />
        )
        : (
          <div className='grid grid-cols-2 gap-4 w-full md:grid-cols-4'>
            {pokemons.map(pokemon => (
              <PokemonCard pokemon={pokemon} key={pokemon.id} />
            ))}
          </div>
        )}
    </div>
  );
};

export default Home;