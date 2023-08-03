import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/HomeScreen';
import MovieScreen from '@screens/MovieScreen';
import { RoutesName } from '@utils/enums';
import PersonScreen from '../screens/PersonScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  MovieScreen: undefined;
  PersonScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
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
        <Stack.Screen
          name={RoutesName.PersonScreen}
          options={{ headerShown: false }}
          component={PersonScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
