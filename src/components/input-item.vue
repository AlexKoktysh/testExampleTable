<template>
  <input type="text" :value="name" @input="setName" />
</template>

<script>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  setup() {
    const v$ = useVuelidate();
    const name = ref("");
    const setName = (event) => {
      name.value = event.target.value.toLowerCase();
      v$.value.name.$touch();
      debugger;
    };
    return {
      setName,
      name,
    };
  },
  validations() {
    return {
      name: { required },
    };
  },
};
</script>

<style scoped></style>
