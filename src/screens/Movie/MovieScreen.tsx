import { ListPerson, Loading, MovieList } from '@components/index';
import { RootStackParamList } from '@navigation/AppNavigation';
import { StackScreenProps } from '@react-navigation/stack';
import { height, width } from '@utils/device';
import { RoutesName } from '@utils/enums';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MovieViewModel as useViewModel } from './ViewModel';
import { useTheme } from '@react-navigation/native';
import { typeTheme } from '@theme/ThemeProvider';

interface MovieScreenProps
  extends StackScreenProps<RootStackParamList, RoutesName.MovieScreen> {}

const MovieScreen: React.FC<MovieScreenProps> = ({ route }) => {
  const {
    cast,
    similarMovies,
    uri,
    isFavorite,
    setIsFavorite,
    isLoading,
    movie,
    navigation,
    verticalMargin,
  } = useViewModel(route);
  const { colors } = useTheme() as typeTheme;
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1"
      style={{ backgroundColor: colors.background }}>
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
            style={{ backgroundColor: colors.primary }}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl p-1"
            onPress={() => setIsFavorite(!isFavorite)}>
            <HeartIcon
              size={35}
              strokeWidth={2.5}
              color={isFavorite ? colors.primary : colors.white}
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
