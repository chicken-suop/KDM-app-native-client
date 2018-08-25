import React from 'react';
import {
  Animated,
  Easing,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './components/screens/Home';
import DetailsScreen from './components/screens/Details';
import { secondaryColor, hexToRgbA } from './Styles';

// const transitionConfig = () => ({
//   transitionSpec: {
//     duration: 400,
//     easing: Easing.out(Easing.poly(4)),
//     timing: Animated.timing,
//     useNativeDriver: false,
//   },
//   screenInterpolator: (sceneProps) => {
//     const { position, scene } = sceneProps;
//     const thisSceneIndex = scene.index;
//     return {
//       backgroundColor: position.interpolate({
//         inputRange: [thisSceneIndex - 1, thisSceneIndex],
//         outputRange: [hexToRgbA(secondaryColor), 'rgba(33, 33, 33, )'],
//       }),
//     };
//   },
// });

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRootName: 'Home',
    navigationOptions: {
      header: null,
    },
  },
);

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    Details: DetailsScreen,
  },
  {
    cardStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      opacity: 1,
    },
    mode: 'modal',
    headerMode: 'none',
    // transitionConfig,
  },
);

const App = () => (
  <RootStack />
);

export default App;
