import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Calendar, Tag, Play } from 'lucide-react';
import { useMedia } from '../context/MediaContext';
import MediaGrid from '../components/media/MediaGrid';
import Button from '../components/ui/Button';
import MediaPlayer from '../components/media/MediaPlayer';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMovieById, movies } = useMedia();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const movie = getMovieById(id || '');
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl text-white mb-4">Film non trouvé</h2>
          <p className="text-gray-400 mb-6">Le film que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link to="/movies">
            <Button>Retour aux films</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Find similar movies based on genres
  const similarMovies = movies
    .filter(m => m.id !== movie.id && m.genre.some(g => movie.genre.includes(g)))
    .slice(0, 6);
  
  // Handle play button
  const handlePlay = () => {
    setIsPlaying(true);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      {isPlaying ? (
        <div className="h-screen">
          <MediaPlayer 
            videoUrl={movie.videoUrl} 
            title={movie.title} 
            onBack={() => setIsPlaying(false)}
          />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative pt-16">
            <div className="relative h-[70vh]">
              {/* Background Image */}
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="container mx-auto px-4 py-12">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="hidden md:block w-64 h-96 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1">
                      <h1 className="text-4xl font-bold text-white mb-3">{movie.title}</h1>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>{movie.releaseYear}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          <span>{movie.duration} min</span>
                        </div>
                        <div className="flex items-center">
                          <Tag size={16} className="mr-1" />
                          <span>{movie.genre.join(', ')}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-6">{movie.description}</p>
                      
                      <div className="flex flex-wrap gap-4">
                        <Button className="flex items-center" onClick={handlePlay}>
                          <Play size={18} className="mr-2" />
                          Regarder maintenant
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Similar Movies */}
          <div className="container mx-auto px-4 py-12">
            {similarMovies.length > 0 && (
              <MediaGrid
                title="Films similaires"
                items={similarMovies}
                type="movie"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;