import React from 'react';
import {
  Animated,
  Easing,
} from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import TodayPage from './containers/Home/TodayPage';
import ScheduleScreen from './containers/Home/Schedule';
import RolesScreen from './containers/Details/RolesScreen';
import SongsScreen from './containers/Details/SongsScreen';
import UnavailablePeopleScreen from './containers/Details/UnavailablePeopleScreen';
import DetailsEditScreen from './containers/Details/DetailsEditPage';
import AddItemScreen from './containers/Details/AddItem';
import RescheduleScreen from './containers/Details/Rescheduler';

const TodayStack = createStackNavigator(
  {
    Home: TodayPage,
  },
  {
    headerMode: 'none',
  },
);

TodayStack.navigationOptions = () => ({
  gesturesEnabled: false,
});

const DetailsStack = createMaterialTopTabNavigator(
  {
    Roles: RolesScreen,
    Songs: SongsScreen,
    UnavailablePeople: UnavailablePeopleScreen,
  },
  {
    swipeEnabled: true,
    navigationOptions: {
      tabBarVisible: false,
      header: null,
    },
  },
);

const ScheduleStack = createStackNavigator(
  {
    Schedule: ScheduleScreen,
    Details: DetailsStack,
  },
  {
    cardStyle: { backgroundColor: 'transparent' },
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 400,
        timing: Animated.timing,
        useNativeDriver: true,
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

const MainStack = createStackNavigator(
  {
    ScheduleStack,
    DetailsEdit: DetailsEditScreen,
    Rescheduler: RescheduleScreen,
    AddItem: AddItemScreen,
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
    cardStyle: { backgroundColor: 'transparent', opacity: 1 },
    mode: 'modal',
    headerMode: 'none',
    // Disable transition (handling it in the component)
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
  },
);

const RootStack = createMaterialTopTabNavigator(
  {
    Home: TodayStack,
    Main: MainStack,
  },
  {
    initialRouteName: 'Main',
    swipeEnabled: true,
    navigationOptions: {
      tabBarVisible: false,
      header: null,
    },
  },
);

const App = () => (
  <RootStack />
);

export default App;
