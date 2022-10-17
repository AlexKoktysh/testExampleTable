<template>
  <div>
    <easy-data-table
      ref="dataTable"
      :headers="headers"
      :items="items"
      v-model:items-selected="itemsSelected"
      v-show="items.length"
      :search-value="searchValue"
      :rows-per-page="10"
    />
    <div v-show="!items.length">Идет получение данных</div>
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
    const currentPageLastIndex = computed(
      () => dataTable.value?.currentPageLastIndex
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
      () => currentPageLastIndex.value,
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
