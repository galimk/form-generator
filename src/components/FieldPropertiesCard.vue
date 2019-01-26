<template>
  <b-card :title="cardHeader" tag="article" class="mb-2">
    <form id="app" @submit="updateFieldProperties" v-if="!viewMode">
      <div class="mb-3">
        <b-form-input v-model.trim="$v.fieldName.$model" type="text" placeholder="Field Name"
                      :class="status($v.fieldName)"></b-form-input>
        <b-form-invalid-feedback>
          <span v-if="!$v.fieldName.required">Field is required</span>
          <span v-if="!$v.fieldName.minLength">Name must have at least
            {{$v.fieldName.$params.minLength.min}} letters.
          </span>
          <span v-if="!$v.fieldName.maxLength">Name must have less then
            {{$v.fieldName.$params.maxLength.max}} letters.
          </span>
        </b-form-invalid-feedback>
      </div>
      <div>
        <b-form-select v-model="$v.fieldType.$model" :options="fieldTypes"></b-form-select>
      </div>
    </form>
    <div class="float-right mt-3">
      <b-button variant="primary" class="mr-3" v-if="viewMode" @click="edit()">Edit</b-button>
      <b-button v-if="viewMode" @click="remove()">Remove</b-button>
      <b-button :disabled="$v.$invalid" variant="primary" class="m-3" v-if="!viewMode" @click="ok()">Save</b-button>
      <b-button v-if="!viewMode" @click="cancel()">Cancel</b-button>
    </div>
  </b-card>
</template>

<style scoped>
  button {
    width: 100px;
  }
</style>

<script>
  import {required, minLength, maxLength} from 'vuelidate/lib/validators'
  import {validationMixin} from 'vuelidate'
  import {fieldTypes} from "../store/formStore";

  export default {
    name: 'FieldPropertiesCard',
    props: ['field', 'removeField'],
    mixins: [validationMixin],
    data() {
      return {
        mode: 'view',
        fieldName: this.field.name,
        fieldType: this.field.type,
        fieldTypes: fieldTypes
      }
    },
    validations: {
      fieldName: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(30)
      },
      fieldType: {
        required
      }
    },
    computed: {
      viewMode() {
        return this.mode === 'view';
      },
      cardHeader() {
        return this.mode === 'view' ? this.fieldName : ''
      }
    },
    methods: {
      edit() {
        this.$set(this, 'mode', 'edit');
      },
      remove() {
        this.$emit('removed');
      },
      cancel() {
        this.$set(this, 'mode', 'view');
      },
      ok() {
      },
      updateFieldProperties(e) {
        e.preventDefault();
      },
      status(validation) {
        return {
          'is-invalid': validation.$error,
          'is-valid': validation.$dirty && !validation.$error
        }
      }
    }
  }
</script>
