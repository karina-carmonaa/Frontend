
import apiClient from '../service/api.js';

export default {
  namespaced: true,

  //son como las variables
  state: {
    authenticated: false,
    user: null
  },

  //sirven para poder cambiar los estados de las variables
  getters: {
    authenticated (state) {
      return state.authenticated
    },
    user (state) {
      return state.user
    },
  },

  //sirven para poder modificar el valor de los states (variables)
  mutations: {
    SET_AUTHENTICATED (state, value) {
      state.authenticated = value
    },
    SET_USER (state, value) {
      state.user = value
    }
  },

  actions: {
    //función asincrona
    async login ({ dispatch }, credentials) {      
      //espera a la respuesta de axios (apiclient) y cuando la tenga ejecuta la siguiente línea
      //antes de poder hacer el login hay que hacer una petición para poder generar el token de acceso 
      await apiClient.get('/sanctum/csrf-cookie')
      //una vez que lo tengamos, axios la envia por el header de la consulta de login, y le pasamos los datos 
      await apiClient.post('/login', credentials)
      return dispatch('me')
    },

    async logout ({ dispatch }) {
      await apiClient.post('/logout')
      return dispatch('me')
    },

    async registro({ dispatch },credentials){
      await apiClient.get('/sanctum/csrf-cookie') 
      await apiClient.post('/register', credentials)
      return dispatch('me')
    },

    me ({ commit }) {      
      return apiClient.get("/user").then((res) => {
        commit('SET_AUTHENTICATED', true)
        commit('SET_USER', res.data)
        this.user = res.data
        localStorage.setItem('id_cuenta',this.user.cuenta_id)
        localStorage.setItem('id_usuario',this.user.id)
      }).catch((err) => {
        console.log(err)
        commit('SET_AUTHENTICATED', false)
        commit('SET_USER', null) 
      })      
    }
  }
}