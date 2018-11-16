/**
 * @flow
 * @relayHash c3cf3dabf1d7a1692ba8950138ce7cb1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SignUpMutationVariables = {|
  email: string,
  password: string,
  fullName: string,
|};
export type SignUpMutationResponse = {|
  +signUp: ?{|
    +token: ?string,
    +user: ?{|
      +id: string
    |},
  |}
|};
export type SignUpMutation = {|
  variables: SignUpMutationVariables,
  response: SignUpMutationResponse,
|};
*/


/*
mutation SignUpMutation(
  $email: String!
  $password: String!
  $fullName: String!
) {
  signUp(email: $email, password: $password, name: $fullName) {
    token
    user {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "password",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "fullName",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "signUp",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email",
        "type": "String!"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "fullName",
        "type": "String!"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password",
        "type": "String!"
      }
    ],
    "concreteType": "AuthPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "token",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "SignUpMutation",
  "id": null,
  "text": "mutation SignUpMutation(\n  $email: String!\n  $password: String!\n  $fullName: String!\n) {\n  signUp(email: $email, password: $password, name: $fullName) {\n    token\n    user {\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SignUpMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "SignUpMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '56fd06dd11700022ce4e325fca8db734';
module.exports = node;
