/**
 * @flow
 * @relayHash fb7a8e40887c23fe088b4b3db1d56b98
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LoginMutationVariables = {|
  email: string,
  password: string,
|};
export type LoginMutationResponse = {|
  +login: ?{|
    +token: ?string,
    +user: ?{|
      +name: string,
      +email: string,
    |},
  |}
|};
export type LoginMutation = {|
  variables: LoginMutationVariables,
  response: LoginMutationResponse,
|};
*/


/*
mutation LoginMutation(
  $email: String!
  $password: String!
) {
  login(email: $email, password: $password) {
    token
    user {
      name
      email
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
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "email",
    "variableName": "email",
    "type": "String!"
  },
  {
    "kind": "Variable",
    "name": "password",
    "variableName": "password",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "token",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "LoginMutation",
  "id": null,
  "text": "mutation LoginMutation(\n  $email: String!\n  $password: String!\n) {\n  login(email: $email, password: $password) {\n    token\n    user {\n      name\n      email\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "LoginMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "login",
        "storageKey": null,
        "args": v1,
        "concreteType": "AuthPayload",
        "plural": false,
        "selections": [
          v2,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              v3,
              v4
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "LoginMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "login",
        "storageKey": null,
        "args": v1,
        "concreteType": "AuthPayload",
        "plural": false,
        "selections": [
          v2,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              v3,
              v4,
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
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0febce552546c4c5272122a41f595723';
module.exports = node;
