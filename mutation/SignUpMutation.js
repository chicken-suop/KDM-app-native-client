import { commitMutation, graphql } from 'react-relay';
import env from '../helpers/Enviroment';

const mutation = graphql`
  mutation SignUpMutation($email: String!, $password: String!, $fullName: String!) {
    signUp(email: $email, password: $password, name: $fullName) {
      token
    }
  }
`;

const commit = ({
  email,
  password,
  fullName,
  onCompleted,
  onError,
}) => {
  const variables = { email, password, fullName };
  return commitMutation(env, {
    mutation,
    variables,
    onCompleted,
    onError,
  });
};

export default { commit };
