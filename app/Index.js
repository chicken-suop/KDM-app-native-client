import React from 'react';
import { AsyncStorage } from 'react-native';
import Home from './Home';
import { storeSession, fetchSession } from './helpers/actions';
import AuthHome from './containers/Auth/AuthHome';

export default class Index extends React.Component {
  state = {
    sessionInfo: {},
    isSignedIn: false,
  }

  async componentWillMount() {
    try {
      const sessionInfo = await fetchSession();
      if (sessionInfo) {
        this.setState({ isSignedIn: true, sessionInfo });
      } else {
        this.setState({ isSignedIn: false });
      }
    } catch (e) {
      this.setState({ isSignedIn: false });
    }
  }

  completeSignIn = (sessionInfo) => {
    this.setState({ isSignedIn: true, sessionInfo });
    storeSession(sessionInfo);
  }

  signOut = async () => {
    await AsyncStorage.removeItem('@kdmApp:localSession');
    this.setState({ isSignedIn: false, sessionInfo: null });
  }

  render() {
    const { isSignedIn, sessionInfo } = this.state;
    if (isSignedIn === false) {
      return (
        <AuthHome signInCallback={this.completeSignIn} />
      );
    }
    return (
      <Home
        signOutCallback={this.signOut}
        sessionInfo={sessionInfo}
      />
    );
  }
}
