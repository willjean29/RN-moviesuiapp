/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';

interface TrendingMoviesProps {
  data: any;
}
const {width, height} = Dimensions.get('window');
const TrendingMovies: React.FC<TrendingMoviesProps> = ({data}) => {
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={() => <MovieCard />}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 12,
        }}
      />
    </View>
  );
};

const MovieCard = () => {
  return (
    <TouchableWithoutFeedback className="bg-red-400">
      <Image
        source={require('../assets/images/moviePoster1.png')}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovies;
