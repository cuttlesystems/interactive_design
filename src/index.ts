import { createApp } from 'vue'

import App from './App.vue'
import { devtools } from './devtools'

import './scss/main.scss'

const app = createApp(App)
app.use(devtools)
app.mount("#app")