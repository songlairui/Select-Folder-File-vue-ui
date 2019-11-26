import "./plugin";
import "./register-components";

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { createProvider } from "./vue-apollo";
import i18n from "./i18n";

import gql from "graphql-tag";

window.gql = gql;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  i18n,
  render: h => h(App)
}).$mount("#app");
