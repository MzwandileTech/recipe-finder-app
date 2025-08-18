// src/pages/Favorites.jsx
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import recipesData from '../data/recipes.json';

function Favorites() {
    const { favorites } = useFavorites();

    const favoritedRecipes = useMemo(() => {
        return recipesData.filter(recipe => favorites.includes(recipe.id));
    }, [favorites]);

    return (
        <div> 
            <main className="container mx-auto p-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Your Favorites</h1>

                {favoritedRecipes.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {favoritedRecipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xl text-gray-500 dark:text-gray-400 mt-16">
                        <p>You haven't favorited any recipes yet!</p>
                        <Link to="/" className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:underline">
                            Find Recipes
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Favorites;