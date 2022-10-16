<template>
  <div class="main-screen">
    <input-block class="input-block"></input-block>
    <table-component></table-component>
    <search-block class="search-block"></search-block>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    onMounted(async () => await store.dispatch("setItems"));
  },
};
</script>

<style scoped lang="scss">
.main-screen {
  .input-block {
    border: 2px solid red;
    height: 100px;
  }
  .search-block {
    border: 2px solid green;
    height: 100px;
  }
}
</style>
