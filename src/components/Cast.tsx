import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
interface CastProps {
  cast: any;
}
const Cast: React.FC<CastProps> = ({ cast }) => {
  const characterName = 'John Wick';
  const personName = 'Keanu Reevs';
  return (
    <View className="my-6">
      <Text className="text-white mx-4 mb-5 text-lg">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {cast.map(() => {
          return (
            <TouchableOpacity className="mx-4 items-center">
              <View className="rounded-full overflow-hidden h-20 w-20 items-center border border-neutral-500">
                <Image
                  source={require('../assets/images/castImage1.png')}
                  className="rounded-2xl h-24 w-20"
                />
              </View>

              <Text className="text-white text-xs mt-1">
                {characterName.length > 10
                  ? characterName.slice(0, 10) + '...'
                  : characterName}
              </Text>
              <Text className="text-neutral-400 text-xs mt-1">
                {personName.length > 10
                  ? personName.slice(0, 10) + '...'
                  : personName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Cast;
