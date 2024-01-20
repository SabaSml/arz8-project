import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUserSecret,
  faMoon,
  faSearch,
  faChevronDown,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faMoon, faSearch, faChevronDown, faArrowLeft)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

router.push({ path: '/home' })

app.mount('#app')