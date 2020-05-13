import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    meta: {
      requiresAuth: false,
      admin: false,
    },
  },
  {
      path: "/login",
      name: "Login",
      component: () => import("../views/Admin/Login.vue"),
      meta: {
        requiresAuth: false,
        admin: true,
      },
    },
  // {
  //   path: "/admin/sessions/:sessionId/edit",
  //   name: "EditSession",
  //   props: true,
  //   component: () => import("../views/Admin/AddSession.vue"),
  //   meta: {
  //     requiresAuth: true,
  //     admin: true,
  //   },
  // },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requiresAuth) {
    // const token = localStorage.getItem("GSU_TOKEN");
    // if (token && token !== "undefined") {
    // }
    next();
  } else {
    next();
  }
});

export default router;
