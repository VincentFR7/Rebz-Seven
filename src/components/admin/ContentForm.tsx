import React, { useState } from 'react';
import Button from '../ui/Button';
import { Movie, Series, Season, Episode } from '../../types';

interface ContentFormProps {
  type: 'movie' | 'series';
  initialData?: Partial<Movie | Series>;
  onSubmit: (data: Partial<Movie | Series>) => void;
  onCancel: () => void;
}

const ContentForm: React.FC<ContentFormProps> = ({
  type,
  initialData = {},
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Movie | Series>>(initialData);
  const [seasons, setSeasons] = useState<Season[]>(
    (initialData as Series)?.seasons || [{ id: '1', seasonNumber: 1, episodes: [] }]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genreArray = e.target.value.split(',').map(g => g.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, genre: genreArray }));
  };

  const addSeason = () => {
    const newSeasonNumber = seasons.length + 1;
    setSeasons([
      ...seasons,
      {
        id: Date.now().toString(),
        seasonNumber: newSeasonNumber,
        episodes: [],
      },
    ]);
  };

  const addEpisode = (seasonId: string) => {
    setSeasons(
      seasons.map(season => {
        if (season.id === seasonId) {
          const newEpisodeNumber = season.episodes.length + 1;
          return {
            ...season,
            episodes: [
              ...season.episodes,
              {
                id: Date.now().toString(),
                title: `Épisode ${newEpisodeNumber}`,
                episodeNumber: newEpisodeNumber,
                duration: 0,
                videoUrl: '',
              },
            ],
          };
        }
        return season;
      })
    );
  };

  const handleEpisodeChange = (
    seasonId: string,
    episodeId: string,
    field: keyof Episode,
    value: string | number
  ) => {
    setSeasons(
      seasons.map(season => {
        if (season.id === seasonId) {
          return {
            ...season,
            episodes: season.episodes.map(episode => {
              if (episode.id === episodeId) {
                return {
                  ...episode,
                  [field]: field === 'duration' || field === 'episodeNumber' ? Number(value) : value,
                };
              }
              return episode;
            }),
          };
        }
        return season;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalData = {
      ...formData,
      releaseYear: Number(formData.releaseYear || 0),
      ...(type === 'movie' && { duration: Number((formData as Movie).duration || 0) }),
      ...(type === 'series' && { seasons }),
    };
    
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Titre
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Année de sortie
          </label>
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {type === 'movie' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Durée (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={(formData as Movie).duration || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Genres (séparés par des virgules)
          </label>
          <input
            type="text"
            name="genre"
            value={formData.genre?.join(', ') || ''}
            onChange={handleGenreChange}
            placeholder="Action, Aventure, Drame"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            URL de l'affiche
          </label>
          <input
            type="url"
            name="posterUrl"
            value={formData.posterUrl || ''}
            onChange={handleChange}
            placeholder="https://example.com/poster.jpg"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {type === 'movie' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              URL de la vidéo
            </label>
            <input
              type="url"
              name="videoUrl"
              value={(formData as Movie).videoUrl || ''}
              onChange={handleChange}
              placeholder="https://example.com/video.mp4"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={!!formData.featured}
          onChange={handleCheckboxChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="featured" className="ml-2 block text-sm text-gray-300">
          Mettre en avant sur la page d'accueil
        </label>
      </div>

      {/* Series-specific fields - Episodes & Seasons */}
      {type === 'series' && (
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Saisons et Épisodes</h3>
            <Button
              type="button"
              onClick={addSeason}
              variant="secondary"
              size="sm"
            >
              Ajouter une saison
            </Button>
          </div>

          {seasons.map((season, index) => (
            <div key={season.id} className="p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">
                  Saison {season.seasonNumber}
                </h4>
                <Button
                  type="button"
                  onClick={() => addEpisode(season.id)}
                  variant="outline"
                  size="sm"
                >
                  Ajouter un épisode
                </Button>
              </div>

              {season.episodes.length === 0 ? (
                <p className="text-gray-400 text-sm">Aucun épisode ajouté</p>
              ) : (
                <div className="space-y-4">
                  {season.episodes.map((episode, epIndex) => (
                    <div key={episode.id} className="p-3 bg-gray-700 rounded grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          N°
                        </label>
                        <input
                          type="number"
                          value={episode.episodeNumber}
                          onChange={(e) =>
                            handleEpisodeChange(
                              season.id,
                              episode.id,
                              'episodeNumber',
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-400 mb-1">
                          Titre
                        </label>
                        <input
                          type="text"
                          value={episode.title}
                          onChange={(e) =>
                            handleEpisodeChange(
                              season.id,
                              episode.id,
                              'title',
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Durée (min)
                        </label>
                        <input
                          type="number"
                          value={episode.duration}
                          onChange={(e) =>
                            handleEpisodeChange(
                              season.id,
                              episode.id,
                              'duration',
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label className="block text-xs text-gray-400 mb-1">
                          URL Vidéo
                        </label>
                        <input
                          type="url"
                          value={episode.videoUrl}
                          onChange={(e) =>
                            handleEpisodeChange(
                              season.id,
                              episode.id,
                              'videoUrl',
                              e.target.value
                            )
                          }
                          placeholder="https://example.com/video.mp4"
                          className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  );
};

export default ContentForm;