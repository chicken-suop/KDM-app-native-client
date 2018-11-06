import React from 'react';
import { Image, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import Home from './Home';
import graphQLEndpoint from './config';
import { storeSession, fetchSession } from './helpers/actions';
import AuthHome from './containers/Auth/AuthHome';

export default class Index extends React.Component {
  httpLink = new HttpLink({ uri: graphQLEndpoint });

  // Adding auth headers
  authMiddleware = new ApolloLink(async (operation, forward) => {
    const sessionInfo = await fetchSession();
    operation.setContext({
      headers: {
        authorization: sessionInfo ? `Bearer ${sessionInfo.token}` : null,
      },
    });
    return forward(operation);
  });

  // Creating a client instance
  client = new ApolloClient({
    link: this.authMiddleware.concat(this.httpLink),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });

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
      console.log(e);
      this.setState({ isLoggedIn: false });
    }
  }

  completeLogin = (sessionInfo) => {
    this.setState({ isLoggedIn: true, sessionInfo });
    storeSession(sessionInfo);
  }

  logout = async () => {
    await AsyncStorage.removeItem('@kdmApp:localSession');
    this.setState(
      { isLoggedIn: false, sessionInfo: null },
      this.client.resetStore,
    );
  }

  render() {
    const { isLoggedIn, sessionInfo } = this.state;
    // if (isLoggedIn === true) {
    //   return (
    //     <ApolloProvider client={this.client}>
    //       <Home
    //         logoutCallback={this.logout}
    //         sessionInfo={sessionInfo}
    //       />
    //     </ApolloProvider>
    //   );
    // } if (isLoggedIn === false) {
    //   return (
    //     <ApolloProvider client={this.client}>
    //       <AuthHome loginCallback={this.completeLogin} />
    //     </ApolloProvider>
    //   );
    // }

    return (
      <ApolloProvider client={this.client}>
        <Home
          logoutCallback={this.logout}
          sessionInfo={sessionInfo}
        />
      </ApolloProvider>
    );
  }
}
