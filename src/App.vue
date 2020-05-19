<template>
  <div id="app">
    <v-app>
      <v-content>
        <div class="app-content">
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

export default {
  name: "App",
  components: { TopBar }
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

.router-content {
  height: calc(100vh - 80px);
  overflow-y: auto;
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
</style>
