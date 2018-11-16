/**
 * @flow
 * @relayHash 328d1cf5eb5d93f28cd0b3eabc09b53d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EventOrderByInput = "createdAt_ASC" | "createdAt_DESC" | "end_ASC" | "end_DESC" | "id_ASC" | "id_DESC" | "name_ASC" | "name_DESC" | "start_ASC" | "start_DESC" | "updatedAt_ASC" | "updatedAt_DESC" | "%future added value";
export type FeedQueryVariables = {|
  filter?: ?string,
  skip?: ?number,
  first?: ?number,
  orderBy?: ?EventOrderByInput,
|};
export type FeedQueryResponse = {|
  +feed: {|
    +events: $ReadOnlyArray<{|
      +id: string,
      +name: string,
    |}>
  |}
|};
export type FeedQuery = {|
  variables: FeedQueryVariables,
  response: FeedQueryResponse,
|};
*/


/*
query FeedQuery(
  $filter: String
  $skip: Int
  $first: Int
  $orderBy: EventOrderByInput
) {
  feed(filter: $filter, skip: $skip, first: $first, orderBy: $orderBy) {
    events {
      id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "filter",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "skip",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "orderBy",
    "type": "EventOrderByInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "feed",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filter",
        "variableName": "filter",
        "type": "String"
      },
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "first",
        "type": "Int"
      },
      {
        "kind": "Variable",
        "name": "orderBy",
        "variableName": "orderBy",
        "type": "EventOrderByInput"
      },
      {
        "kind": "Variable",
        "name": "skip",
        "variableName": "skip",
        "type": "Int"
      }
    ],
    "concreteType": "Feed",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "events",
        "storageKey": null,
        "args": null,
        "concreteType": "Event",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
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
  "operationKind": "query",
  "name": "FeedQuery",
  "id": null,
  "text": "query FeedQuery(\n  $filter: String\n  $skip: Int\n  $first: Int\n  $orderBy: EventOrderByInput\n) {\n  feed(filter: $filter, skip: $skip, first: $first, orderBy: $orderBy) {\n    events {\n      id\n      name\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "FeedQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "FeedQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a30ecedaaf1ac032ceaef013522a8fc0';
module.exports = node;
