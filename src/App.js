import { useEffect } from "react";
import useFavorites from "./hooks/useFavorites";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import FavoritesPokemon from "./pages/FavoritesPokemon";

function App() {

  const { setFavorites } = useFavorites();

  useEffect(() => {
    const favorites = JSON.parse(window.localStorage.getItem('favorites'));
    if(favorites) {
      setFavorites(favorites);
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/favorites" element={<FavoritesPokemon />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
