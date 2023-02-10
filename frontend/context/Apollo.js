import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { onError } from "@apollo/client/link/error";

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const API_URL =
  process.env.NEXT_PUBLIC_API_GRAPHQL_URL || "http://localhost:1337/graphql";

const defaultOptions = {
  watchQuery: {
    // fetchPolicy: "cache-and-network",
    fetchPolicy: "cache-first",
    errorPolicy: "all",
  },
  query: {
    // fetchPolicy: "network-only",
    fetchPolicy: "cache-first",
    // fetchPolicy: "cache-and-network", //The cache-and-network fetchPolicy does not work with client.query
    errorPolicy: "all",
  },
};

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // authorization: userToken ? `Bearer ${userToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client;
