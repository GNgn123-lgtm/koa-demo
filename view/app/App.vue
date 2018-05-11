<template>
    <div id="app">
        lalal1111222334455
        <p>
            <router-link to="/foo">Go to Foo</router-link>
            <router-link to="/baz">Go to Baz</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>

<script>
    import base from './base.css'
    
    export default {
        data() {
            return {
                title: '测试'
            }
        },
    }
</script>

<style>
@import './base2.css';
</style>