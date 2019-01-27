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
                        <b-form-input type="text" :placeholder="field.name">
                        </b-form-input>
                    </b-col>
                    <b-col class="pl-0" v-if="field.type === fieldTypes.Select">
                        <b-form-select :options="field.properties.options"></b-form-select>
                    </b-col>
                </b-row>
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
            return {
                validationErrors: [],
                fieldTypes: fieldTypes
            }
        }
    }
</script>

<style scoped>

</style>
