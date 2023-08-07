import { getListPersonMovieAdapter, getPersonAdapter } from '@adapters/index';
import { pathMovieUrl, personDetailsUrl, personMoviesUrl } from '@api/moviedb';
import useFetch from '@hooks/useFetch';
import { ListPersonMovie, ListPersonMovieApi, Movie } from '@interfaces/movie';
import { Cast, CastApi } from '@interfaces/person';
import { RootStackParamList } from '@navigation/AppNavigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { ios } from '@utils/device';
import { RoutesName } from '@utils/enums';
import { useEffect, useState } from 'react';

const PersonViewModel = (
  route: RouteProp<RootStackParamList, RoutesName.PersonScreen>,
) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [person, setPerson] = useState<Cast>({} as Cast);
  const [personMovies, setPersonMovies] = useState<Movie[]>([]);
  const verticalMargin = ios ? '' : 'my-3';
  const { item } = route.params;
  const navigation = useNavigation();
  const uri = pathMovieUrl(person?.profilePath);

  const { data: personData, isLoading } = useFetch<CastApi, Cast>(
    personDetailsUrl(item.id),
    getPersonAdapter,
  );

  const { data: personMovieData } = useFetch<
    ListPersonMovieApi,
    ListPersonMovie
  >(personMoviesUrl(item.id), getListPersonMovieAdapter);

  useEffect(() => {
    if (personData) {
      setPerson(personData);
    }
    if (personMovieData) {
      setPersonMovies(personMovieData?.cast);
    }
  }, [item, personData, personMovieData]);
  return {
    person,
    personMovies,
    verticalMargin,
    uri,
    isLoading,
    isFavorite,
    navigation,
    setIsFavorite,
  };
};

export default PersonViewModel;
