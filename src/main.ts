import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Quasar
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import iconSet from 'quasar/icon-set/mdi-v7.js'
import '@quasar/extras/mdi-v7/mdi-v7.css'

// Apollo Client
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

// GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
})

// Apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)

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
      warning: '#F2C037',
    },
  },
  iconSet: iconSet,
})

app.mount('#app')
