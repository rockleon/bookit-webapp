<template>
  <div id="app">
    <v-app>
      <v-content>
        <div v-if="$route.meta.requiresAuth" class="app-content">
          <top-bar class="top-bar" />
          <div class="router-content">
            <side-bar class="side-bar" />
            <router-view></router-view>
          </div>
        </div>
        <div v-else class="app-content">
          <top-bar class="top-bar" />
          <div class="router-content">
            <router-view></router-view>
          </div>
        </div>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";

export default {
  name: "App",
  components: { TopBar, SideBar }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--v-background-base);
  /* background-color: white; */
  color: var(--v-text-base);
}

html {
  overflow: hidden !important;
}

.app-content {
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
}

.top-bar {
  height: 80px;
  width: 100%;
}

.side-bar {
  position: absolute;
  top: 0px;
  height: 100%;
  width: 100%;
}

.router-content {
  position: relative;
  height: calc(100vh - 80px);
  overflow-y: auto;
  display: flex;
  flex-direction: row;
}

.table-header {
  font-size: 16px !important;
}

.vdatetime-input {
  width: 100%;
  border-radius: 4px;
  padding: 12px 12px;
  margin-bottom: 8px;
  background-color: white !important;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.quillWrapper {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

p {
  margin-bottom: 0px !important;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #c2c9d2;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #bdbdbd;
  font-weight: 300 !important;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #bdbdbd;
  font-weight: 300 !important;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #bdbdbd;
  font-weight: 300 !important;
}
</style>
