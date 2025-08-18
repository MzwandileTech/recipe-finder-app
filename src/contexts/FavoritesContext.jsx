// src/contexts/FavoritesContext.jsx
import { createContext, useState, useEffect, useCallback, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const localFavorites = localStorage.getItem('favorites');
        return localFavorites ? JSON.parse(localFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = useCallback((id) => {
        setFavorites(prevFavorites => {
            if (prevFavorites.includes(id)) {
                return prevFavorites.filter(favId => favId !== id);
            } else {
                return [...prevFavorites, id];
            }
        });
    }, []);

    const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);