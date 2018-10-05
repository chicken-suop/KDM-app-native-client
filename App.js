import React from 'react';
import {
  Animated,
  Easing,
} from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import HomeScreen from './containers/Home/HomeScreen';
import WeeksScreen from './containers/Home/Weeks';
import DetailsScreen from './containers/Details/DetailsScreen';
import DetailsEditScreen from './containers/Details/DetailsEditPage';
import AddItemScreen from './containers/Details/AddItem';
import ScheduleScreen from './containers/Details/Schedule';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    headerMode: 'none',
  },
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const { routeName } = navigation.state.routes[navigation.state.index];

  if (routeName === 'Home') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    gesturesEnabled: false,
    header: null,
  };
};

const WeeksStack = createStackNavigator(
  {
    Weeks: WeeksScreen,
    Details: DetailsScreen,
  },
  {
    cardStyle: { backgroundColor: 'transparent' },
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: () => ({
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
    }),
  },
);

WeeksStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const { routeName } = navigation.state.routes[navigation.state.index];

  if (routeName === 'Weeks' || routeName === 'Details') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    // gesturesEnabled: false,
    header: null,
  };
};

// const RootStack = createStackNavigator(
//   {
//     Main: MainStack,
//     DetailsEdit: DetailsEditScreen,
//     Schedule: ScheduleScreen,
//     AddItem: AddItemScreen,
//   },
//   {
//     navigationOptions: {
//       gesturesEnabled: false,
//       header: null,
//     },
//     cardStyle: { backgroundColor: 'transparent', opacity: 1 },
//     mode: 'modal',
//     headerMode: 'none',
//     // Disable transition (handling it in the component)
//     transitionConfig: () => ({
//       transitionSpec: {
//         duration: 0,
//         timing: Animated.timing,
//         easing: Easing.step0,
//       },
//     }),
//   },
// );

const RootStack = createMaterialTopTabNavigator(
  {
    Home: HomeStack,
    Weeks: WeeksStack,
  },
  {
    swipeEnabled: true,
  },
);

const App = () => (
  <RootStack />
);

export default App;
