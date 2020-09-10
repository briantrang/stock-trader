import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";

axios.defaults.baseURL = "https://vue-stock-trading-c1d4b.firebaseio.com/";

Vue.config.productionTip = false;
Vue.filter("currency", (value) => {
  return "$" + value.toLocaleString();
});

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
