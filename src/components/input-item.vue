<template>
  <div class="input-item">
    <input
      :placeholder="placeholder"
      v-model.trim="inputValue"
      :class="{ invalid: invalid }"
      @blur="blur"
      class="item"
      v-imask="phoneNumberMask"
      @keypress="isNumber"
      @accept="onAccept"
      @complete="onComplete"
    />
    <small class="error-message" v-if="invalid">{{ error[0].$message }}</small>
  </div>
</template>

<script>
import { ref } from "vue";
import { IMaskDirective } from "vue-imask";
export default {
  props: {
    id: String,
    placeholder: String,
    invalid: Boolean,
    error: Object,
    phoneNumberMask: String,
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
  .item {
    height: 30px;
    width: 250px;
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
