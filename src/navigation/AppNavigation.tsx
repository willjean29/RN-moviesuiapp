import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/HomeScreen';
import MovieScreen from '@screens/MovieScreen';
import { RoutesName } from '@utils/enums';

export type RootStackParamList = {
  HomeScreen: undefined;
  MovieScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={RoutesName.HomeScreen}
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name={RoutesName.MovieScreen}
          options={{ headerShown: false }}
          component={MovieScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
