import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie, Series, MediaContent } from '../types';
import { movies as initialMovies, series as initialSeries } from '../data/mockData';

interface MediaContextType {
  movies: Movie[];
  series: Series[];
  featuredContent: MediaContent[];
  addMovie: (movie: Omit<Movie, 'id'>) => void;
  addSeries: (series: Omit<Series, 'id'>) => void;
  updateMovie: (id: string, movie: Partial<Movie>) => void;
  updateSeries: (id: string, series: Partial<Series>) => void;
  deleteMovie: (id: string) => void;
  deleteSeries: (id: string) => void;
  getMovieById: (id: string) => Movie | undefined;
  getSeriesById: (id: string) => Series | undefined;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [series, setSeries] = useState<Series[]>(initialSeries);
  const [featuredContent, setFeaturedContent] = useState<MediaContent[]>([]);

  // Update featured content when movies or series change
  useEffect(() => {
    const featuredMovies = movies
      .filter(movie => movie.featured)
      .map(movie => ({
        ...movie,
        type: 'movie' as const,
      }));

    const featuredSeries = series
      .filter(series => series.featured)
      .map(series => ({
        ...series,
        type: 'series' as const,
      }));

    setFeaturedContent([...featuredMovies, ...featuredSeries]);
  }, [movies, series]);

  const addMovie = (movie: Omit<Movie, 'id'>) => {
    const newMovie = {
      ...movie,
      id: Date.now().toString(),
    };
    setMovies(prevMovies => [...prevMovies, newMovie]);
  };

  const addSeries = (series: Omit<Series, 'id'>) => {
    const newSeries = {
      ...series,
      id: Date.now().toString(),
    };
    setSeries(prevSeries => [...prevSeries, newSeries]);
  };

  const updateMovie = (id: string, movieUpdate: Partial<Movie>) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === id ? { ...movie, ...movieUpdate } : movie
      )
    );
  };

  const updateSeries = (id: string, seriesUpdate: Partial<Series>) => {
    setSeries(prevSeries =>
      prevSeries.map(series =>
        series.id === id ? { ...series, ...seriesUpdate } : series
      )
    );
  };

  const deleteMovie = (id: string) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
  };

  const deleteSeries = (id: string) => {
    setSeries(prevSeries => prevSeries.filter(series => series.id !== id));
  };

  const getMovieById = (id: string) => {
    return movies.find(movie => movie.id === id);
  };

  const getSeriesById = (id: string) => {
    return series.find(series => series.id === id);
  };

  const value = {
    movies,
    series,
    featuredContent,
    addMovie,
    addSeries,
    updateMovie,
    updateSeries,
    deleteMovie,
    deleteSeries,
    getMovieById,
    getSeriesById,
  };

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
};

export const useMedia = (): MediaContextType => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};