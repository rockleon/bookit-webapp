<template>
  <div class="loader-container">
    <v-progress-circular indeterminate size="50" color="secondary"></v-progress-circular>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: rgba(196, 195, 195, 0.7);
}
</style>