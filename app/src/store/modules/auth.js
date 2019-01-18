import api from "../../api";

import * as types from "../mutation-types";

const state = {
  loggedInUser: {},
  isAuthenticated: false,
  id:null,
  username:null
}
const getters = {
  isAuthenticated: state => {
    return state.isAuthenticated;
  }
}

const actions =  {
  onLogin ({commit}, user) {
    commit(types.SET_IS_AUTHENTICATED, true);
    commit(types.SET_LOGGED_IN_USER, user);
  
  },
  fetchUser ({commit}) {
    return api.fetchUser()
      .then(data => {
        console.log(data, 'this');
        commit(types.SET_IS_AUTHENTICATED, true);
        commit(types.SET_LOGGED_IN_USER, data);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          commit(types.SET_IS_AUTHENTICATED, false);
        } else {
          commit(types.SET_IS_AUTHENTICATED, false);
        }
      });
  },

  onLogout ({commit}) {
    commit(types.SET_IS_AUTHENTICATED, false);
    commit(types.RESET_LOGGED_IN_USER);
  }
}

const mutations = {
  [types.SET_LOGGED_IN_USER](state, user) {
    state.loggedInUser = user;
    state.id = user.id;
    state.username = user.username;
  },
  [types.RESET_LOGGED_IN_USER](state) {
    state.loggedInUser = {};
    state.id = null;
    state.username = null;
  },
  [types.SET_IS_AUTHENTICATED](state, payload) {
    state.isAuthenticated = payload;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
