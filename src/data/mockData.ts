import { Movie, Series, User } from '../types';

export const users: User[] = [
  {
    id: '1',
    email: 'admin@rebzseven.com',
    name: 'Admin',
    isAdmin: true,
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Utilisateur Test',
    isAdmin: false,
  },
];

export const movies: Movie[] = [
  {
    id: '1',
    title: 'La Voie de l\'Aventure',
    description: 'Un jeune aventurier part à la découverte d\'un monde fantastique plein de mystères.',
    releaseYear: 2023,
    duration: 125,
    posterUrl: 'https://images.pexels.com/photos/1716158/pexels-photo-1716158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://example.com/video1.mp4',
    genre: ['Aventure', 'Fantastique'],
    featured: true,
  },
  {
    id: '2',
    title: 'Horizons Lointains',
    description: 'Dans un futur distant, l\'humanité explore les confins de l\'univers à la recherche d\'un nouveau foyer.',
    releaseYear: 2022,
    duration: 143,
    posterUrl: 'https://images.pexels.com/photos/6985003/pexels-photo-6985003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://example.com/video2.mp4',
    genre: ['Science-Fiction', 'Drame'],
  },
  {
    id: '3',
    title: 'Ombres du Passé',
    description: 'Un détective tourmenté doit résoudre une affaire liée à son propre passé.',
    releaseYear: 2021,
    duration: 118,
    posterUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://example.com/video3.mp4',
    genre: ['Thriller', 'Crime'],
  },
  {
    id: '4',
    title: 'Rêves Éternels',
    description: 'Une histoire d\'amour qui transcende le temps et l\'espace.',
    releaseYear: 2023,
    duration: 135,
    posterUrl: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://example.com/video4.mp4',
    genre: ['Romance', 'Drame'],
  },
  {
    id: '5',
    title: 'Cité des Ténèbres',
    description: 'Dans une ville corrompue, un héros improbable se lève pour combattre l\'injustice.',
    releaseYear: 2022,
    duration: 152,
    posterUrl: 'https://images.pexels.com/photos/2817430/pexels-photo-2817430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://example.com/video5.mp4',
    genre: ['Action', 'Crime'],
    featured: true,
  },
  {
    id: '6',
    title: 'Les Échos du Silence',
    description: 'Un compositeur sourd doit surmonter ses obstacles pour créer son chef-d\'œuvre.',
    releaseYear: 2021,
    duration: 127,
    posterUrl: 'https://images.pexels.com/photos/7607443/pexels-photo-7607443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://example.com/video6.mp4',
    genre: ['Drame', 'Musique'],
  },
];

export const series: Series[] = [
  {
    id: '1',
    title: 'Les Chroniques du Temps',
    description: 'Une épopée à travers différentes époques historiques, suivant les aventures d\'une famille aux pouvoirs extraordinaires.',
    releaseYear: 2022,
    posterUrl: 'https://images.pexels.com/photos/4009401/pexels-photo-4009401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: ['Science-Fiction', 'Historique'],
    featured: true,
    seasons: [
      {
        id: 's1',
        seasonNumber: 1,
        episodes: [
          {
            id: 'e1',
            title: 'Origines',
            episodeNumber: 1,
            duration: 55,
            videoUrl: 'https://example.com/series1/s1e1.mp4',
          },
          {
            id: 'e2',
            title: 'Renaissance',
            episodeNumber: 2,
            duration: 52,
            videoUrl: 'https://example.com/series1/s1e2.mp4',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Royaume des Espions',
    description: 'Dans l\'Europe de la Guerre froide, des agents secrets s\'affrontent dans l\'ombre.',
    releaseYear: 2021,
    posterUrl: 'https://images.pexels.com/photos/2121666/pexels-photo-2121666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: ['Espionnage', 'Drame'],
    seasons: [
      {
        id: 's1',
        seasonNumber: 1,
        episodes: [
          {
            id: 'e1',
            title: 'Recrutement',
            episodeNumber: 1,
            duration: 58,
            videoUrl: 'https://example.com/series2/s1e1.mp4',
          },
          {
            id: 'e2',
            title: 'Mission: Berlin',
            episodeNumber: 2,
            duration: 56,
            videoUrl: 'https://example.com/series2/s1e2.mp4',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Destins Croisés',
    description: 'Les vies de plusieurs personnes s\'entremêlent de façon inattendue dans cette série dramatique.',
    releaseYear: 2023,
    posterUrl: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: ['Drame', 'Romance'],
    seasons: [
      {
        id: 's1',
        seasonNumber: 1,
        episodes: [
          {
            id: 'e1',
            title: 'Rencontres',
            episodeNumber: 1,
            duration: 48,
            videoUrl: 'https://example.com/series3/s1e1.mp4',
          },
          {
            id: 'e2',
            title: 'Conséquences',
            episodeNumber: 2,
            duration: 50,
            videoUrl: 'https://example.com/series3/s1e2.mp4',
          },
        ],
      },
    ],
  },
];