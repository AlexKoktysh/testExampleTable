<template>
  <div class="button-block">
    <button class="button" :type="type">{{ nameButton }}</button>
  </div>
</template>

<script>
export default {
  props: {
    nameButton: String,
    type: String,
  },
  setup() {},
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
