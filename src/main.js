import Vue from "nativescript-vue";
import App from "./components/App";
import VueDevtools from "nativescript-vue-devtools";
import { firebase } from "@nativescript/firebase";
import Vuelidate from "vuelidate";
import routes from "./routes/routes";

Vue.registerElement(
  "Fab",
  () => require("@nstudio/nativescript-floatingactionbutton").Fab
);

Vue.use(Vuelidate);

firebase.init({}).then(
  function () {
    store.dispatch("test");
    console.log("firebase.init done");
  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
);

if (TNS_ENV !== "production") {
  Vue.use(VueDevtools);
}
import store from "./store/store";

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === "production";

Vue.registerElement(
  "RadSideDrawer",
  () => require("nativescript-ui-sidedrawer").RadSideDrawer
);

Vue.prototype.$routes = routes;
Vue.prototype.$title = "Do-ToDo";
// Vue.config.silent = true;

new Vue({
  store,
  render: (h) => h("frame", [h(App)]),
}).$start();
