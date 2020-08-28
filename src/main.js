// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import '../src/common/scss/index.scss'

Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
