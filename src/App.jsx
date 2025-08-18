import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import RecipeDetails from './pages/RecipeDetails';
import Header from './components/Header';

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <ThemeProvider>
            <FavoritesProvider>
                <BrowserRouter>
                    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <Routes>
                        {/* Pass setSearchQuery to the Home component */}
                        <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/recipe/:id" element={<RecipeDetails />} />
                    </Routes>
                </BrowserRouter>
            </FavoritesProvider>
        </ThemeProvider>
    );
}

export default App;