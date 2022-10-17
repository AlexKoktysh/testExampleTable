<template>
  <div>
    <easy-data-table
      ref="dataTable"
      :headers="headers"
      :items="items"
      v-model:items-selected="itemsSelected"
      :search-value="searchValue"
      :rows-per-page="10"
      theme-color="#1d90ff"
      :loading="!items.length"
      table-class-name="customize-table"
      header-text-direction="center"
      body-text-direction="center"
    />
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  props: ["searchValue"],
  emits: [],
  setup() {
    const store = useStore();
    const headers = computed(() => store.state.headers);
    const items = computed(() => store.state.items);
    const selectItems = computed(() => store.state.selectItems);
    const itemsSelected = ref([]);
    const dataTable = ref();
    const clientItemsLength = computed(
      () => dataTable.value?.clientItemsLength
    );
    watch(
      () => itemsSelected.value,
      () => {
        store.dispatch("setSelectedItem", itemsSelected.value);
      },
      { deep: true }
    );
    watch(
      () => selectItems.value,
      (val) => (itemsSelected.value = val)
    );
    watch(
      () => clientItemsLength.value,
      (val) => store.dispatch("setSearchItemsCounter", val)
    );

    return {
      headers,
      items,
      itemsSelected,
      dataTable,
    };
  },
};
</script>

<style scoped lang="scss">
.customize-table {
  min-height: 600px;
  --easy-table-border: 1px solid #445269;
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #2d3a4f;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #4c5d7a;

  --easy-table-body-row-font-color: #c0c7d2;
  --easy-table-body-row-background-color: #2d3a4f;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: #eee;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #2d3a4f;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;

  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
