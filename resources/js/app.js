/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import { Form, HasError, AlertError } from 'vform';
import swal from 'sweetalert2';
window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirnButton: false,
    timer: 3000

});

window.toast = toast;
window.Vue = require('vue');
window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
    /**
     * The following block of code may be used to automatically register your
     * Vue components. It will recursively scan this directory for the Vue
     * components and automatically register them with their "basename".
     *
     * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
     */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('welcome-component', require('./components/IndexComponent.vue').default);
Vue.component('login-component', require('./components/LoginComponent.vue').default);
Vue.component('register-component', require('./components/RegisterComponent.vue').default);
Vue.component('livescore-component', require('./components/LivescoreComponent.vue').default);
Vue.component('fixtures-component', require('./components/FixturesComponent.vue').default);
Vue.component('league-component', require('./components/LeagueComponent.vue').default);
Vue.component('leagueid-component', require('./components/LeagueIndexComponent.vue').default);
Vue.component('home-component', require('./components/HomeComponent.vue').default);
Vue.component('admin-component', require('./components/AdminComponent.vue').default);
Vue.component('user-component', require('./components/UserComponent.vue').default);
Vue.component('prediction-component', require('./components/PredictionComponent.vue').default);
Vue.component('top-component', require('./components/TopComponent.vue').default);
Vue.component('single-component', require('./components/SingleComponent.vue').default);
Vue.component('all-component', require('./components/AllComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});