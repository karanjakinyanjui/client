import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Registration from "../components/Registration.vue";
import Login from "../components/Login.vue";
import auth from "@/db/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
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
      next({ name: "Login" });
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
        next({ name: "Forbidden" });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
