import {createApolloClient} from 'vue-cli-plugin-apollo/graphql-client'
// import {InMemoryCache} from 'apollo-cache-inmemory'

const AUTH_TOKEN = 'apollo-token'

// const httpEndpoint = runtimeArgs.VUE_APP_MDS_GRAPHQL_HTTP || 'http://localhost:4000/graphql'

const defaultOptions = {
  httpEndpoint,
  wsEndpoint: null,
  tokenName: AUTH_TOKEN,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
  httpLinkOptions: {
    includeExtensions: true,
    credentials: 'include',
  },
  // link: errorLink.concat(addDatesLink),
  // cache: new InMemoryCache({freezeResults: false}),
}

const {apolloClient} = createApolloClient({
  ...defaultOptions,
})

export default apolloClient
