<template>
    <b-container>
        <b-row class="mb-3">
            <b-form-checkbox :id="`${field.id}-required`" unchecked-value="0" value="1" v-model="required">
                Required Field
            </b-form-checkbox>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "EmailProperties",
        props: ['field'],
        data() {
            return {
                required: this.field.properties.required ? "1" : "0"
            }
        },
        watch: {
            'required'() {
                this.$emit('updated', {
                    required: this.required === "1",
                });
            }
        },
    }
</script>

<style scoped>

</style>
