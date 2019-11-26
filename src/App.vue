<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/project/select">Project Select</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="stylus">
@import '~@vue/ui/dist/vue-ui.css';
@import '~@/style/main';
</style>

<style lang="stylus" scoped>
.app {
  display: flex;
  flex-direction: column;
}

.connection-status, .status-bar {
  flex: auto 0 0;
}

.content {
  flex: auto 1 1;
  height: 100%;
  overflow: hidden;
}

.app-init-loading {
  z-index: 100000;
}
</style>
