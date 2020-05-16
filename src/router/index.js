import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/db/auth";

import Registration from "../components/Registration.vue";
import Login from "../components/Login.vue";
import ListEvents from "../components/ListEvents.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: ListEvents,
    meta: {
      protected: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/events",
    name: "ListEvents",
    component: ListEvents,
    meta: {
      protected: true,
    },
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.protected)) {
    if (!auth.getToken()) {
      next({ name: "Login", query: { redirect: from.path }});
    } else {
      next();
    }
  } else {
    next();
  }
  if (to.matched.some((route) => route.meta.staff)) {
    if (!auth.getToken()) {
      next({ name: "Login" });
    } else {
      if (!auth.isStaff()) {
        next({ name: "Home" });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
