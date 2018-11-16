import { commitMutation, graphql } from 'react-relay';
import env from '../helpers/Enviroment';

const mutation = graphql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const commit = ({
  email,
  password,
  onCompleted,
  onError,
}) => {
  const variables = { email, password };
  return commitMutation(env, {
    mutation,
    variables,
    onCompleted,
    onError,
  });
};

export default { commit };
