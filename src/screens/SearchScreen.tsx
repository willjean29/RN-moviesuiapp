import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/AppNavigation';
import { RoutesName } from '@utils/enums';
import { height, width } from '@utils/device';
import Loading from '@components/Loading';
import { pathMovieUrl, searchMoviesUrl } from '@api/moviedb';
import { debounce } from 'lodash';
import { getListMovieAdapter } from '@adapters/moviesAdapter';
import useFetch from '@hooks/useFetch';
import { ListMovies, ListMoviesApi, Movie } from '@interfaces/movie';
import { StringKeyValueObject } from '@interfaces/app';
interface SearchScreenProps
  extends StackScreenProps<RootStackParamList, RoutesName.SearchScreen> {}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getFetchData } = useFetch<ListMoviesApi, ListMovies>(
    searchMoviesUrl,
    getListMovieAdapter,
  );

  const getSearchMovies = async (params: StringKeyValueObject) => {
    const searchMovies = await getFetchData(params);
    if (searchMovies) {
      setResults(searchMovies?.results);
    }
  };

  const handleSearch = async (value: string) => {
    if (value && value.length > 2) {
      setIsLoading(true);
      try {
        await getSearchMovies({
          query: value,
          include_adult: 'false',
          language: 'en-US',
          page: '1',
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setResults([]);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={text => handleTextDebounce(text)}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide"
        />
        <TouchableOpacity
          className="bg-neutral-500 rounded-full p-3 m-1"
          onPress={() => {
            navigation.navigate(RoutesName.HomeScreen);
          }}>
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {/* results */}
      {isLoading ? (
        <Loading />
      ) : results?.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          className="space-y-3">
          <Text className="text-white font-semibold ml-1">
            Results ({results?.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results?.map((item, index) => {
              const uri = pathMovieUrl(item?.posterPath);
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    navigation.navigate(RoutesName.MovieScreen, {
                      item,
                    });
                  }}>
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{
                        uri: uri
                          ? uri
                          : 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg',
                      }}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                      className="rounded-3xl"
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.originalTitle.length > 22
                        ? item?.originalTitle.slice(0, 22) + '...'
                        : item?.originalTitle}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center items-center">
          <Image
            source={require('../assets/images/movieTime.png')}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
