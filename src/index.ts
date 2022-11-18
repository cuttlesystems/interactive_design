import { createApp } from 'vue'

import App from './App.vue'
import store, { key } from './store'
import router from './router'

import { devtools } from './devtools'

import './scss/main.scss'

const app = createApp(App)
app.use(devtools)
app.use(router)
app.use(store, key )
app.mount("#app")
