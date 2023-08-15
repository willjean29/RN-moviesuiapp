import { pathMovieUrl } from '@api/moviedb';
import { Movie } from '@interfaces/movie';
import { RootStackParamList } from '@navigation/AppNavigation';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { typeTheme } from '@theme/ThemeProvider';
import { height, width } from '@utils/device';
import { RoutesName } from '@utils/enums';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface MovieListProps {
  title: string;
  data: Movie[];
  hideSeeAll?: boolean;
}

export const MovieList: React.FC<MovieListProps> = ({
  title,
  data,
  hideSeeAll = false,
}) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, RoutesName.HomeScreen>
    >();
  const { colors } = useTheme() as typeTheme;
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-xl" style={{ color: colors.text1 }}>
          {title}
        </Text>
        {!hideSeeAll && (
          <TouchableOpacity className="">
            <Text style={{ color: colors.primary }} className="text-lg">
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
        {data.map((item, index) => {
          const uri = pathMovieUrl(item?.posterPath);
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
                <Text className="ml-1" style={{ color: colors.text1 }}>
                  {item?.originalTitle?.length > 14
                    ? item?.originalTitle?.slice(0, 14) + '...'
                    : item?.originalTitle}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};
