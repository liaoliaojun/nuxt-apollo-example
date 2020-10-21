// import {provide} from '@vue/composition-api'
import {ApolloClients} from '@vue/apollo-composable'
import useApolloClient from '@/apollo/index.js'

export default function apolloClient({app}, inject) {
  console.log(222)
  console.log(useApolloClient)
  // app.setup = () => {
  //   provide(ApolloClients, {
  //     default: useApolloClient().default,
  //     defaultClient: useApolloClient().default,
  //   })
  // }
}
