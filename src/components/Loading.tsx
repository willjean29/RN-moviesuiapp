import { View } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { height, width } from '@utils/device';
import { typeTheme } from '@theme/ThemeProvider';
import { useTheme } from '@react-navigation/native';

export const Loading = () => {
  const { colors } = useTheme() as typeTheme;
  return (
    <View
      style={{ width, height }}
      className="absolute flex-row justify-center items-center">
      <Progress.CircleSnail thickness={12} size={160} color={colors.primary} />
    </View>
  );
};
