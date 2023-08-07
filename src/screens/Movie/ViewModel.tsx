import {
  getListMovieAdapter,
  getListPersonAdapter,
  getMovieAdapter,
} from '@adapters/index';
import {
  movieCreditsUrl,
  movieDetailsUrl,
  pathMovieUrl,
  similarMoviesUrl,
} from '@api/moviedb';
import useFetch from '@hooks/useFetch';
import { ListMovies, ListMoviesApi, Movie, MovieApi } from '@interfaces/movie';
import { Cast, ListCast, ListCastApi } from '@interfaces/person';
import { RootStackParamList } from '@navigation/AppNavigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { ios } from '@utils/device';
import { RoutesName } from '@utils/enums';
import { useEffect, useState } from 'react';

export const MovieViewModel = (
  route: RouteProp<RootStackParamList, RoutesName.MovieScreen>,
) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState<Cast[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  const [movie, setMovie] = useState<Movie>({} as Movie);
  const navigation = useNavigation();
  const verticalMargin = ios ? '' : 'my-3';
  const { item } = route.params;

  const { data: movieData, isLoading } = useFetch<MovieApi, Movie>(
    movieDetailsUrl(item.id),
    getMovieAdapter,
  );
  const { data: castData } = useFetch<ListCastApi, ListCast>(
    movieCreditsUrl(item.id),
    getListPersonAdapter,
  );
  const { data: similarData } = useFetch<ListMoviesApi, ListMovies>(
    similarMoviesUrl(item.id),
    getListMovieAdapter,
  );

  const uri = pathMovieUrl(movie?.posterPath);

  useEffect(() => {
    if (movieData) {
      setMovie(movieData);
    }
    if (castData) {
      setCast(castData?.cast);
    }
    if (similarData) {
      setSimilarMovies(similarData?.results);
    }
  }, [item, movieData, castData, similarData]);
  return {
    movie,
    similarMovies,
    cast,
    isLoading,
    isFavorite,
    uri,
    verticalMargin,
    navigation,
    setIsFavorite,
  };
};
