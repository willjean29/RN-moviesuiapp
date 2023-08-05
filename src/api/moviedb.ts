export const apiBaseUrl = 'https://api.themoviedb.org/3';
export const trendingMoviesUrl = '/trending/movie/day';
export const upcomingMoviesUrl = '/movie/upcoming';
export const topRatedMoviesUrl = '/movie/top_rated';
export const searchMoviesUrl = '/search/movie';

export const movieDetailsUrl = (id: number) => `${apiBaseUrl}/movie/${id}`;
export const movieCreditsUrl = (id: number) =>
  `${apiBaseUrl}/movie/${id}/credits`;
export const similarMoviesUrl = (id: number) =>
  `${apiBaseUrl}/movie/${id}/similar`;

export const personDetailsUrl = (id: number) => `${apiBaseUrl}/person/${id}`;
export const personMoviesUrl = (id: number) =>
  `${apiBaseUrl}/person/${id}/movie_credits`;

export const pathMovieUrl = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
