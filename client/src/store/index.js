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
      console.log('User set:', user);
      console.log('IsLoggedIn:', state.isLoggedIn);
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      console.log('User logged out');
    },
    async reUser(state){
        console.log("reusercheck");
        const token = localStorage.getItem("token");
        const data = await axios.get("http://localhost:5000/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(data);
      
          const userData = data.data.user.email;
          state.user =userData
          state.isLoggedIn = !!userData;
          console.log(state.user);
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
