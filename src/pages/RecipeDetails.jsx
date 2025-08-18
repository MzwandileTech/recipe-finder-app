// src/pages/RecipeDetails.jsx
import { useParams, Link } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';
import recipesData from '../data/recipes.json';

function RecipeDetails() {
    const { id } = useParams();
    const { toggleFavorite, isFavorite } = useFavorites();

    const recipe = useMemo(() => {
        return recipesData.find(r => r.id === id);
    }, [id]);

    useEffect(() => {
        document.title = recipe ? `${recipe.title} | Recipe Finder` : 'Recipe Finder';
        return () => { document.title = 'Recipe Finder'; };
    }, [recipe]);

    if (!recipe) {
        return (
            <div className="container mx-auto p-4 text-center mt-16 text-xl text-gray-500 dark:text-gray-400">
                Recipe not found.
            </div>
        );
    }

    const favorited = isFavorite(recipe.id);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
            <main className="container mx-auto px-4 max-w-5xl space-y-8">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition"
                >
                    <FaArrowLeft className="mr-2" /> Back to Home
                </Link>

                {/* Top Section: Image + Title + Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-80 object-cover"
                    />
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                {recipe.title}
                            </h1>
                            <button
                                onClick={() => toggleFavorite(recipe.id)}
                                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                aria-label={`Favorite ${recipe.title}`}
                            >
                                <FaHeart
                                    size={28}
                                    className={favorited ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}
                                />
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>⭐ {recipe.rating}</span>
                            <span>🕒 {recipe.timeMinutes} min</span>
                            <span>👥 {recipe.servings} servings</span>
                            <span>💪 {recipe.difficulty}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {recipe.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-100 rounded-full px-3 py-1 text-xs font-semibold"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Section: Ingredients + Steps */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ingredients</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            {recipe.ingredients.map((ing, index) => (
                                <li key={index}>{ing.quantity} {ing.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Steps</h2>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            {recipe.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default RecipeDetails;
