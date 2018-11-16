import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { QueryRenderer, graphql } from 'react-relay';
import propTypes from 'prop-types';
import env from '../helpers/Enviroment';
import ErrorView from './ErrorView';

const SimpleRender = ({ events }) => (
  <View>
    {events.map(elem => (
      <Text>
        {`Name: ${elem.name}`}
      </Text>
    ))}
  </View>
);

SimpleRender.propTypes = {
  events: propTypes.arrayOf({
    id: propTypes.string,
    name: propTypes.string,
  }).isRequired,
};

// creating the params for the user
const variables = {
  filter: '',
  skip: 0,
  first: 0,
};

const query = graphql`
  query FeedQuery($filter: String, $skip: Int, $first: Int, $orderBy: EventOrderByInput) {
    feed(filter: $filter, skip: $skip, first: $first, orderBy: $orderBy) {
      events {
        id
        name
      }
    }
  }
`;

export default () => (
  <QueryRenderer
    environment={env}
    // variables={variables} // The params/variables
    query={query} // Your GraphQL query
    render={({ error, props }) => {
      if (error) {
        // In case of query errors or fetch failture
        return <ErrorView error={error} />;
      } if (props) {
        // Component to render
        return <SimpleRender {...props} />;
      }
      // Activity indicator or loading view
      return <ActivityIndicator />;
    }}
  />
);
