<template>
  <b-container>
    <b-row class="mb-3">
      <b-col class="pl-0">
        <label>Min Length</label>
        <b-form-input type="number" v-model="$v.minLength.$model" :class="inputStatus($v.minLength)"></b-form-input>
        <b-form-invalid-feedback>
          <span v-if="!$v.minLength.required">Min Length is required</span>
          <span v-if="!$v.minLength.lessThenMax">Must be less then Max Length</span>
        </b-form-invalid-feedback>
      </b-col>
      <b-col class="pr-0">
        <label>Min Length</label>
        <b-form-input v-model="$v.maxLength.$model" type="number" :class="inputStatus($v.maxLength)"></b-form-input>
        <b-form-invalid-feedback>
          <span v-if="!$v.maxLength.required">Max Length is required</span>
          <span v-if="!$v.maxLength.greaterThenMin">Must be greater then Min Length</span>
        </b-form-invalid-feedback>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-form-checkbox id="checkbox1"
                       v-model="status"
                       value="accepted"
                       unchecked-value="not_accepted">
        Required Field
      </b-form-checkbox>
    </b-row>
  </b-container>
</template>

<script>
  import {required, minLength, maxLength} from 'vuelidate/lib/validators'
  import mixins from '../mixins';

  const maxGreaterThenMin = (value, vm) => {

  };

  const minLessThenMax = (value, vm) => {

  };

  export default {
    name: "TextBoxProperties",
    props: ['field'],
    mixins: [mixins],
    validations: {
      maxLength: {
        required,
        greaterThenMin: (value, vm) => !value || value > vm.minLength
      },
      minLength: {
        required,
        lessThenMax: (value, vm) => !value || value < vm.maxLength
      }
    },
    data() {
      return {
        maxLength: this.field.maxLength || 20,
        minLength: this.field.minLength || 5
      }
    },
    methods: {
      status(validation) {

      }
    }

  }
</script>

<style scoped>

</style>
