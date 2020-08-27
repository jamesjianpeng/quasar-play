import axios from 'axios'

export async function actionsTest ({ commit }, payload) {
  commit('mutationsTest', payload)
}

export function testApi ({ commit }, form) {
  return axios.get('/api/testMdb', form)
    .then(response => {
      console.log(response)
      // setAxiosHeaders(response.data.token)
    })
}

export function testPrdApi ({ commit }, form) {
  return axios.get('/prdApi/v1/get/config/tags', form)
    .then(response => {
      console.log(response)
      // setAxiosHeaders(response.data.token)
    })
}

export function setAxiosHeaders (token) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + token
}
