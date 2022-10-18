<template>
  <form class="form-control" @submit.prevent="submit">
    <div class="input-block">
      <div v-for="(item, index) in inputItem" :key="index">
        <input-item
          :id="item.id"
          :placeholder="item.placeholder"
          @blurInput="blurInput"
          :error="v$.params[item.id].$errors"
          customStyle="margin-bottom: 20px"
          :phoneNumberMask="item.mask"
          @reset="reset"
        />
      </div>
    </div>
    <button-component
      :disabled="!validForm"
      type="submit"
      nameButton="ADD"
    ></button-component>
  </form>
</template>

<script>
import { computed, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { useStore } from "vuex";
import minLength from "../helpers/minLength";
export default {
  props: {
    inputType: String,
  },
  setup() {
    const store = useStore();
    const v$ = useVuelidate();
    const inputItem = [
      {
        id: "fullName",
        placeholder: "Full Name",
      },
      {
        id: "email",
        placeholder: "Email",
      },
      {
        id: "phone",
        mask: { mask: "+375 (00) 000-00-00" },
        placeholder: "Phone",
      },
    ];
    const params = reactive({
      fullName: "",
      email: "",
      phone: "",
    });
    const paramsValidate = reactive({
      fullName: false,
      email: false,
      phone: false,
    });
    const validForm = computed(
      () =>
        paramsValidate.fullName && paramsValidate.email && paramsValidate.phone
    );
    const submit = () => {
      const item = {
        name: params.fullName,
        email: params.email,
        phone: params.phone,
      };
      store.commit("setClearValue", true);
      store.dispatch("addItem", item);
      Object.keys(paramsValidate).forEach((el) => (paramsValidate[el] = false));
    };
    const reset = (type) => {
      v$.value.$reset();
      v$.value.params[type].$reset();
    };
    const validate = async (type) => {
      paramsValidate[type] = await v$.value.params[type].$validate();
    };
    const blurInput = (type, value) => {
      params[type] = value;
      validate(type);
    };
    const alpha = helpers.regex(/^\S+ \S+$/);
    return {
      submit,
      v$,
      alpha,
      blurInput,
      validForm,
      params,
      paramsValidate,
      inputItem,
      reset,
    };
  },
  validations() {
    return {
      params: {
        fullName: {
          required,
          reg: helpers.withMessage(
            "Enter your first name and last name separated by a space",
            this.alpha
          ),
        },
        email: {
          required,
          email,
        },
        phone: {
          required,
          minLength: helpers.withMessage(
            "Enter your phone in the format +375 (XX) XXX-XX-XX",
            () => minLength(this.params.phone, 12)
          ),
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">
.form-control {
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  .input-block {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
