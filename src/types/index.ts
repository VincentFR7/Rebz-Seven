export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  duration: number; // in minutes
  posterUrl: string;
  videoUrl: string;
  genre: string[];
  featured?: boolean;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  posterUrl: string;
  genre: string[];
  seasons: Season[];
  featured?: boolean;
}

export interface Season {
  id: string;
  seasonNumber: number;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  episodeNumber: number;
  duration: number; // in minutes
  videoUrl: string;
  thumbnail?: string;
}

export type MediaType = 'movie' | 'series';

export interface MediaContent {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  posterUrl: string;
  genre: string[];
  type: MediaType;
  featured?: boolean;
}