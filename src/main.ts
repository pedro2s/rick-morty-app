import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// Quasar
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

// Apollo Client
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

// GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
})

// Apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// Apollo provider
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
})

const app = createApp(App)

app.use(router)
app.use(Quasar, {
  plugins: {}, // import Quasar plugins se necesario
  config: {
    brand: {
      primary: '#1976D2',
      secondary: '26A69A',
      accent: '#9C27B0',
      dark: '#1D1D1D',
      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  }
})

app.use(apolloProvider)
app.mount('#app')
