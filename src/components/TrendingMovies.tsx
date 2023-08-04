import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { height, width } from '@utils/device';
import { pathMovieUrl } from '@api/moviedb';
import { useNavigation } from '@react-navigation/native';
import { RoutesName } from '@utils/enums';

interface TrendingMoviesProps {
  data: any;
}

const TrendingMovies: React.FC<TrendingMoviesProps> = ({ data }) => {
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item, index }) => <MovieCard key={index} item={item} />}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 12,
        }}
        vertical={false}
      />
    </View>
  );
};

interface MovieCardProps {
  item: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ item }) => {
  const uri = pathMovieUrl(item.poster_path);
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate(RoutesName.MovieScreen, {
          item,
        });
      }}>
      <Image
        source={{
          uri: uri
            ? uri
            : 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg',
        }}
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
