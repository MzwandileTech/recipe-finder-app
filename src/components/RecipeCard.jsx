// src/components/RecipeCard.jsx
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { FaHeart } from 'react-icons/fa';

function RecipeCard({ recipe }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorited = isFavorite(recipe.id);

    return (
       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.02]">
     <Link to={`/recipe/${recipe.id}`} className="block">
                <div className="relative group">
  <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-t-lg" />
  
  
  
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>


                    <div className="absolute top-2 right-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(recipe.id);
                            }}
                            className="p-2 rounded-full bg-white dark:bg-gray-700 text-red-500 shadow-md"
                            aria-label="Toggle favorite"
                        >
                            <FaHeart size={20} className={favorited ? 'text-red-500' : 'text-gray-300 dark:text-gray-500'} />
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 truncate dark:text-white">{recipe.title}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                        <span>{recipe.timeMinutes} min</span>
                        <span>{recipe.difficulty}</span>
                    <span>⭐ {recipe.rating}</span> 
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default RecipeCard;