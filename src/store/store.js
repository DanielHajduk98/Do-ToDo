import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from "vuexfire";

Vue.use(Vuex);

import auth from "./modules/auth.module"

export default new Vuex.Store({
  modules: {
    auth
  },
  mutations: {
    ...vuexfireMutations,
  },
});
