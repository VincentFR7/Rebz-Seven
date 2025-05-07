import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMedia } from '../context/MediaContext';
import MediaGrid from '../components/media/MediaGrid';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const { movies, series, featuredContent } = useMedia();
  
  // Get a random featured item for the hero section
  const featuredItem = featuredContent.length > 0
    ? featuredContent[Math.floor(Math.random() * featuredContent.length)]
    : null;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Featured Content */}
      {featuredItem && (
        <div className="relative h-[70vh] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={featuredItem.posterUrl}
              alt={featuredItem.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="relative h-full flex items-end">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {featuredItem.title}
                </h1>
                <div className="flex items-center text-sm text-gray-300 mb-4">
                  <span>{featuredItem.releaseYear}</span>
                  <span className="mx-2">•</span>
                  <span>{featuredItem.genre.join(', ')}</span>
                  <span className="mx-2">•</span>
                  <span className="text-blue-400">
                    {featuredItem.type === 'movie' ? 'Film' : 'Série'}
                  </span>
                </div>
                <p className="text-gray-300 mb-6 line-clamp-3">
                  {featuredItem.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to={`/${featuredItem.type}/${featuredItem.id}`}>
                    <Button className="flex items-center">
                      <Play size={18} className="mr-2" />
                      Regarder maintenant
                    </Button>
                  </Link>
                  <Link to={`/${featuredItem.type}/${featuredItem.id}`}>
                    <Button variant="outline">Plus d'infos</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8">
        {/* Featured Content */}
        {featuredContent.length > 0 && (
          <MediaGrid
            title="Contenus à la une"
            items={featuredContent}
          />
        )}
        
        {/* Recent Movies */}
        <MediaGrid
          title="Films populaires"
          items={movies.slice(0, 6)}
          type="movie"
        />
        
        {/* Recent Series */}
        <MediaGrid
          title="Séries populaires"
          items={series.slice(0, 6)}
          type="series"
        />
      </div>
    </div>
  );
};

export default Home;