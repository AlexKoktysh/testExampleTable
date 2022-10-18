<template>
  <div :style="customStyle" class="input-item">
    <input
      :placeholder="placeholder"
      v-model.trim="inputValue"
      :class="{ invalid: invalid, icon: icon }"
      @blur="blur"
      class="item"
      v-imask="phoneNumberMask"
      @keypress="isNumber"
      @accept="onAccept"
      @complete="onComplete"
    />
    <small class="error-message" v-if="error && error.length">{{
      error[0].$message
    }}</small>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { IMaskDirective } from "vue-imask";
export default {
  props: {
    id: String,
    placeholder: String,
    invalid: Boolean,
    error: Array,
    phoneNumberMask: Object,
    clearField: Boolean,
    customStyle: String,
    icon: Boolean,
  },
  setup(props, { emit }) {
    const inputValue = ref("");
    const blur = () => {
      emit("blurInput", props.id, inputValue.value);
    };
    const onAccept = (e) => {
      if (props.phoneNumberMask) {
        const maskRef = e.detail;
        inputValue.value = maskRef.value;
      }
    };
    const onComplete = (e) => {
      if (props.phoneNumberMask) {
        const maskRef = e.detail;
        inputValue.value = maskRef.unmaskedValue;
      }
    };
    const isNumber = (e) => {
      if (props.phoneNumberMask) {
        let regex = /[0-9]/;

        if (!regex.test(e.key)) {
          e.returnValue = false;
          if (e.preventDefault) e.preventDefault();
        }
      }
    };
    watch(
      () => inputValue.value,
      () => props.id === "search" && blur()
    );
    watch(
      () => props.clearField.value,
      (val) => {
        val;
        debugger;
      }
    );
    return {
      inputValue,
      blur,
      isNumber,
      onComplete,
      onAccept,
    };
  },
  directives: { imask: IMaskDirective, lazy: true },
};
</script>

<style scoped lang="scss">
.input-item {
  margin: 0 30px;
  display: flex;
  flex-direction: column;
  .icon {
    background-image: url("../image/icon.png");
    background-repeat: no-repeat;
    background-position: 4px;
    background-size: 8%;
    width: 210px !important;
    padding-left: 30px !important;
  }
  .item {
    height: 30px;
    width: 250px;
    border: 1px solid rgb(194, 190, 190);
    padding-left: 10px;
  }
  .invalid {
    border: 2px solid red;
  }
  .error-message {
    width: 250px;
    margin-top: 8px;
    color: red;
  }
}
</style>
