import { createStore } from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
  state() {
    return {
      invoices: [],
      isMobile: false,
      lightMode: true,
      showFormToggle: false
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
})

export default store;