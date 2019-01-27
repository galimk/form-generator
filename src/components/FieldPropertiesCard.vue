<template>
    <b-card :title="cardHeader" tag="article" class="mb-2">
        <form id="app" @submit="updateFieldProperties" v-if="!viewMode">
            <div class="mb-3">
                <label>Field Name</label>
                <b-form-input label="Field Name" v-model.trim="$v.fieldName.$model" name="fieldName" id="fieldName"
                              type="text"
                              placeholder="Field Name" :class="inputStatus($v.fieldName)">
                </b-form-input>
                <b-form-invalid-feedback>
                    <span v-if="!$v.fieldName.required">Field is required</span>
                    <span v-if="!$v.fieldName.minLength">Name must have at least{{$v.fieldName.$params.minLength.min}} letters.</span>
                    <span v-if="!$v.fieldName.maxLength">Name must have less then{{$v.fieldName.$params.maxLength.max}} letters.</span>
                    <span v-if="!$v.fieldName.alphanumeric">Must contain only alphanumeric characters and spaces</span>
                </b-form-invalid-feedback>
            </div>

            <div class="mb-3">
                <label>Field Type</label>
                <b-form-select v-model="$v.fieldType.$model" :options="fieldTypes"></b-form-select>
            </div>

            <div>
                <text-box-properties
                        @validated="childValidated"
                        @updated="updateFieldProperties"
                        :field="field"
                        v-if="fieldType === fieldTypes.Text">
                </text-box-properties>

                <select-properties
                        @validated="childValidated"
                        @updated="updateFieldProperties"
                        :field="field"
                        v-if="fieldType === fieldTypes.Select">
                </select-properties>

                <email-properties
                        @validated="childValidated"
                        @updated="updateFieldProperties"
                        :field="field"
                        v-if="fieldType === fieldTypes.Email">
                </email-properties>

                <password-properties
                        @validated="childValidated"
                        @updated="updateFieldProperties"
                        :other-fields="allFields"
                        :field="field"
                        v-if="fieldType === fieldTypes.Password">
                </password-properties>
            </div>

        </form>
        <div class="float-right mt-3">
            <b-button variant="primary" class="mr-3" v-if="viewMode" @click="edit()">Edit</b-button>
            <b-button v-if="viewMode" @click="remove()">Remove</b-button>
            <b-button :disabled="$v.$invalid || childInvalid" variant="primary" class="m-3" v-if="!viewMode"
                      @click="save()">
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
    import SelectProperties from './propertyEditors/SelectProperties';
    import TextBoxProperties from './propertyEditors/TextBoxProperties'
    import PasswordProperties from './propertyEditors/PasswordProperties';
    import EmailProperties from './propertyEditors/EmailProperties';
    import mixins from '../mixins';
    import {helpers} from 'vuelidate/lib/validators'

    const alphanumeric = helpers.regex('alphanumeric', /^[a-zA-Z0-9 ]*$/);

    export default {
        name: 'FieldPropertiesCard',
        components: {EmailProperties, SelectProperties, TextBoxProperties, PasswordProperties},
        props: ['field', 'removeField', 'allFields'],
        mixins: [validationMixin, mixins],
        data() {
            return {
                mode: 'view',
                fieldName: this.field.name,
                fieldType: this.field.type,
                fieldTypes: fieldTypes,
                childInvalid: false,
                filedProperties: this.field.properties,
                newFieldProperties: null
            }
        },
        validations: {
            fieldName: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(30),
                alphanumeric
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
        watch: {
            fieldType() {
                if (this.fieldType === this.fieldTypes.Email) {
                    this.$set(this, 'childInvalid', false);
                }
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
            save() {
                this.$emit('update', {
                    id: this.field.id,
                    name: this.fieldName,
                    type: this.fieldType,
                    properties: this.newFieldProperties || this.filedProperties
                });
                this.$set(this, 'mode', 'view');
            },
            updateFieldProperties(newFieldProperties) {
                this.$set(this, 'newFieldProperties', newFieldProperties);
            },
            childValidated(invalid) {
                this.$set(this, 'childInvalid', invalid);
            }
        }
    }
</script>
