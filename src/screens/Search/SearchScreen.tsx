import { pathMovieUrl } from '@api/moviedb';
import { Loading } from '@components/index';
import { RootStackParamList } from '@navigation/AppNavigation';
import { StackScreenProps } from '@react-navigation/stack';
import { height, width } from '@utils/device';
import { RoutesName } from '@utils/enums';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchViewModel from './ViewModel';

interface SearchScreenProps
  extends StackScreenProps<RootStackParamList, RoutesName.SearchScreen> {}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const { results, isLoading, handleTextDebounce } = SearchViewModel();
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
            source={require('../../assets/images/movieTime.png')}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
