<template>
  <div class="button-block">
    <button
      class="button"
      :type="type"
      @click="deleteItem"
      :disabled="disabled"
      :class="{ disabled: disabled }"
    >
      {{ nameButton }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["nameButton", "type", "disabled"],
  emits: ["delete"],
  setup(props, { attrs }) {
    const deleteItem = () => {
      props.type === "delete" && attrs.delete();
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
    width: 120px;
    color: white;
    background-color: #1d90ff;
    border: none;
    border-radius: 20px;
  }
  .disabled {
    background-color: #bbc1c5;
  }
}
</style>
