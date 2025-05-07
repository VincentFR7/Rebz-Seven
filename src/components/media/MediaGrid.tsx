import React from 'react';
import MediaCard from './MediaCard';
import { MediaContent, Movie, Series } from '../../types';

interface MediaGridProps {
  items: (MediaContent | Movie | Series)[];
  title?: string;
  type?: 'movie' | 'series'; // Optional if items are MediaContent with type property
}

const MediaGrid: React.FC<MediaGridProps> = ({ items, title, type }) => {
  if (items.length === 0) {
    return (
      <div className="py-4">
        <h2 className="text-xl font-semibold text-white mb-4">{title || 'Contenu'}</h2>
        <p className="text-gray-400">Aucun contenu disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      {title && <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <MediaCard 
            key={item.id} 
            media={item}
            type={type || ('type' in item ? item.type : undefined)}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;