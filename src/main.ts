import { createApp } from 'vue';
import App from './views/App.vue';
import router from './router';
import store from './store';

/**
 * Fontawesome icons
 */
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

/**
 * Bootstrap CSS, JS
 */

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

import './style.css'; //main css file

createApp(App).use(store).use(router).mount('#app');
