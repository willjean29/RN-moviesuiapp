/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '@theme/index';
import { width, height } from '@utils/device';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '@components/Cast';
import MovieList from '@components/MovieList';
import { useNavigation } from '@react-navigation/native';

const MovieScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const movieName = 'Ant-Man and the Wasp: Quantunmania';
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900">
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4">
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
              color={isFavorite ? styles.background.backgroundColor : 'white'}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={require('../assets/images/moviePoster2.png')}
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
      </View>
      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-3xl font-bold text-center tracking-wider">
          {movieName}
        </Text>
        {/* status, relese, runtime */}
        <Text className="text-neutral-400 text-center text-base font-semibold">
          Releades * 2020 * 170 min
        </Text>
        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action *
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thiler *
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>
        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          facilis laboriosam totam, quod quis consequatur minima, consequuntur
          iusto animi sit temporibus magnam debitis quas accusantium? Possimus
          deleniti iure consectetur voluptatibus.
        </Text>
      </View>
      {/* cast */}
      <Cast cast={cast} />
      <MovieList title="Similar Movies" data={similarMovies} hideSeeAll />
    </ScrollView>
  );
};

export default MovieScreen;
