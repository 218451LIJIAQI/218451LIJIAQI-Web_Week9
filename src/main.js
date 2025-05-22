import Vue from 'vue'
import App from './App.vue'       // Root component
import router from './router'     // Vue Router setup
import axios from 'axios'         // HTTP client

// Import Bootstrap CSS and JS for styling and components
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

Vue.config.productionTip = false // Disable production tip in console

// Make axios available as this.$http in all components
Vue.prototype.$http = axios

// Create and mount Vue instance
new Vue({
  router,             // Register router
  render: h => h(App) // Render the App component
}).$mount('#app')     // Mount to element with id="app"
