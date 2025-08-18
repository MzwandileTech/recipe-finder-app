import { useEffect, useState, useRef } from 'react';
import RecipeCard from '../components/RecipeCard';
import recipesData from '../data/recipes.json';

function Home({ searchQuery, setSearchQuery }) {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [maxTime, setMaxTime] = useState('');
    const debounceRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            const filteredRecipes = recipesData.filter(recipe => {
                const lowerCaseSearch = searchQuery.toLowerCase();
                const matchesSearch = recipe.title.toLowerCase().includes(lowerCaseSearch) || recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch));
                const matchesTime = maxTime ? recipe.timeMinutes <= Number(maxTime) : true;
                return matchesSearch && matchesTime;
            });

            setRecipes(filteredRecipes);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(debounceRef.current);
    }, [searchQuery, maxTime]);

    const handleResetFilters = () => {
        setSearchQuery('');
        setMaxTime('');
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200">
            <main className="container mx-auto p-4">
                <div className="mb-4 flex gap-4">
                    <input
                        type="number"
                        placeholder="Max time (min)"
                        value={maxTime}
                        onChange={(e) => setMaxTime(e.target.value)}
                        className="p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                </div>

                {isLoading ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-pulse">
                                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mt-2 w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : recipes.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {recipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xl text-gray-500 dark:text-gray-400 mt-16">
                        <p>No recipes match your search.</p>
                        <button
                            onClick={handleResetFilters}  
                            className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;