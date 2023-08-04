import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeartIcon } from 'react-native-heroicons/solid';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { styles, theme } from '@theme/index';
import { height, ios, width } from '@utils/device';
import { useNavigation } from '@react-navigation/native';
import MovieList from '@components/MovieList';
import Loading from '@components/Loading';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/AppNavigation';
import { RoutesName } from '@utils/enums';
import {
  fetchPersonDetails,
  fetchPersonMovies,
  pathMovieUrl,
} from '@api/moviedb';
import { Gender } from '../utils/enums';
interface PersonScreenProps
  extends StackScreenProps<RootStackParamList, RoutesName.PersonScreen> {}

const PersonScreen: React.FC<PersonScreenProps> = ({ route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState<any>({});
  const [personMovies, setPersonMovies] = useState<any>([]);
  const verticalMargin = ios ? '' : 'my-3';
  const { item } = route.params;
  const navigation = useNavigation();
  const uri = pathMovieUrl(person?.profile_path);

  const getPersonDetails = async (id: number) => {
    const data = await fetchPersonDetails(id);
    if (data) {
      setPerson(data);
    }
    setIsLoading(false);
  };
  const getPersonMovies = async (id: number) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

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
          <HeartIcon
            size={35}
            strokeWidth={2.5}
            color={isFavorite ? theme.backgroundColor : 'white'}
          />
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
                source={{
                  uri: uri
                    ? uri
                    : 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg',
                }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {person?.name}
            </Text>
            <Text className="text-base text-neutral-500 font-bold text-center">
              {person?.place_of_birth}
            </Text>
          </View>
          <View className="mx-4 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 items-center px-2">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.gender === 1 ? Gender.Female : Gender.Male}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 items-center px-2">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 items-center px-2">
              <Text className="text-white font-semibold">Know for</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.known_for_department}
              </Text>
            </View>
            <View className="items-center px-2">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.popularity.toFixed(2)}
              </Text>
            </View>
          </View>
          <View className="mx-4 my-6 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography}
            </Text>
          </View>
          {/* movies */}
          <MovieList title="Movies" data={personMovies} hideSeeAll />
        </View>
      ) : (
        <Loading />
      )}
    </ScrollView>
  );
};

export default PersonScreen;
