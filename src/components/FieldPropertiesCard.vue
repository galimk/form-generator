<template>
  <b-card :title="field.name" tag="article" class="mb-2">
    <p class="card-text">
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </p>
    <b-button-group class="float-right">
      <b-button variant="success" v-if="viewMode" @click="edit()">Edit</b-button>
      <b-button variant="danger" v-if="viewMode" @click="remove()">Remove</b-button>
      <b-button variant="primary" v-if="!viewMode" @click="save()">Save</b-button>
      <b-button v-if="!viewMode">Cancel</b-button>
    </b-button-group>
  </b-card>
</template>

<script>
  export default {
    name: 'FieldPropertiesCard',
    props: ['field', 'removeField'],
    data() {
      return {
        mode: 'view'
      }
    },
    computed: {
      viewMode() {
        return this.mode === 'view';
      }
    },
    methods: {
      edit() {

      },
      delete() {

      },
      remove() {
        this.$emit('removed');
      }
    }
  }
</script>
