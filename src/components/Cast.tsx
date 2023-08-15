import { pathMovieUrl } from '@api/moviedb';
import { Cast } from '@interfaces/person';
import { useNavigation, useTheme } from '@react-navigation/native';
import { typeTheme } from '@theme/ThemeProvider';
import { RoutesName } from '@utils/enums';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
interface ListPersonProps {
  cast: Cast[];
}

export const ListPerson: React.FC<ListPersonProps> = ({ cast }) => {
  const navigation = useNavigation();
  const { colors } = useTheme() as typeTheme;
  return (
    <View className="my-6">
      <Text className="mx-4 mb-5 text-lg" style={{ color: colors.text1 }}>
        Top Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {cast.map((person, index) => {
          const uri = pathMovieUrl(person?.profilePath);
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

              {person.character && (
                <Text className="text-xs mt-1" style={{ color: colors.text1 }}>
                  {person.character.length > 10
                    ? person.character.slice(0, 10) + '...'
                    : person.character}
                </Text>
              )}
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
