<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ $t('message') }}</p>
    <VueTabs :tab-id.sync="tabId">
      <VueTab id="tab1" label="General">
        <div class="tab-content">Content 1</div>
      </VueTab>
      <VueTab id="tab2" label="Releases">
        <div class="tab-content">Content 2</div>
      </VueTab>
      <VueTab id="tab3" label="Stats">
        <div class="tab-content">Content 3</div>
      </VueTab>
    </VueTabs>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
