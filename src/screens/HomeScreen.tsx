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
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/moviedb';

interface HomeScreenProps
  extends StackScreenProps<RootStackParamList, RoutesName.HomeScreen> {}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [trending, setTrending] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [isLoading, setisLoading] = useState(true);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      setTrending(data.results);
    }
    setisLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) {
      setUpcoming(data.results);
    }
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) {
      setTopRated(data.results);
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
              navigation.navigate(RoutesName.SearchScreen);
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
          <TrendingMovies data={trending} />
          {/* Upcoming movies row */}
          <MovieList title="Upcoming" data={upcoming} />
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default HomeScreen;
