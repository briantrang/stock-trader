import Vue from "vue";
import Vuex from "vuex";
import { createStore } from "vuex-extensions";
import stocks from "./modules/stocks";
import portfolio from "./modules/portfolio";
import auth from "./modules/auth";
import * as actions from "./actions";

Vue.use(Vuex);

export default createStore(Vuex.Store, {
  actions,
  modules: {
    stocks,
    portfolio,
    auth,
  },
});
