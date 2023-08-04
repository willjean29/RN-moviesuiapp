import { apiKey } from '@constants/index';
import axios from 'axios';

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

export const pathMovieUrl = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + apiKey,
  },
});

const fetchApi = async (url: string, params?: any) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchTrendingMovies = async () => {
  return fetchApi(trendingMoviesUrl);
};

export const fetchUpcomingMovies = async () => {
  return fetchApi(upcomingMoviesUrl);
};

export const fetchTopRatedMovies = async () => {
  return fetchApi(topRatedMoviesUrl);
};

export const fetchMovieDetails = async (id: number) => {
  return fetchApi(movieDetailsUrl(id));
};

export const fetchMovieCredits = async (id: number) => {
  return fetchApi(movieCreditsUrl(id));
};

export const fetchSimilarMovies = async (id: number) => {
  return fetchApi(similarMoviesUrl(id));
};

export const fetchPersonDetails = async (id: number) => {
  return fetchApi(personDetailsUrl(id));
};

export const fetchPersonMovies = async (id: number) => {
  return fetchApi(personMoviesUrl(id));
};

export const fetchSearchMovies = async (params: any) => {
  return fetchApi(searchMoviesUrl, params);
};
