import fetch from 'node-fetch'
import {ApolloClient, InMemoryCache, ApolloLink, HttpLink} from '@apollo/client/core'

const apolloClients = {}

export function init (graphqlEndpoint) {
  if (!graphqlEndpoint) {
    return new Error('no find arguments of graphqlEndpoint')
  }

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      new HttpLink({
        fetch,
        uri: graphqlEndpoint || '/graphql',
      }),
    ]),
    includeExtensions: true,
    credentials: 'include',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
      query: {
        fetchPolicy: 'network-only',
      },
    },
  })

  apolloClients.default = client
  apolloClients.defaultClient = client
  return apolloClients
}

export default function useApolloClient (arg) {
  if (!arg) {
    return apolloClients
  }
  if (typeof arg === 'string') {
    return apolloClients[arg]
  }
  if (typeof arg === 'object') {
    Object.assign(apolloClients, arg)
  }
}
