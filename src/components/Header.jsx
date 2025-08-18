// src/components/Header.jsx
import { useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";

export default function Header({ searchQuery, setSearchQuery }) {
    const { theme, toggleTheme } = useTheme();
    const searchRef = useRef(null);

    // Autofocus search on mount
    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    }, []);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between space-x-4">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img src="/images/thembi-kitchen.png" alt="Recipe Finder Logo" className="h-20 rounded-full" />
                </Link>

                {/* Search Bar */}
                <div className="relative flex-grow max-w-lg">
                    <input
                        ref={searchRef} // NEW
                        type="text"
                        placeholder="Search recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 pl-10 rounded-full border border-gray-300 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                    />
                    <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
                </div>

                <nav className="flex items-center space-x-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md p-2 transition-colors duration-200 ${
                                isActive ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            `text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md p-2 transition-colors duration-200 ${
                                isActive ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''
                            }`
                        }
                    >
                        Favorites
                    </NavLink>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                    </button>
                </nav>
            </div>
        </header>
    );
}
