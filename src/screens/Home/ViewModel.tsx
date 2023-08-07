import { getListMovieAdapter } from '@adapters/index';
import {
  topRatedMoviesUrl,
  trendingMoviesUrl,
  upcomingMoviesUrl,
} from '@api/moviedb';
import useFetch from '@hooks/useFetch';
import { ListMovies, ListMoviesApi, Movie } from '@interfaces/movie';
import { useEffect, useState } from 'react';

export const HomeViewModel = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);

  const { data: trendingMovies, isLoading } = useFetch<
    ListMoviesApi,
    ListMovies
  >(trendingMoviesUrl, getListMovieAdapter);

  const { data: upcomingMovies } = useFetch<ListMoviesApi, ListMovies>(
    upcomingMoviesUrl,
    getListMovieAdapter,
  );
  const { data: topMovies } = useFetch<ListMoviesApi, ListMovies>(
    topRatedMoviesUrl,
    getListMovieAdapter,
  );

  useEffect(() => {
    if (trendingMovies) {
      setTrending(trendingMovies?.results);
    }
    if (upcomingMovies) {
      setUpcoming(upcomingMovies?.results);
    }
    if (topMovies) {
      setTopRated(topMovies?.results);
    }
  }, [trendingMovies, upcomingMovies, topMovies]);
  return {
    trending,
    upcoming,
    topRated,
    isLoading,
  };
};
