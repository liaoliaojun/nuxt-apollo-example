import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'

const defaultClient = new ApolloClient({
  uri: 'https://api.liaoliaojun.com:3000/graphql',
  fetch,
  // httpLinkOptions: {
  //   includeExtensions: true,
  //   credentials: 'include',
  // },
})

const apolloClients = {
  default: defaultClient,
}

export default function useApolloClient (arg) {
  console.log(12132)
  if (!arg) {
    console.log(apolloClients)
    return apolloClients
  }
  if (typeof arg === 'string') {
    return apolloClients[arg]
  }
  if (typeof arg === 'object') {
    Object.assign(apolloClients, arg)
  }
}
