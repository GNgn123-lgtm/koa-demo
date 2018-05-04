import Vue from 'vue'
import App from './App.vue'
Vue.config.devtools = true

export default function createApp() {
    return new Vue({
        render: h => h(App)
    })
};

