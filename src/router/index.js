import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/events",
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/events",
    name: "Events",
    component: () => import("../views/User/EventList.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/events/:eventId",
    name: "EventDetail",
    props: true,
    component: () => import("../views/User/EventDetail.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  // Admin
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: () => import("../views/Admin/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/events",
    name: "AdminEvents",
    component: () => import("../views/Admin/Events.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/events/:eventId/view",
    name: "AdminEventDetail",
    props: true,
    component: () => import("../views/Admin/EventDetail.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/events/:eventId/edit",
    name: "AdminEventEdit",
    props: true,
    component: () => import("../views/Admin/EventAddEdit.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/publish-event",
    name: "PublishEvent",
    component: () => import("../views/Admin/EventAddEdit.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requiresAuth) {
    const token = localStorage.getItem("BOOKIT_TOKEN");
    if (token && token !== "undefined") {
      let isLoggedIn = store.getters.isLoggedIn;
      if (isLoggedIn) next();
      else {
        localStorage.removeItem("BOOKIT_TOKEN");
        next("events");
      }
    } else {
      next("events");
    }
  } else {
    next();
  }
});

export default router;
