import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#510BD4",
        secondary: "#8ED40B",
        light: "#7D3EFF",
        dark: "#00009B",
        sec_light: "#C3FF52",
        sec_dark: "#59A200",
        background: "#F5F5F6",
        error: "#FD322B",
        info: "#3AA0F3",
        success: "#4ACB41",
        warning: "#FF9500"
      }
    }
  }
});
