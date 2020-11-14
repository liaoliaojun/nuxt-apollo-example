import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'

const apolloClients = {}

export function init (graphqlEndpoint) {
  if (!graphqlEndpoint) {
    return new Error('no find arguments of graphqlEndpoint')
  }
  const defaultClient = new ApolloClient({
    uri: graphqlEndpoint,
    fetch,
    // httpLinkOptions: {
    //   includeExtensions: true,
    //   credentials: 'include',
    // },
  })
  defaultClient.defaultOptions = {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    }
  }
  apolloClients.default = defaultClient
  apolloClients.defaultClient = defaultClient
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
