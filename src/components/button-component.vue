<template>
  <div class="button-block">
    <button class="button" :type="type" @click="deleteItem">
      {{ nameButton }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["nameButton", "type"],
  emits: ["delete"],
  setup(_props, { attrs }) {
    const deleteItem = () => {
      attrs.delete();
    };
    return {
      deleteItem,
    };
  },
};
</script>

<style scoped lang="scss">
.button-block {
  margin: 0 30px;
  .button {
    height: 30px;
    width: 80px;
    background-color: blanchedalmond;
    color: blue;
  }
}
</style>
