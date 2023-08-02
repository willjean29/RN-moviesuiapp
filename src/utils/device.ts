import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

const ios = Platform.OS === 'ios';
const android = Platform.OS === 'android';

export { width, height, ios, android };
