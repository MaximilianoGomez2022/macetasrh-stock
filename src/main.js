import './assets/estilos.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'animate.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
