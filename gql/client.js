import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloLink } from '@apollo/client';
import { AUTH_TYPE } from "aws-appsync-auth-link/lib/auth-link";

const APPSYNC_ENDPOINT = 'http://localhost:62225/graphql'; // Replace with an actual AppSync endpoint.
const APPSYNC_KEY = '0123456789'; // Replace with X-Api-Key value for your AppSync endpoint.
const APPSYNC_REGION = 'us-west-2';

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      'x-api-key': APPSYNC_KEY
    }
  }
});

const subscriptionConfig = {
  url: APPSYNC_ENDPOINT,
  region: APPSYNC_REGION,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: APPSYNC_KEY
  }
};

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    createSubscriptionHandshakeLink(subscriptionConfig),
  ]),
  cache: new InMemoryCache()
});

export default client;