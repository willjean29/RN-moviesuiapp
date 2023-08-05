import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import { styles } from '@theme/index';
import TrendingMovies from '@components/TrendingMovies';
import MovieList from '@components/MovieList';
import { ios } from '@utils/device';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/AppNavigation';
import { RoutesName } from '@utils/enums';
import Loading from '@components/Loading';
import { getListMovieAdapter } from '@adapters/moviesAdapter';
import { ListMovies, ListMoviesApi, Movie } from '@interfaces/movie';
import useFetch from '@hooks/useFetch';
import {
  topRatedMoviesUrl,
  trendingMoviesUrl,
  upcomingMoviesUrl,
} from '@api/moviedb';

interface HomeScreenProps
  extends StackScreenProps<RootStackParamList, RoutesName.HomeScreen> {}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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

  return (
    <View className="flex-1 bg-neutral-800">
      {/* logo and search bar */}
      <SafeAreaView className={ios ? 'mb-2' : 'mb-3'}>
        <StatusBar barStyle={'light-content'} />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>
            ovies
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.push(RoutesName.SearchScreen);
            }}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {!isLoading ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}>
          {/* Trending movies carousel */}

          {trending && trending.length > 0 && (
            <TrendingMovies data={trending} />
          )}

          {/* upcoming movies row */}
          {upcoming && upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}

          {/* top rated movies row */}
          {topRated && topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} />
          )}
        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default HomeScreen;
