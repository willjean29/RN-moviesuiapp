import { View } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { height, width } from '@utils/device';
import { theme } from '@theme/index';
const Loading = () => {
  return (
    <View
      style={{ width, height }}
      className="absolute flex-row justify-center items-center">
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={theme.backgroundColor}
      />
    </View>
  );
};

export default Loading;
