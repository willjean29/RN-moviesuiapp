/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  StatusBar,
  Platform,
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
import { Movie } from '@interfaces/movie';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '@api/moviedb';

interface HomeScreenProps
  extends StackScreenProps<RootStackParamList, RoutesName.HomeScreen> {}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [isLoading, setisLoading] = useState(true);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      const trendingMovies = getListMovieAdapter(data);
      setTrending(trendingMovies.results);
    }
    setisLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) {
      const upcomingMovies = getListMovieAdapter(data);
      setUpcoming(upcomingMovies.results);
    }
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) {
      const topMovies = getListMovieAdapter(data);
      setTopRated(topMovies.results);
    }
  };

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

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
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* upcoming movies row */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}

          {/* top rated movies row */}
          {topRated.length > 0 && (
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
