import axios from 'axios'

export async function actionsTest ({ commit }, payload) {
  commit('mutationsTest', payload)
}

export function testApi ({ commit }, payload) {
  return axios.get('/api/testMdb', payload)
}

export function register ({ commit }, payload) {
  return axios.post('/api//auth/register', payload)
}

export function login ({ commit }, payload) {
  return axios.post('/api//auth/login', payload)
}
export function logout ({ commit }, payload) {
  return axios.post('/api//auth/logout', payload)
}

export function testPrdApi ({ commit }, payload) {
  return axios.get('/prdApi/v1/get/config/tags', payload)
}

export function setAxiosHeaders (token) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + token
}
