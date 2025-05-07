import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Tag, Play, ChevronUp, ChevronDown } from 'lucide-react';
import { useMedia } from '../context/MediaContext';
import MediaGrid from '../components/media/MediaGrid';
import Button from '../components/ui/Button';
import MediaPlayer from '../components/media/MediaPlayer';
import { Episode } from '../types';

const SeriesDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSeriesById, series } = useMedia();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [expandedSeasons, setExpandedSeasons] = useState<Record<string, boolean>>({});
  
  const seriesData = getSeriesById(id || '');
  
  if (!seriesData) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl text-white mb-4">Série non trouvée</h2>
          <p className="text-gray-400 mb-6">La série que vous recherchez n'existe pas ou a été supprimée.</p>
          <Link to="/series">
            <Button>Retour aux séries</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Initialize first season as expanded
  React.useEffect(() => {
    if (seriesData.seasons.length > 0 && Object.keys(expandedSeasons).length === 0) {
      setExpandedSeasons({ [seriesData.seasons[0].id]: true });
    }
  }, [seriesData.seasons, expandedSeasons]);
  
  // Find similar series based on genres
  const similarSeries = series
    .filter(s => s.id !== seriesData.id && s.genre.some(g => seriesData.genre.includes(g)))
    .slice(0, 6);
  
  // Handle play button
  const handlePlay = (episode: Episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
    window.scrollTo(0, 0);
  };
  
  // Toggle season expansion
  const toggleSeason = (seasonId: string) => {
    setExpandedSeasons(prev => ({
      ...prev,
      [seasonId]: !prev[seasonId]
    }));
  };
  
  // Get first episode if there is one
  const firstEpisode = seriesData.seasons[0]?.episodes[0] || null;
  
  return (
    <div className="min-h-screen bg-gray-900">
      {isPlaying && currentEpisode ? (
        <div className="h-screen">
          <MediaPlayer 
            videoUrl={currentEpisode.videoUrl} 
            title={`${seriesData.title} - ${currentEpisode.title}`} 
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
                src={seriesData.posterUrl}
                alt={seriesData.title}
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
                        src={seriesData.posterUrl}
                        alt={seriesData.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1">
                      <h1 className="text-4xl font-bold text-white mb-3">{seriesData.title}</h1>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>{seriesData.releaseYear}</span>
                        </div>
                        <div className="flex items-center">
                          <span>{seriesData.seasons.length} saison{seriesData.seasons.length > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center">
                          <Tag size={16} className="mr-1" />
                          <span>{seriesData.genre.join(', ')}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-6">{seriesData.description}</p>
                      
                      {firstEpisode && (
                        <div className="flex flex-wrap gap-4">
                          <Button className="flex items-center" onClick={() => handlePlay(firstEpisode)}>
                            <Play size={18} className="mr-2" />
                            Regarder S1:E1
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Episodes */}
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-white mb-6">Épisodes</h2>
            
            <div className="space-y-4">
              {seriesData.seasons.map(season => (
                <div key={season.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSeason(season.id)}
                    className="w-full flex items-center justify-between p-4 text-white hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-lg font-medium">Saison {season.seasonNumber}</span>
                    {expandedSeasons[season.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  {expandedSeasons[season.id] && (
                    <div className="p-4 pt-0 divide-y divide-gray-700">
                      {season.episodes.map(episode => (
                        <div key={episode.id} className="py-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center">
                                <span className="text-gray-400 w-10">E{episode.episodeNumber}</span>
                                <h3 className="text-white font-medium">{episode.title}</h3>
                              </div>
                              <div className="ml-10 text-sm text-gray-400 mt-1">
                                {episode.duration} min
                              </div>
                            </div>
                            <button
                              onClick={() => handlePlay(episode)}
                              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                              <Play size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Similar Series */}
          <div className="container mx-auto px-4 py-12">
            {similarSeries.length > 0 && (
              <MediaGrid
                title="Séries similaires"
                items={similarSeries}
                type="series"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SeriesDetails;