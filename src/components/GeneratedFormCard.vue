<template>
    <b-card title="Generated Form" tag="article" class="mb-2">
        <b-container>
            <div v-for="field in fields" class="mb-3">
                <b-row>
                    <b-col class="pl-0">
                        <label>{{field.name}}</label>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="pl-0" v-if="field.type === fieldTypes.Text">
                        <b-form-input type="text" v-model.trim="fieldValues[field.id]"
                                      :class="validityClass(field.id)" :placeholder="field.name">
                        </b-form-input>
                        <b-form-invalid-feedback>
                            <span>{{validationErrors[field.id]}}</span>
                        </b-form-invalid-feedback>
                    </b-col>
                    <b-col class="pl-0" v-if="field.type === fieldTypes.Select">
                        <b-form-select v-model="fieldValues[field.id]" :class="validityClass(field.id)"
                                       :options="mapToOptions(field.properties.options)">
                        </b-form-select>
                        <b-form-invalid-feedback>
                            <span>{{validationErrors[field.id]}}</span>
                        </b-form-invalid-feedback>
                    </b-col>
                </b-row>
            </div>
            <div class="float-right mt-3">
                <b-button @click="submit()" variant="primary" class="float-right">
                    Submit
                </b-button>
            </div>
        </b-container>
    </b-card>
</template>

<script>
    import {fieldTypes} from "../store/formStore";

    export default {
        name: "GeneratedFormCard",
        props: ["fields"],
        data() {
            const fieldValues = {};

            this.fields.forEach(field => {
                fieldValues[field.id] = undefined;
            });

            return {
                validationErrors: {},
                fieldValues: fieldValues,
                fieldTypes: fieldTypes
            }
        },
        methods: {
            submit() {
                if (this.runValidation()) {
                    alert('wow!');
                }
            },
            validityClass(fieldId) {
                if (!this.fieldValues[fieldId] && !this.validationErrors[fieldId]) {
                    return '';
                }

                return this.validationErrors[fieldId] ? 'is-invalid' : 'is-valid';
            },
            runValidation() {
                const validationErrors = {};
                let valid = true;

                this.fields.filter(e => e.properties).forEach(e => {
                    const fieldValue = this.fieldValues[e.id];

                    if (!fieldValue && e.properties.required) {
                        validationErrors[e.id] = `${e.name} is required.`;
                        valid = false;
                    }

                    if (e.type === fieldTypes.Text && fieldValue) {
                        if (fieldValue.length < e.properties.minLength) {
                            validationErrors[e.id] = `${e.name} must be longer than ${e.minLength} characters.`;
                            valid = false;
                        }
                        if (fieldValue.length > e.properties.maxLength) {
                            validationErrors[e.id] = `${e.name} must be longer than ${e.maxLength} characters.`;
                            valid = false;
                        }
                    }
                });

                this.$set(this, 'validationErrors', validationErrors);

                return valid;
            },
            mapToOptions(options) {
                if (!options) {
                    return [];
                }
                const resultOptions = options.map(e => ({value: e, text: e}));
                resultOptions.unshift({text: `- select -`});
                return resultOptions;
            }
        }
    }
</script>

<style scoped>

</style>
