/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/AppNavigation';
import { RoutesName } from '@utils/enums';
import { height, width } from '@utils/device';
import Loading from '@components/Loading';

interface SearchScreenProps
  extends StackScreenProps<RootStackParamList, RoutesName.SearchScreen> {}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [results, setResults] = useState([1, 2, 3, 4, 5]);
  const [isLoading, setisLoading] = useState(false);
  const movieName = 'Ant-Man and the Wasp: Quantunmania';
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
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
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          className="space-y-3">
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map(() => {
              return (
                <TouchableWithoutFeedback>
                  <View className="space-y-2 mb-4">
                    <Image
                      source={require('../assets/images/moviePoster2.png')}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                      className="rounded-3xl"
                    />
                    <Text className="text-neutral-300 ml-1">
                      {movieName.length > 22
                        ? movieName.slice(0, 22) + '...'
                        : movieName}
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
