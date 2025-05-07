import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Film, Tv, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { isAuthenticated, currentUser, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Handle scroll events to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 shadow-md' : 'bg-gradient-to-b from-gray-900/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-blue-500 font-bold text-xl md:text-2xl">Rebz Seven</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-blue-400 transition-colors">
              Accueil
            </Link>
            <Link to="/movies" className="text-white hover:text-blue-400 transition-colors">
              Films
            </Link>
            <Link to="/series" className="text-white hover:text-blue-400 transition-colors">
              Séries
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-white hover:text-blue-400 transition-colors">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white rounded-full py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-56"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </form>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-white hover:text-blue-400">
                  <span className="mr-2">{currentUser?.name}</span>
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="p-3 border-b border-gray-700">
                    <p className="text-sm text-gray-400">Connecté en tant que</p>
                    <p className="font-semibold">{currentUser?.email}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => logout()}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 rounded"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Inscription</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white rounded-full py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </form>

            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="flex items-center text-white p-2 rounded hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Accueil</span>
              </Link>
              <Link
                to="/movies"
                className="flex items-center text-white p-2 rounded hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <Film size={18} className="mr-2" />
                <span>Films</span>
              </Link>
              <Link
                to="/series"
                className="flex items-center text-white p-2 rounded hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <Tv size={18} className="mr-2" />
                <span>Séries</span>
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center text-white p-2 rounded hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Admin</span>
                </Link>
              )}
            </nav>

            {isAuthenticated ? (
              <div className="pt-2 border-t border-gray-700">
                <div className="p-2">
                  <p className="text-sm text-gray-400">Connecté en tant que</p>
                  <p className="font-semibold text-white">{currentUser?.name}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full mt-2 text-left px-4 py-2 text-white bg-gray-800 rounded"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-700">
                <Link
                  to="/login"
                  className="block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" fullWidth>
                    Connexion
                  </Button>
                </Link>
                <Link
                  to="/register"
                  className="block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button fullWidth>Inscription</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;