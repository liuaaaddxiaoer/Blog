// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
if (process.env.NODE_ENV == 'production') {
  window.console.log = function () {

  }
}


import App from './App'
import router from './router'
import './css/reset.less'
import './js/rem.js'
import axios from './js/http.js'
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// import 'mavon-editor/src/lib/css/markdown.css'
console.log(window["mavon-editor"])
Vue.use(window["mavon-editor"]);
Vue.prototype.http = axios
Vue.config.productionTip = true




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
