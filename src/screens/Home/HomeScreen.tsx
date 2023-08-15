import {
  Loading,
  MovieList,
  TogleTheme,
  TrendingMovies,
} from '@components/index';
import { RootStackParamList } from '@navigation/AppNavigation';
import { StackScreenProps } from '@react-navigation/stack';
import { ios } from '@utils/device';
import { RoutesName } from '@utils/enums';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeViewModel as useViewModel } from './ViewModel';
import { useTheme } from '@react-navigation/native';
import { typeTheme } from '@theme/ThemeProvider';

interface HomeScreenProps
  extends StackScreenProps<RootStackParamList, RoutesName.HomeScreen> {}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { trending, topRated, upcoming, isLoading } = useViewModel();
  const { colors } = useTheme() as typeTheme;
  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* logo and search bar */}
      <SafeAreaView className={ios ? 'mb-2' : 'mb-3'}>
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color={colors.text1} />
          <Text className="text-3xl font-bold" style={{ color: colors.text1 }}>
            <Text style={{ color: colors.primary }}>M</Text>
            ovies
          </Text>
          <TogleTheme />
          <TouchableOpacity
            onPress={() => {
              navigation.push(RoutesName.SearchScreen);
            }}>
            <MagnifyingGlassIcon
              size="30"
              strokeWidth={2}
              color={colors.text1}
            />
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
