import { createApp } from 'vue'
import './assets/tailwind.css'
//import './style.css'
import App from './App.vue'

import { MotionPlugin } from '@vueuse/motion'
import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'

const app = createApp(App)
app.use(MotionPlugin)
app.mount('#app')
