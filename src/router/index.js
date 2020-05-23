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
      admin: false,
    },
  },
  {
    path: "/events/:eventId",
    name: "EventDetail",
    props: true,
    component: () => import("../views/User/EventDetail.vue"),
    meta: {
      requiresAuth: false,
      admin: false,
    },
  },
  // Admin
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: () => import("../views/Admin/Dashboard.vue"),
    meta: {
      requiresAuth: true,
      admin: true,
    },
  },
  {
    path: "/admin/events",
    name: "AdminEvents",
    component: () => import("../views/Admin/Events.vue"),
    meta: {
      requiresAuth: true,
      admin: true,
    },
  },
  {
    path: "/admin/events/:eventId/view",
    name: "AdminEventDetail",
    props: true,
    component: () => import("../views/Admin/EventDetail.vue"),
    meta: {
      requiresAuth: true,
      admin: true,
    },
  },
  {
    path: "/admin/events/:eventId/edit",
    name: "AdminEventEdit",
    props: true,
    component: () => import("../views/Admin/EventAddEdit.vue"),
    meta: {
      requiresAuth: true,
      admin: true,
    },
  },
  {
    path: "/admin/publish-event",
    name: "PublishEvent",
    component: () => import("../views/Admin/EventAddEdit.vue"),
    meta: {
      requiresAuth: true,
      admin: true,
    },
  },
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
