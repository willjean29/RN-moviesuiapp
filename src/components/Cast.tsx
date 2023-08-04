import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RoutesName } from '@utils/enums';
import { pathMovieUrl } from '@api/moviedb';
interface CastProps {
  cast: any;
}
const Cast: React.FC<CastProps> = ({ cast }) => {
  const navigation = useNavigation();
  return (
    <View className="my-6">
      <Text className="text-white mx-4 mb-5 text-lg">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {cast.map((person: any, index: any) => {
          const uri = pathMovieUrl(person?.profile_path);
          return (
            <TouchableOpacity
              key={index}
              className="mx-4 items-center"
              onPress={() =>
                navigation.navigate(RoutesName.PersonScreen, {
                  item: person,
                })
              }>
              <View className="rounded-full overflow-hidden h-20 w-20 items-center border border-neutral-500">
                <Image
                  source={{
                    uri: uri
                      ? uri
                      : 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg',
                  }}
                  className="rounded-2xl h-24 w-20"
                />
              </View>

              <Text className="text-white text-xs mt-1">
                {person?.character?.length > 10
                  ? person?.character.slice(0, 10) + '...'
                  : person?.character}
              </Text>
              <Text className="text-neutral-400 text-xs mt-1">
                {person?.name?.length > 10
                  ? person?.name.slice(0, 10) + '...'
                  : person?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Cast;
