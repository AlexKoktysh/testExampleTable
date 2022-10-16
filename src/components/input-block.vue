<template>
  <form class="form-control" @submit.prevent="submit">
    <div class="input-block">
      <input-item
        id="fullName"
        placeholder="Full Name"
        @blurInput="blurInput"
        :invalid="fullNameValidate"
        :error="v$.fullName.$errors"
      />
      <input-item
        id="email"
        placeholder="Email"
        @blurInput="blurInput"
        :invalid="emailValidate"
        :error="v$.email.$errors"
      />
      <input-item
        id="phone"
        placeholder="Phone"
        @blurInput="blurInput"
        :invalid="phoneValidate"
        :error="v$.phone.$errors"
        :phoneNumberMask="phoneNumberMask"
      />
    </div>
    <button-component type="submit" nameButton="SAVE"></button-component>
  </form>
</template>

<script>
import { computed, ref } from "vue";
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
    const fullName = ref("");
    const email = ref("");
    const phone = ref("");
    const fullNameValidate = ref(false);
    const emailValidate = ref(false);
    const phoneValidate = ref(false);
    const validForm = computed(
      () =>
        !fullNameValidate.value && !emailValidate.value && !phoneValidate.value
    );
    const phoneNumberMask = { mask: "+375 (00) 000-00-00" };
    const submit = () => {
      validate();
      const item = {
        name: fullName.value,
        email: email.value,
        phone: phone.value,
      };
      validForm.value && store.dispatch("addItem", item);
    };
    const setFullNameValidate = () => {
      fullNameValidate.value =
        (v$.value.fullName.$dirty && v$.value.fullName.required.$invalid) ||
        (v$.value.fullName.$dirty && v$.value.fullName.reg.$invalid);
    };
    const setEmailValidate = () => {
      emailValidate.value =
        (v$.value.email.$dirty && v$.value.email.required.$invalid) ||
        (v$.value.email.$dirty && v$.value.email.email.$invalid);
    };
    const setPhoneValidate = () => {
      phoneValidate.value =
        (v$.value.phone.$dirty && v$.value.phone.required.$invalid) ||
        (v$.value.phone.$dirty && v$.value.phone.minLength.$invalid);
    };
    const validate = (type) => {
      if (v$.value.$invalid) {
        switch (type) {
          case "fullName":
            v$.value.fullName.$touch();
            setFullNameValidate();
            break;
          case "email":
            v$.value.email.$touch();
            setEmailValidate();
            break;
          case "phone":
            v$.value.phone.$touch();
            setPhoneValidate();
            break;
          default:
            v$.value.$touch();
            setFullNameValidate();
            setEmailValidate();
            setPhoneValidate();
            break;
        }
      }
    };
    const blurInput = (type, value) => {
      switch (type) {
        case "fullName":
          fullName.value = value;
          break;
        case "email":
          email.value = value;
          break;
        case "phone":
          phone.value = value;
          break;
        default:
          break;
      }
      validate(type);
    };
    const alpha = helpers.regex(/^\S+ \S+$/);
    return {
      submit,
      fullName,
      email,
      phone,
      v$,
      alpha,
      blurInput,
      fullNameValidate,
      emailValidate,
      phoneValidate,
      phoneNumberMask,
    };
  },
  validations() {
    return {
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
          () => minLength(this.phone, 12)
        ),
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
  }
}
</style>
