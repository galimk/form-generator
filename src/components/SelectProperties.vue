<template>
  <b-container>
    <b-row>
      <b-col class="pl-0">
        <label>Options:</label>
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
        <b-button variant="primary" @click="addOption" :disabled="$v.$invalid">Add</b-button>
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
      <b-form-checkbox id="checkbox1" unchecked-value="0" value="1" v-model="required">
        Required Field
      </b-form-checkbox>
    </b-row>
  </b-container>
</template>

<style scoped>
  h5 {
    display: inline;
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
        notDuplicate(value, vm) {
          return vm.selectOptions.indexOf(value) === -1
        }
      }
    },
    data() {
      const data = {
        selectOptions: this.field.options || [],
        newOption: '',
        required: this.field.required || "0"
      };


      return data;
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
      }
    }
  }
</script>

