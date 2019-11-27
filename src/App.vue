<template>
  <div id="app">
    <router-view />
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<style lang="stylus">
@import '~@vue/ui/dist/vue-ui.css';
@import '~@/style/main';

html, body {
  height: 100%;
}
</style>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#app > div {
  flex: 1;
}
#app > div#nav {
  flex: 0;
  text-align: center;
}
</style>
