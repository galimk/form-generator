<template>
    <b-container>
        <b-row>
            <b-col class="pl-0">
                <label>Min Length</label>
                <b-form-input type="number" v-model="$v.minLength.$model"
                              :class="inputStatus($v.minLength)"></b-form-input>
                <b-form-invalid-feedback>
                    <span v-if="!$v.minLength.required">Min Length is required</span>
                    <span v-if="!$v.minLength.greaterThanZero">Must be greater then 0</span>
                </b-form-invalid-feedback>
            </b-col>
        </b-row>
        <b-row class="mb-3 pt-3">
            <b-form-checkbox :id="`${field.id}-special-chars`" unchecked-value="0" value="1"
                             v-model="includeSpecialChars">
                Must contain special characters.
            </b-form-checkbox>
            <b-form-checkbox :id="`${field.id}-numbers`" unchecked-value="0" value="1" v-model="includeNumbers">
                Must contain numbers.
            </b-form-checkbox>
        </b-row>
        <b-row>
            <b-col class="pl-0">
                <label>Value match with</label>
            </b-col>
        </b-row>
        <b-row class="mb-3">
            <b-col class="pl-0">
                <b-form-select v-model="matchFieldId" :options="otherFieldsOptions"></b-form-select>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {required} from 'vuelidate/lib/validators'
    import mixins from "../../mixins";

    export default {
        name: "PasswordProperties",
        props: ['field', 'otherFields'],
        mixins: [mixins],
        data() {
            return {
                includeSpecialChars: this.field.properties.includeSpecialChars ? "1" : "0",
                includeNumbers: this.field.properties.includeNumbers ? "1" : "0",
                minLength: this.field.properties.minLength || 5,
                matchFieldId: this.field.properties.matchFieldId || undefined,
                otherFieldsOptions: [{text: '- select -'}, ...this.otherFields.filter(e => e.id !== this.field.id).map(e => ({
                    text: e.name,
                    value: e.id
                }))]
            }
        },
        validations: {
            minLength: {
                required,
                greaterThanZero: (value) => !value || parseInt(value) > 0
            }
        },
        mounted() {
            this.$emit('validated', this.$v.$invalid);
        },
        // this can be refactored, to many watches just to propagate properties back
        watch: {
            includeSpecialChars() {
                this.emitChanges();
            },
            includeNumbers() {
                this.emitChanges();
            },
            minLength() {
                this.emitChanges();
            },
            matchFieldId() {
                this.emitChanges();
            },
            '$v.$invalid'() {
                this.$emit('validated', this.$v.$invalid)
            },
        },
        methods: {
            emitChanges() {
                this.$emit('updated', {
                    includeSpecialChars: this.includeSpecialChars === "1",
                    includeNumbers: this.includeNumbers === "1",
                    minLength: this.minLength,
                    required: true,
                    matchFieldId: this.matchFieldId
                });
            }
        }
    }
</script>

<style scoped>

</style>
