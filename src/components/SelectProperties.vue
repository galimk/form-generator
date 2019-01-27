<template>
  <b-container>
    <b-row>
      <b-col class="pl-0">
        <label>Options</label>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col class="pl-0 col-4">
        <b-form-input type="text"
                      placeholder="New Option"
                      v-model="$v.newOption.$model"
                      :class="inputStatus($v.newOption)">
        </b-form-input>
        <b-form-invalid-feedback>
          <span v-if="!$v.newOption.notDuplicate">Option already added</span>
        </b-form-invalid-feedback>
      </b-col>
      <b-col class="col-2 ml-0 pl-0">
        <b-button variant="primary" @click="addOption" :disabled="$v.newOption.$invalid">Add</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="pl-0 mb-3">
        <div class="pr-2 mb-2 option" v-for="option in selectOptions">
          <b-button size="sm" variant="danger" @click="deleteOption(option)">x</b-button>
          <h5 class="ml-2">{{option}}</h5>
        </div>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-form-checkbox id="${field.id}-select-required" unchecked-value="0" value="1" v-model="$v.required.$model"
                       :class="inputStatus($v.required)">
        Required Field
      </b-form-checkbox>
    </b-row>
    <b-row v-if="!$v.required.optionsExist">
      <div class="requiredError mt-2">When field is required at least one option must be added</div>
    </b-row>
  </b-container>
</template>

<style scoped>
  h5 {
    display: inline;
  }

  .requiredError {
    font-size: 80%;
    color: #dc3545;
  }
</style>

<script>
  import mixins from '../mixins';
  import {required} from 'vuelidate/lib/validators'

  export default {
    name: "SelectProperties",
    mixins: [mixins],
    props: ['field'],
    validations: {
      newOption: {
        required,
        notDuplicate: (value, vm) => vm.selectOptions.indexOf(value) === -1
      },
      required: {
        optionsExist: (value, vm) => vm.required === "0" || vm.selectOptions.length > 0 && vm.required === "1"
      }
    },
    data() {
      const data = {
        selectOptions: this.field.properties.options || [],
        newOption: '',
        required: this.field.properties.required ? "1" : "0"
      };
      return data;
    },
    watch: {
      'selectOptions'() {
        this.emitChanges();
      },
      'required'() {
        this.emitChanges();
      }
    },
    mounted() {
      this.emitChanges();
    },
    methods: {
      addOption() {
        this.$set(this, 'selectOptions', [...this.selectOptions, this.newOption]);
        this.$set(this, 'newOption', '');
      },
      deleteOption(option) {
        const optionIndex = this.selectOptions.indexOf(option);
        const newOptions = [...this.selectOptions];
        newOptions.splice(optionIndex, 1);
        this.$set(this, 'selectOptions', newOptions);
      },
      emitChanges() {
        this.emitValidity();
        this.emitFieldProperties();
      },
      emitValidity() {
        const valid = this.required === "0" || this.selectOptions.length > 0 && this.required === "1";
        this.$emit('validated', !valid);
      },
      emitFieldProperties() {
        this.$emit('updated', {
          required: this.required === "1",
          options: this.selectOptions
        })
      }
    }
  }
</script>

