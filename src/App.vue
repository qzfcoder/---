<template>
  <div class="app">
    <!-- v-model='state' 等同于 ：modelValue=“state” @update：modelValue=“xxxx” -->
    <Editor v-model="state"></Editor>
  </div>
</template>

<script>
import data from "./data";
import { ref, provide} from "vue";
import Editor from "./packages/editor.jsx";
import { registerConfig as config } from "./utils/editor-config.jsx";
export default {
  name: "App",
  components: {
    Editor,
  },
  setup() {
    const state = ref(data);
    provide("config", config);
    return {
      state,
    };
  },
};
</script>

<style lang="scss">
.app {
  position: fixed;
  top: 20px;
  bottom: 20px;
  right: 20px;
  left: 20px;
}
</style>
