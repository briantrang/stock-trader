import Vue from "vue";
import VueRouter from "vue-router";
import auth from "../store/modules/auth";

Vue.use(VueRouter);

//Guard the home(dashboard), stocks and portoflio routes until
//the user signs up or logs in.
//Default page for new users should be a
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Home.vue"),

    beforeEnter: (to, from, next) => {
      setTimeout(() => {
        if (auth.state.idToken) {
          next();
        } else {
          console.log("store idtoken: " + auth.state.idToken);
          next("/signin");
        }
      }, 130);
    },
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: () => import("../components/portfolio/Portfolio.vue"),
    beforeEnter: (to, from, next) => {
      setTimeout(() => {
        if (auth.state.idToken) {
          next();
        } else {
          console.log("store idtoken: " + auth.state.idToken);
          next("/signin");
        }
      }, 130);
    },
  },
  {
    path: "/stocks",
    name: "Stocks",
    component: () => import("../components/stocks/Stocks.vue"),
    beforeEnter: (to, from, next) => {
      setTimeout(() => {
        if (auth.state.idToken) {
          next();
        } else {
          console.log("store idtoken: " + auth.state.idToken);
          next("/signin");
        }
      }, 130);
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../components/auth/SignUp.vue"),
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../components/auth/SignIn.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
