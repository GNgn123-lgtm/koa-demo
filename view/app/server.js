import Vue from 'vue'
import App from './App.vue'
Vue.config.devtools = true
import VueRouter from 'vue-router'
import routes from './route.js'
Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes
})

export default function createApp(path) {
    router.push(path)
    return new Vue({
        router,
        data() {
            return {
                title: 'value'
            }
        },
        render: h => h(App)
    })
};

