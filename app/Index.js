import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import createRootNavigator from './router';
import { fetchSession } from './helpers/auth';
import { darkColor, nearlyWhiteColor } from './Styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
  }

  async componentDidMount() {
    try {
      const sessionInfo = await fetchSession();
      this.setState({ signedIn: Boolean(sessionInfo), checkedSignIn: true });
    } catch (e) {
      this.setState({ signedIn: false, checkedSignIn: true });
    }
  }

  render() {
    const { signedIn, checkedSignIn } = this.state;

    // Wait until we've checked AsyncStorage before we render
    if (!checkedSignIn) {
      // Display loading
      return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: darkColor }}>
          <ActivityIndicator size="small" color={nearlyWhiteColor} />
        </View>
      );
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}
