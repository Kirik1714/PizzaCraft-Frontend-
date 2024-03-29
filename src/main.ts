import './assets/main.scss'
import './assets/reset.css'
import 'primeicons/primeicons.css'


import 'primevue/resources/themes/aura-light-blue/theme.css'


import PrimeVue from 'primevue/config';


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App) 

app.use(PrimeVue);
app.use(createPinia())
app.use(router)

app.mount('#app')