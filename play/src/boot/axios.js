import Vue from 'vue'
import axios from 'axios'
axios.interceptors.response.use(response => {
  // 对响应数据做些什么
  return response.data
}, err => {
  // 对响应错误做些什么
  console.log('err', err)
  return Promise.reject(err)
})

Vue.prototype.$axios = axios
