import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './http'
import './style/style.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.mixin({
  computed: {
    getUploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
