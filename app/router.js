import {
  createStackNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import AuthHome from './containers/Auth/AuthHome';
import Schedule from './containers/Home/Schedule';
// import Today from './containers/Home/TodayPage';

const SignedOut = createStackNavigator(
  {
    AuthHome,
  },
  {
    navigationOptions: { header: null },
  },
);

// const Home = createStackNavigator(
//   { Today },
//   {
//     headerMode: 'none',
//   },
// );
//
// Home.navigationOptions = () => ({
//   gesturesEnabled: false,
// });

const SignedIn = createMaterialTopTabNavigator(
  {
    // Home,
    Schedule,
  },
  {
    initialRouteName: 'Schedule',
    swipeEnabled: true,
    navigationOptions: {
      tabBarVisible: false,
      header: null,
    },
  },
);

export default (signedIn = false) => createSwitchNavigator(
  { SignedIn, SignedOut },
  { initialRouteName: signedIn ? 'SignedIn' : 'SignedOut' },
);
