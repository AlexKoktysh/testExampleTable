<template>
  <div class="bottom-block">
    <button-component
      nameButton="DELETE"
      type="delete"
      :delete="deleteItem"
      :disabled="!selectItems"
    ></button-component>
    <div class="search">
      <input-item
        :icon="true"
        id="search"
        @blurInput="blurInput"
        placeholder="Search"
        :invalid="false"
      />
      <div>users count: {{ searchCounter }}</div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["selectItems"],
  emits: ["delete", "search"],
  setup(_props, { attrs }) {
    const store = useStore();
    const searchCounter = computed(() => store.state.searchItemsCounter);
    const deleteItem = () => {
      attrs.delete();
    };
    const blurInput = (_type, value) => {
      attrs.search(value);
    };
    return {
      deleteItem,
      blurInput,
      searchCounter,
    };
  },
};
</script>

<style scoped lang="scss">
.bottom-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .search {
    display: flex;
    align-items: center;
    margin-right: 60px;
  }
}
</style>
