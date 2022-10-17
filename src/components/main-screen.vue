<template>
  <div class="main-screen">
    <input-block class="input-block"></input-block>
    <table-component :searchValue="searchValue"></table-component>
    <search-block
      class="search-block"
      :delete="deleteItems"
      :search="search"
    ></search-block>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const items = computed(() => store.getters.get_items);
    const selectItems = computed(() => store.state.selectItems);
    const searchValue = ref("");
    const getItems = async (items) => {
      !items?.length
        ? await store.dispatch("getItems")
        : await store.dispatch("getItemsInLocal");
    };
    onMounted(() => {
      getItems(items.value);
    });
    const deleteItems = async () => {
      await store.dispatch("deleteItem", selectItems.value);
      !store.state.items.length && setTimeout(getItems, 2000);
    };
    const search = (value) => {
      searchValue.value = value;
    };
    return {
      deleteItems,
      getItems,
      search,
      searchValue,
    };
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
