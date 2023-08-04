import {
  ListMovies,
  ListMoviesApi,
  MovieApi,
  Movie,
  ListPersonMovieApi,
  ListPersonMovie,
} from '@interfaces/movie';

export const getListMovieAdapter = (data: ListMoviesApi): ListMovies => {
  return {
    page: data.page,
    results: data.results.map(movie => getMovieAdapter(movie)),
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
};

export const getMovieAdapter = (movie: MovieApi): Movie => {
  return {
    adult: movie.adult,
    backdropPath: movie.backdrop_path,
    id: movie.id,
    title: movie.title,
    originalLanguage: movie.original_language,
    originalTitle: movie.original_title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    mediaType: movie.media_type,
    genreIds: movie.genre_ids,
    popularity: movie.popularity,
    releaseDate: movie.release_date,
    video: movie.video,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    status: movie.status,
    runtime: movie.runtime,
    genres: movie.genres,
  };
};

export const getListPersonMovieAdapter = (
  data: ListPersonMovieApi,
): ListPersonMovie => {
  return {
    id: data.id,
    cast: data.cast.map(movie => getMovieAdapter(movie)),
    crew: data.crew.map(movie => getMovieAdapter(movie)),
  };
};
