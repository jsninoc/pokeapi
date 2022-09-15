import { createContext, useState } from 'react';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {

  const [favorites, setFavorites] = useState([]);

  const updateFavorites = pokemon => {
    const updatedFavorites = [...favorites];
    const favoriteIndex = favorites.findIndex(favorite => favorite.id === pokemon.id);
    
    if(favoriteIndex === -1) {
      updatedFavorites.push(pokemon);
    } else {
      updatedFavorites.splice(favoriteIndex, 1);
    }
    window.localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        updateFavorites
      }}
    >
      { children }
    </FavoritesContext.Provider>
  )
}

export {
  FavoritesProvider
}

export default FavoritesContext;