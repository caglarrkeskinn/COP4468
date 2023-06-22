import React, {useState} from 'react';
import FavoritesContext from './FavoritesContext';
import Product from './Interfaces';

const FavoritesProvider = ({children}: any) => {
  const [favorites, setFavorites] = useState<any>([]);

  const addToFavorites = (item: Product) => {
    setFavorites([...favorites, item]);
  };

  const checkIsFavorite = (itemId: number) => {
    return favorites.some((item: Product) => item.id === itemId);
  };

  const removeFromFavorites = (item: Product) => {
    const updatedFavorites = favorites.filter(
      (favorite: Product) => favorite.id !== item.id,
    );
    setFavorites(updatedFavorites);
  };

  const contextValue = {
    favorites,
    checkIsFavorite,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
