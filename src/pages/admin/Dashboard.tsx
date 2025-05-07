import React from 'react';
import { useMedia } from '../../context/MediaContext';
import { Film, Tv, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { movies, series } = useMedia();
  
  // Mock stats for demonstration
  const stats = {
    users: 128,
    views: 3452,
    totalContent: movies.length + series.length,
    featuredContent: [...movies, ...series].filter(item => item.featured).length,
  };
  
  // Group content by genre
  const genreCounts: Record<string, number> = {};
  [...movies, ...series].forEach(item => {
    item.genre.forEach(genre => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });
  
  // Sort genres by count
  const sortedGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue dans votre panneau d'administration</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
              <Film size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Films</h3>
              <p className="text-2xl font-semibold text-gray-800">{movies.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-500/10 text-purple-500">
              <Tv size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Séries</h3>
              <p className="text-2xl font-semibold text-gray-800">{series.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500/10 text-green-500">
              <Users size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Utilisateurs</h3>
              <p className="text-2xl font-semibold text-gray-800">{stats.users}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-500/10 text-orange-500">
              <TrendingUp size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Vues</h3>
              <p className="text-2xl font-semibold text-gray-800">{stats.views}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Content */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Contenu récent</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[...movies, ...series]
                .sort((a, b) => b.releaseYear - a.releaseYear)
                .slice(0, 5)
                .map(item => (
                  <div key={item.id} className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        src={item.posterUrl}
                        alt={item.title}
                        className="h-12 w-12 rounded object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        {item.releaseYear} • {'duration' in item ? 'Film' : 'Série'}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        {/* Content by Genre */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Contenu par genre</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {sortedGenres.map(([genre, count]) => (
                <div key={genre} className="relative pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium text-gray-900">{genre}</div>
                    <div className="text-xs font-semibold text-gray-700">{count}</div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${(count / stats.totalContent) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Accès rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/movies"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <Film className="text-blue-500" size={20} />
              <span className="ml-2 text-gray-700">Gérer les films</span>
            </div>
          </Link>
          <Link
            to="/admin/series"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <Tv className="text-purple-500" size={20} />
              <span className="ml-2 text-gray-700">Gérer les séries</span>
            </div>
          </Link>
          <Link
            to="/"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="text-green-500">🏠</div>
              <span className="ml-2 text-gray-700">Voir le site</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;