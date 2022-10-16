<template>
  <div>
    <h3>Hello World!</h3>
    <easy-data-table
      :headers="headers"
      :items="items"
      v-model:items-selected="itemsSelected"
    />
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const headers = computed(() => store.state.headers);
    const items = computed(() => store.state.items);
    const itemsSelected = ref([]);
    const getItems = async () => {
      await store.dispatch("getItems");
    };
    onMounted(() => {
      !items.value?.length && getItems();
    });
    watch(
      () => itemsSelected.value,
      () => {
        console.log(itemsSelected.value);
      },
      { deep: true }
    );

    return {
      headers,
      items,
      itemsSelected,
    };
  },
};
</script>
