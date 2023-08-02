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
  const navigation = useNavigation();
  const movieName = 'Ant-Man and the Wasp: Quantunmania';
  console.log('hola');
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
        {data.map(() => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                console.log('click');
                navigation.navigate(RoutesName.MovieScreen);
              }}>
              <View className="space-y-1 mr-4">
                <Image
                  source={require('../assets/images/moviePoster2.png')}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-300 ml-1">
                  {movieName.length > 14
                    ? movieName.slice(0, 14) + '...'
                    : movieName}
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
