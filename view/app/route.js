import Foo from './modules/foo.vue'
import Baz from './modules/baz.vue'

export default [
    { path: '/', component: Foo },
    { path: '/foo', component: Foo },
    { path: '/baz', component: Baz },
]
