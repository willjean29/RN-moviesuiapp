/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeartIcon } from 'react-native-heroicons/solid';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { styles } from '@theme/index';
import { height, ios, width } from '@utils/device';
import { useNavigation } from '@react-navigation/native';
import MovieList from '@components/MovieList';
import Loading from '@components/Loading';

const PersonScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const verticalMargin = ios ? '' : 'my-3';
  const navigation = useNavigation();
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}>
      {/* back button */}
      <SafeAreaView
        className={
          'z-20 w-full flex-row justify-between items-center px-4' +
          verticalMargin
        }>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="rounded-xl p-1"
          style={styles.background}>
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-xl p-1"
          onPress={() => setIsFavorite(!isFavorite)}>
          <HeartIcon size={35} strokeWidth={2.5} color={'white'} />
        </TouchableOpacity>
      </SafeAreaView>
      {/* person details */}
      {!isLoading ? (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}>
            <View className="items-center overflow-hidden h-72 w-72 rounded-full border-2 border-neutral-600">
              <Image
                source={require('../assets/images/castImage2.png')}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              Keanue Reevs
            </Text>
            <Text className="text-base text-neutral-500 font-bold text-center">
              London, United Kingdom
            </Text>
          </View>
          <View className="mx-4 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 items-center px-2">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">Male</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 items-center px-2">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">1982-10-10</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 items-center px-2">
              <Text className="text-white font-semibold">Know for</Text>
              <Text className="text-neutral-300 text-sm">Acting</Text>
            </View>
            <View className="items-center px-2">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">64.5</Text>
            </View>
          </View>
          <View className="mx-4 my-6 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias
              consequatur quo ipsum esse, maiores quidem eaque deleniti
              aspernatur asperiores ad fugit. Blanditiis magnam totam dolores
              repellat a ex eveniet placeat.
            </Text>
          </View>
          {/* movies */}
          <MovieList title="Movies" data={[1, 2, 3, 4, 5]} hideSeeAll />
        </View>
      ) : (
        <Loading />
      )}
    </ScrollView>
  );
};

export default PersonScreen;
