<template>
  <div class="home">
    <h1>从 @vue/cli-ui 中抽取 FolderExplorer</h1>
    <div class="row">
      <FolderExplorer class="explorer" />
      <div class="message">
        <h5>选中的数据:</h5>
        <pre>{{JSON.stringify(folderCurrent,null,1)}}</pre>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import FOLDER_CURRENT from "@/graphql/folder/folderCurrent.gql";

export default {
  name: "home",
  apollo: {
    folderCurrent: FOLDER_CURRENT
  }
};
</script>

<style lang="stylus" scoped>
.home {
  overflow: hidden;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
  }

  .row {
    flex: 1;
    display: flex;
    overflow: auto;
    padding: 0 2em;

    .explorer {
      flex: 1;
      padding-right: 1em;
    }

    .message {
      flex: 0 1 400px;
      overflow: auto;

      pre {
        font-size: 12px;
        font-family: monospace;
      }
    }
  }
}
</style>