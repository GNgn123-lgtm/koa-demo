import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './route.js'
Vue.use(VueRouter)
const router = new VueRouter({
	mode: 'history',
	routes
})
new Vue({
    router,
    template: '<App />',
    components: { App }
}).$mount('#app')
