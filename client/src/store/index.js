import { createStore } from 'vuex';
import axios from "axios"

export default createStore({
  state: {
    user: null,
    token:null,
    isLoggedIn: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isLoggedIn = !!user; 
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    
    },
    async reUser(state){
        const token = localStorage.getItem("token");
        const data = await axios.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
       if(data.data.user){
          const userData = data.data.user.email;
          state.user =userData
          state.isLoggedIn = !!userData;
    
        }
        },
    
  },
  actions: {
    loginUser({ commit }, { user }) {
      commit('setUser', user);
    },
    logoutUser({ commit }) {
        commit('logout');
  
    },
    reFetchUser({commit}){
        commit('reUser');
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    currentUser: state => state.user
  }
});
