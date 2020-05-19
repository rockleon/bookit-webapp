"use strict";

import Vue from "vue";
import axios from "axios";

let config = {
  baseURL: process.env.VUE_APP_BASE_URL || "",
  timeout: 60 * 1000, // Timeout
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const token = localStorage.getItem("GSU_TOKEN");
    if (token && token !== "undefined")
      config.headers["Authorization"] = "Token " + token;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// create axios plugin
Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export { _axios as axios };
