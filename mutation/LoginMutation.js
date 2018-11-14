import { commitMutation, graphql } from 'react-relay';
import env from '../helpers/Enviroment';

const mutation = graphql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        email
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


// import { graphql, commitMutation } from 'react-relay';
// import env from '../helpers/Enviroment';
//
// // Mutation Query
// const mutation = graphql`
//   mutation LoginMutation($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         name
//         email
//       }
//     }
//   }
// `;
//
// const login = (email, password) => {
//   const variables = { email, password };
//   return new Promise((resolve) => {
//     commitMutation(env, {
//       mutation,
//       variables,
//       onCompleted: (response) => {
//         console.log(response);
//         resolve(response.login);
//         console.warning('A new user has been added');
//       },
//       onError: () => console.error('An unexpected error occurred'),
//     });
//   });
// };
//
// export default login;
