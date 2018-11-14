import React from 'react';
import { AsyncStorage } from 'react-native';
import Home from './Home';
import { storeSession, fetchSession } from './helpers/actions';
import AuthHome from './containers/Auth/AuthHome';

export default class Index extends React.Component {
  state = {
    sessionInfo: {},
  }

  async componentWillMount() {
    try {
      const sessionInfo = await fetchSession();
      if (sessionInfo) {
        this.setState({ isLoggedIn: true, sessionInfo });
      } else {
        this.setState({ isLoggedIn: false });
      }
    } catch (e) {
      this.setState({ isLoggedIn: false });
    }
  }

  completeLogin = (sessionInfo) => {
    this.setState({ isLoggedIn: true, sessionInfo });
    storeSession(sessionInfo);
  }

  logout = async () => {
    await AsyncStorage.removeItem('@kdmApp:localSession');
    this.setState({ isLoggedIn: false, sessionInfo: null });
  }

  render() {
    const { isLoggedIn, sessionInfo } = this.state;
    if (isLoggedIn === false) {
      return (
        <AuthHome loginCallback={this.completeLogin} />
      );
    }
    return (
      <Home
        logoutCallback={this.logout}
        sessionInfo={sessionInfo}
      />
    );
  }
}
