import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage } from 'react-native';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import graphQLEndpoint from './config';
import Home from './Home';

export default class AppScreen extends React.Component {
  httpLink = new HttpLink({ uri: graphQLEndpoint });

  // Adding auth headers
  authMiddleware = new ApolloLink((operation, forward) => {
    AsyncStorage.getItem('@kdmApp:localSession').then((session) => {
      operation.setContext({
        headers: {
          authorization: session ? `Bearer ${session.token}` : null,
        },
      });
    });
    return forward(operation);
  });


  // Creating a client instance
  client = new ApolloClient({
    link: concat(this.authMiddleware, this.httpLink),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });

  static propTypes = {
    logoutCallback: PropTypes.func.isRequired,
    sessionInfo: PropTypes.shape({}).isRequired,
  };

  render() {
    const { logoutCallback, sessionInfo } = this.props;
    return (
      <ApolloProvider client={this.client}>
        <Home
          client={this.client}
          logoutCallback={logoutCallback}
          session={sessionInfo}
        />
      </ApolloProvider>
    );
  }
}
