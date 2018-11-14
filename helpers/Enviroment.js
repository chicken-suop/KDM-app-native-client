import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import graphQLEndpoint from './config';

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(operation, variables) {
  return fetch(graphQLEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Auth Headers goes here
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => response.json());
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());
const env = new Environment({ network, store });

export default env;
