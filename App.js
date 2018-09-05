import React from 'react';
import {
  Animated,
  Easing,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './containers/Home/HomeScreen';
import DetailsScreen from './containers/Details/DetailsScreen';

const rootTransitionConfig = () => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: ({ position, scene }) => ({
    zIndex: scene.index === 1 ? 0 : 1,
    position: 'absolute',
    opacity: scene.index === 1 ? 1 : position.interpolate({
      inputRange: [0, 0.6],
      outputRange: [1, 0],
    }),
    transform: [{
      scale: scene.index === 1 ? 1 : position.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.6],
      }),
    }],
  }),
});

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRootName: 'Home',
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
    cardStyle: { backgroundColor: 'transparent' },
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: rootTransitionConfig,
  },
);

const App = () => (
  <RootStack />
);

export default App;
