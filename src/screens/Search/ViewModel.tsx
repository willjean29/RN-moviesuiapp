import { getListMovieAdapter } from '@adapters/index';
import { searchMoviesUrl } from '@api/moviedb';
import useFetch from '@hooks/useFetch';
import { StringKeyValueObject } from '@interfaces/app';
import { ListMovies, ListMoviesApi, Movie } from '@interfaces/movie';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

const SearchViewModel = () => {
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getFetchData } = useFetch<ListMoviesApi, ListMovies>(
    searchMoviesUrl,
    getListMovieAdapter,
  );

  const getSearchMovies = async (params: StringKeyValueObject) => {
    const searchMovies = await getFetchData(params);
    if (searchMovies) {
      setResults(searchMovies?.results);
    }
  };

  const handleSearch = async (value: string) => {
    if (value && value.length > 2) {
      setIsLoading(true);
      try {
        await getSearchMovies({
          query: value,
          include_adult: 'false',
          language: 'en-US',
          page: '1',
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setResults([]);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return {
    handleTextDebounce,
    results,
    isLoading,
    handleSearch,
  };
};

export default SearchViewModel;
