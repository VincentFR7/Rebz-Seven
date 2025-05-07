import React, { useState } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { Movie, Series } from '../../types';

interface ContentListProps {
  type: 'movie' | 'series';
  items: Movie[] | Series[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ContentList: React.FC<ContentListProps> = ({ type, items, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter items based on search term
  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-medium text-gray-900">
            {type === 'movie' ? 'Films' : 'Séries'} ({items.length})
          </h3>
          <div className="flex-1 md:max-w-xs">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {filteredItems.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Aucun contenu trouvé
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Année
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genres
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {type === 'movie' ? 'Durée' : 'Saisons'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mis en avant
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded object-cover" src={item.posterUrl} alt={item.title} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.releaseYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {item.genre.map((g, index) => (
                        <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100">
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {type === 'movie' 
                      ? `${(item as Movie).duration} min` 
                      : `${(item as Series).seasons.length} saison(s)`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.featured ? (
                      <span className="px-2 py-1 text-xs rounded-full text-green-800 bg-green-100">Oui</span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full text-gray-800 bg-gray-100">Non</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        to={`/${type === 'movie' ? 'movie' : 'series'}/${item.id}`}
                        className="text-gray-400 hover:text-gray-600"
                        title="Voir"
                      >
                        <Eye size={18} />
                      </Link>
                      <button 
                        onClick={() => onEdit(item.id)} 
                        className="text-blue-400 hover:text-blue-600"
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => onDelete(item.id)} 
                        className="text-red-400 hover:text-red-600"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContentList;