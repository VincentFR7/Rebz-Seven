import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MediaContent, Movie, Series } from '../../types';

interface MediaCardProps {
  media: MediaContent | Movie | Series;
  type?: 'movie' | 'series'; // Optional if media is MediaContent
}

const MediaCard: React.FC<MediaCardProps> = ({ media, type }) => {
  // Determine if it's a movie or series based on props or media type
  const mediaType = type || ('type' in media ? media.type : undefined);

  return (
    <Link 
      to={`/${mediaType || 'movie'}/${media.id}`}
      className="block group transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg aspect-[2/3]">
        {/* Poster Image */}
        <img 
          src={media.posterUrl} 
          alt={media.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
        
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-blue-600 rounded-full p-3 transform transition-transform group-hover:scale-110">
            <Play className="text-white" size={24} />
          </div>
        </div>
        
        {/* Media info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h3 className="font-semibold text-sm md:text-base line-clamp-1">{media.title}</h3>
          <div className="flex items-center text-xs text-gray-300 mt-1">
            <span>{media.releaseYear}</span>
            <span className="mx-1">•</span>
            <span>{media.genre[0]}</span>
            {mediaType && <span className="ml-1 text-blue-400">{mediaType === 'movie' ? 'Film' : 'Série'}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;