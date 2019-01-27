<template>
  <b-container>
    <b-row class="mb-3">
      <b-col class="pl-0">
        <label>Min Length</label>
        <b-form-input type="number" v-model="$v.minLength.$model" :class="inputStatus($v.minLength)"></b-form-input>
        <b-form-invalid-feedback>
          <span v-if="!$v.minLength.required">Min Length is required</span>
          <span v-if="!$v.minLength.lessThenMax">Must be less then Max Length</span>
          <span v-if="!$v.minLength.greaterThenZero">Must be greater then 0 when field is required</span>
        </b-form-invalid-feedback>
      </b-col>
      <b-col class="pr-0">
        <label>Max Length</label>
        <b-form-input v-model="$v.maxLength.$model" type="number" :class="inputStatus($v.maxLength)"></b-form-input>
        <b-form-invalid-feedback>
          <span v-if="!$v.maxLength.required">Max Length is required</span>
          <span v-if="!$v.maxLength.greaterThenMin">Must be greater then Min Length</span>
        </b-form-invalid-feedback>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-form-checkbox id="checkbox1" unchecked-value="0" value="1" v-model="required">
        Required Field
      </b-form-checkbox>
    </b-row>
  </b-container>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'
  import mixins from '../mixins';

  export default {
    name: "TextBoxProperties",
    props: ['field'],
    mixins: [mixins],
    validations: {
      maxLength: {
        required,
        greaterThenMin: (value, vm) => !value || parseInt(value) > vm.minLength
      },
      minLength: {
        required,
        lessThenMax: (value, vm) => !value || parseInt(value) < vm.maxLength,
        greaterThenZero: (value, vm) => vm.required === "1" ? parseInt(value) > 0 : true
      }
    },
    data() {
      return {
        maxLength: this.field.maxLength || 20,
        minLength: this.field.minLength || 5,
        required: this.field.required || "0"
      }
    },
    mounted() {
      this.$emit('validated', this.$v.$invalid);
    },
    watch: {
      '$v.$invalid'() {
        this.$emit('validated', this.$v.$invalid)
      }
    }
  }
</script>

