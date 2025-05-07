import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useMedia } from '../context/MediaContext';
import MediaGrid from '../components/media/MediaGrid';
import { Movie, Series } from '../types';

const Browse: React.FC = () => {
  const location = useLocation();
  const { movies, series } = useMedia();
  const [activeTab, setActiveTab] = useState<'all' | 'movie' | 'series'>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [sortBy, setSortBy] = useState<'year' | 'title'>('year');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Extract query from URL if it exists
  React.useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, [location.search]);

  // Get all unique genres
  const allGenres = useMemo(() => {
    const genresSet = new Set<string>();
    
    [...movies, ...series].forEach(item => {
      item.genre.forEach(g => genresSet.add(g));
    });
    
    return ['', ...Array.from(genresSet)].sort();
  }, [movies, series]);

  // Filter and sort content
  const filteredContent = useMemo(() => {
    let content: (Movie | Series)[] = [];
    
    // Filter by content type
    if (activeTab === 'all') content = [...movies, ...series];
    else if (activeTab === 'movie') content = [...movies];
    else content = [...series];
    
    // Filter by genre if selected
    if (selectedGenre) {
      content = content.filter(item => 
        item.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      content = content.filter(item => 
        item.title.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term) ||
        item.genre.some(g => g.toLowerCase().includes(term))
      );
    }
    
    // Sort content
    if (sortBy === 'year') {
      content.sort((a, b) => b.releaseYear - a.releaseYear);
    } else {
      content.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    return content;
  }, [activeTab, movies, series, selectedGenre, searchTerm, sortBy]);

  // Map items to include type
  const mappedContent = useMemo(() => {
    return filteredContent.map(item => {
      if ('duration' in item) {
        return { ...item, type: 'movie' as const };
      } else {
        return { ...item, type: 'series' as const };
      }
    });
  }, [filteredContent]);

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            {searchTerm ? `Résultats pour "${searchTerm}"` : 'Parcourir'}
          </h1>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between gap-4 bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="space-x-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                    activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Tout
                </button>
                <button
                  onClick={() => setActiveTab('movie')}
                  className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                    activeTab === 'movie' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Films
                </button>
                <button
                  onClick={() => setActiveTab('series')}
                  className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                    activeTab === 'series' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Séries
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="bg-gray-700 text-white rounded px-3 py-1.5 text-sm border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Tous les genres</option>
                  {allGenres.slice(1).map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'year' | 'title')}
                  className="bg-gray-700 text-white rounded px-3 py-1.5 text-sm border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="year">Tri par année</option>
                  <option value="title">Tri par titre</option>
                </select>
              </div>
              
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-3 py-1.5 bg-red-600 text-white rounded text-sm"
                >
                  Effacer la recherche
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Results */}
        {mappedContent.length > 0 ? (
          <MediaGrid items={mappedContent} />
        ) : (
          <div className="py-12 text-center">
            <p className="text-xl text-gray-400">Aucun contenu ne correspond à vos critères de recherche.</p>
            <p className="mt-2 text-gray-500">Essayez d'ajuster vos filtres ou d'effectuer une nouvelle recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;