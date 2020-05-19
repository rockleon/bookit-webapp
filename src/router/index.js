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
    path: "/events",
    name: "Events",
    component: () => import("../views/User/EventList.vue"),
    meta: {
      requiresAuth: false,
      admin: true,
    },
  },
  {
    path: "/events/:eventId",
    name: "EventDetail",
    props: true,
    component: () => import("../views/User/EventDetail.vue"),
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
