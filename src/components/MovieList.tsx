import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { styles } from '@theme/index';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RoutesName } from '@utils/enums';
import { pathMovieUrl } from '../api/moviedb';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/AppNavigation';

interface MovieListProps {
  title: string;
  data: any;
  hideSeeAll?: boolean;
}
const { width, height } = Dimensions.get('window');
const MovieList: React.FC<MovieListProps> = ({
  title,
  data,
  hideSeeAll = false,
}) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, RoutesName.HomeScreen>
    >();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity className="">
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {data.map((item: any, index: any) => {
          const uri = pathMovieUrl(item?.poster_path);
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                navigation.push(RoutesName.MovieScreen, {
                  item: item,
                });
              }}>
              <View className="space-y-1 mr-4">
                <Image
                  source={{
                    uri: uri
                      ? uri
                      : 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg',
                  }}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-300 ml-1">
                  {item?.original_title?.length > 14
                    ? item?.original_title?.slice(0, 14) + '...'
                    : item?.original_title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
