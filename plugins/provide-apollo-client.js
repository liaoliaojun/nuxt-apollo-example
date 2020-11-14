import {provide} from '@vue/composition-api'
import {ApolloClients} from '@vue/apollo-composable'
import useApolloClient, {init} from '@/apollo/'

export default function apolloClient({app, $config}) {
  init($config.graphqlEndpoint)

  app.setup = () => {
    provide(ApolloClients, {
      default: useApolloClient().default,
      defaultClient: useApolloClient().default,
    })
  }
}