import { apiKey } from '@constants/index';
import axios from 'axios';

export const apiBaseUrl = 'https://api.themoviedb.org/3';
export const trendingMoviesUrl = '/trending/movie/day';
export const upcomingMoviesUrl = '/movie/upcoming';
export const topRatedMoviesUrl = '/movie/top_rated';

export const movieDetailsUrl = (id: number) => `${apiBaseUrl}/movie/${id}`;
export const movieCreditsUrl = (id: number) =>
  `${apiBaseUrl}/movie/${id}/credits`;
export const similarMoviesUrl = (id: number) =>
  `${apiBaseUrl}/movie/${id}/similar`;

export const pathMovieUrl = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + apiKey,
  },
});

const fetchApi = async (url: string) => {
  try {
    const response = await api.get(url);
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
