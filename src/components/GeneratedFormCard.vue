<template>
    <b-card title="Generated Form" tag="article" class="mb-2">
        <b-container v-if="mode === 'form'">
            <div v-for="field in fields" class="mb-3">
                <b-row>
                    <b-col class="pl-0">
                        <label>{{field.name}}</label>
                    </b-col>
                </b-row>
                <b-row>

                    <b-col class="pl-0" v-if="isTextInputField(field)">
                        <b-form-input :type="textInputType(field)"
                                      v-model.trim="fieldValues[field.id]"
                                      @change="runFieldValidationDebounced(field)"
                                      :class="validityClass(field.id)">
                        </b-form-input>
                        <b-form-invalid-feedback>
                            <span>{{validationErrors[field.id]}}</span>
                        </b-form-invalid-feedback>
                    </b-col>

                    <b-col class="pl-0" v-if="field.type === fieldTypes.Select">
                        <b-form-select @change="runFieldValidationDebounced(field)"
                                       v-model="fieldValues[field.id]"
                                       :class="validityClass(field.id)"
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
        <b-container v-if="mode === 'json'">
            <div>
                <vue-json-pretty :data="formatValues()">
                </vue-json-pretty>
            </div>
            <div class="float-right mt-3">
                <b-button @click="() => $set(this, 'mode', 'form')" class="float-right">
                    Back
                </b-button>
            </div>
        </b-container>
    </b-card>
</template>

<script>
    import {fieldTypes} from "../store/formStore";
    import VueJsonPretty from 'vue-json-pretty';
    import _ from 'lodash';
    import mixins from "../mixins";

    export default {
        name: "GeneratedFormCard",
        components: {VueJsonPretty},
        props: ["fields"],
        mixins: [mixins],
        data() {
            const fieldValues = {};

            this.fields.forEach(field => {
                fieldValues[field.id] = undefined;
            });

            return {
                validationErrors: {},
                fieldValues: fieldValues,
                fieldTypes: fieldTypes,
                mode: 'form'
            }
        },
        created() {
            this.runFieldValidationDebounced = _.debounce(this.runFieldValidation, 500);
        },
        methods: {
            submit() {
                if (this.runValidation()) {
                    this.$set(this, 'mode', 'json');
                }
            },
            isTextInputField(field) {
                return field.type === fieldTypes.Text || field.type === fieldTypes.Password || field.type === fieldTypes.Email;
            },
            textInputType(field) {
                return field.type === fieldTypes.Password ? 'password' : 'text';
            },
            validityClass(fieldId) {
                if (!this.validationErrors[fieldId]) {
                    return this.fieldValues[fieldId] ? 'is-valid' : '';
                } else {
                    return 'is-invalid';
                }
            },
            formatValues() {
                let formatted = {};
                this.fields.forEach(field => {
                    formatted[field.name.replace(' ', '_')] = this.fieldValues[field.id];
                });
                return formatted;
            },
            runValidation() {
                const validationErrors = {};
                let valid = true;

                this.fields.filter(field => field.properties).forEach(field => {
                    let validationError = this.validateField(field);

                    if (validationError !== null) {
                        validationErrors[field.id] = validationError;
                        valid = false;
                    }
                });

                this.$set(this, 'validationErrors', validationErrors);

                return valid;
            },
            validateField(field) {
                const fieldValue = this.fieldValues[field.id];
                let validationError = null;

                if (!fieldValue && field.properties.required) {
                    validationError = `${field.name} is required.`;
                }

                if (field.type === fieldTypes.Email && fieldValue && !this.isValidEmail(fieldValue)) {
                    validationError = `Invalid email.`;
                }

                if (field.type === fieldTypes.Text && fieldValue) {
                    if (fieldValue.length < field.properties.minLength) {
                        validationError = `${field.name} must be longer than ${field.properties.minLength} characters.`;
                    }

                    if (fieldValue.length >= field.properties.maxLength) {
                        validationError = `${field.name} must not be greater than ${field.properties.maxLength} characters.`;
                    }
                }

                if (field.type === fieldTypes.Password && fieldValue) {
                    if (fieldValue.length < field.properties.minLength) {
                        validationError = `${field.name} must be longer than ${field.properties.minLength} characters.`;
                    }

                    let digits = /\d/;
                    let specialChars = /[!@#$%^&*(),.?":{}|<>]/;

                    if (field.properties.includeNumbers && !digits.test(fieldValue)) {
                        validationError = `${field.name} must contain at least one number`;
                    }

                    if (field.properties.includeSpecialChars && !specialChars.test(fieldValue)) {
                        validationError = `${field.name} must contain at least one special character`;
                    }
                }

                return validationError;
            },
            mapToOptions(options) {
                if (!options) {
                    return [];
                }
                const resultOptions = options.map(e => ({value: e, text: e}));
                resultOptions.unshift({text: `- select -`});
                return resultOptions;
            },
            runFieldValidation(field) {
                const validationError = this.validateField(field);
                const validationErrors = {...this.validationErrors};
                validationErrors[field.id] = validationError;
                this.$set(this, 'validationErrors', validationErrors);
            }
        }
    }
</script>

<style scoped>

</style>
