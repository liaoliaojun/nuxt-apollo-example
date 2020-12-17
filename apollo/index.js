import fetch from 'cross-fetch'
import {ApolloClient, InMemoryCache, ApolloLink, HttpLink} from '@apollo/client/core'
import {BatchHttpLink} from '@apollo/client/link/batch-http'
// @ts-ignore
import {createUploadLink} from 'apollo-upload-client'

const apolloClients = {}

export function init (graphqlEndpoint) {
  if (!graphqlEndpoint) {
    return new Error('no find arguments of graphqlEndpoint')
  }

  const httpOptions = {
    uri: graphqlEndpoint || '/graphql',
  }
  if (process.server) {
    // @ts-ignore
    httpOptions.fetch = fetch
  }
  const httpLink = ApolloLink.split(
    operation => operation.getContext().hasUpload,
    // graphql-upload related https://dev.to/marvinrabe/file-upload-with-vue-apollo-client-and-graphql-5emb
    createUploadLink({...httpOptions}),
    new BatchHttpLink({...httpOptions}),
  )

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      new HttpLink({...httpOptions}),
    ]),
    // @ts-ignore
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

  const uploadClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      httpLink,
    ]),
    // @ts-ignore
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
  apolloClients.uploadClient = uploadClient
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
