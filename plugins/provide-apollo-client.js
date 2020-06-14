import {provide} from '@vue/composition-api'
import {ApolloClients} from '@vue/apollo-composable'
import useApolloClient from '@/apollo/'

export default function apolloClient({app}, inject) {
  app.setup = () => {
    provide(ApolloClients, {
      default: useApolloClient().default,
      defaultClient: useApolloClient().default,
    })
  }
}