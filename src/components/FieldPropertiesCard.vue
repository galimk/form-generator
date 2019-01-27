<template>
  <b-card :title="cardHeader" tag="article" class="mb-2">
    <form id="app" @submit="updateFieldProperties" v-if="!viewMode">
      <div class="mb-3">
        <label>Field Name</label>
        <b-form-input label="Field Name" v-model.trim="$v.fieldName.$model" name="fieldName" id="fieldName" type="text"
                      placeholder="Field Name" :class="inputStatus($v.fieldName)">
        </b-form-input>
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
      <div class="mb-3">
        <label>Field Type</label>
        <b-form-select v-model="$v.fieldType.$model" :options="fieldTypes"></b-form-select>
      </div>
      <div>
        <text-box-properties
          @validated="childValidated"
          :field="field"
          v-if="fieldType === fieldTypes.Text">
        </text-box-properties>

        <select-properties
          @validated="childValidated"
          :field="field"
          v-if="fieldType === fieldTypes.Select">
        </select-properties>
      </div>
    </form>
    <div class="float-right mt-3">
      <b-button variant="primary" class="mr-3" v-if="viewMode" @click="edit()">Edit</b-button>
      <b-button v-if="viewMode" @click="remove()">Remove</b-button>
      <b-button :disabled="$v.$invalid || childInvalid" variant="primary" class="m-3" v-if="!viewMode" @click="ok()">
        Save
      </b-button>
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
  import SelectProperties from './SelectProperties';
  import TextBoxProperties from './TextBoxProperties'
  import mixins from '../mixins';

  export default {
    name: 'FieldPropertiesCard',
    components: {SelectProperties, TextBoxProperties},
    props: ['field', 'removeField'],
    component: [SelectProperties, TextBoxProperties],
    mixins: [validationMixin, mixins],
    data() {
      return {
        mode: 'view',
        fieldName: this.field.name,
        fieldType: this.field.type,
        fieldTypes: fieldTypes,
        childInvalid: false
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
      childValidated(invalid) {
        this.$set(this, 'childInvalid', invalid);
      }
    }
  }
</script>
