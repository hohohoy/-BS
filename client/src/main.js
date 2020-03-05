import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './theme/index.css'
import $ from 'jquery'
import { Happyscroll } from 'vue-happy-scroll'
Vue.component('happy-scroll', Happyscroll)
import 'vue-happy-scroll/docs/happy-scroll.css'
import SlideVerify from '../src/views/loginRegister/index.js'
Vue.use(SlideVerify)
    // import 'bootstrap/dist/css/bootstrap.min.css'
    // import 'bootstrap/dist/js/bootstrap.min.js'

Vue.prototype.$ = $;
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')