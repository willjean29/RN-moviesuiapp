import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '@theme/index';
import { width, height, ios } from '@utils/device';
import LinearGradient from 'react-native-linear-gradient';
import ListPerson from '@components/Cast';
import MovieList from '@components/MovieList';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/AppNavigation';
import { RoutesName } from '@utils/enums';
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  pathMovieUrl,
} from '@api/moviedb';
import Loading from '@components/Loading';
import { getListMovieAdapter, getMovieAdapter } from '@adapters/moviesAdapter';
import { getListPersonAdapter } from '@adapters/personAdapter';
import { Movie } from '@interfaces/movie';
import { Cast } from '@interfaces/person';

interface MovieScreenProps
  extends StackScreenProps<RootStackParamList, RoutesName.MovieScreen> {}

const MovieScreen: React.FC<MovieScreenProps> = ({ route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState<Cast[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const navigation = useNavigation();
  const verticalMargin = ios ? '' : 'my-3';
  const { item } = route.params;

  const uri = pathMovieUrl(movie?.posterPath);

  const getMovieDetails = async (idMovie: number) => {
    const data = await fetchMovieDetails(idMovie);
    setisLoading(false);
    if (data) {
      const movieData = getMovieAdapter(data);
      setMovie(movieData);
    }
  };

  const getMoviesCredits = async (idMovie: number) => {
    const data = await fetchMovieCredits(idMovie);
    if (data && data.cast) {
      const castData = getListPersonAdapter(data);
      setCast(castData.cast);
    }
  };

  const getSimilarMovies = async (idMovie: number) => {
    const data = await fetchSimilarMovies(idMovie);
    if (data && data.results) {
      const similiarData = getListMovieAdapter(data);
      setSimilarMovies(similiarData.results);
    }
  };

  useEffect(() => {
    setisLoading(true);
    getMovieDetails(item?.id);
    getMoviesCredits(item?.id);
    getSimilarMovies(item?.id);
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900">
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row justify-between items-center px-4' +
            verticalMargin
          }>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-xl p-1"
            style={styles.background}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl p-1"
            onPress={() => setIsFavorite(!isFavorite)}>
            <HeartIcon
              size={35}
              strokeWidth={2.5}
              color={isFavorite ? theme.backgroundColor : 'white'}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {isLoading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: uri
                  ? uri
                  : 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg',
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{ width, height: height * 0.5 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>
      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-3xl font-bold text-center tracking-wider">
          {movie?.originalTitle}
        </Text>
        {/* status, relese, runtime */}
        <Text className="text-neutral-400 text-center text-base font-semibold">
          {movie?.status} * {movie?.releaseDate?.split('-')[0]} *{' '}
          {movie?.runtime} min
        </Text>
        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((gender, index) => {
            return (
              <Text
                className="text-neutral-400 font-semibold text-base text-center"
                key={index}>
                {gender?.name}
              </Text>
            );
          })}
        </View>
        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>
      {/* cast */}
      <ListPerson cast={cast} />
      <MovieList title="Similar Movies" data={similarMovies} hideSeeAll />
    </ScrollView>
  );
};

export default MovieScreen;
