export interface ListMoviesApi {
  page: number;
  results: MovieApi[];
  total_pages: number;
  total_results: number;
}

export interface MovieApi {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  status?: string;
  runtime?: number;
  genres?: Gender[];
}

export interface Gender {
  id: number;
  name: string;
}

export enum MediaType {
  Movie = 'movie',
}

export interface ListMovies {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}

export interface Movie {
  adult: boolean;
  backdropPath: string;
  id: number;
  title: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  mediaType: MediaType;
  genreIds: number[];
  popularity: number;
  releaseDate: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
  status?: string;
  runtime?: number;
  genres?: Gender[];
}

export interface ListPersonMovieApi {
  id: number;
  cast: MovieApi[];
  crew: MovieApi[];
}

export interface ListPersonMovie {
  id: number;
  cast: Movie[];
  crew: Movie[];
}
