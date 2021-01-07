import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";

Vue.use(Vuex);

import auth from "./modules/auth.module";
import todo from "./modules/todo.module";

export default new Vuex.Store({
  modules: {
    auth,
    todo,
  },
  mutations: {
    ...vuexfireMutations,
  },
});
