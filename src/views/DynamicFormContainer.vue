<template>
    <div class="container">
        <div class="row">
            <div class="col-6 mt-2">
                <field-properties-card
                        v-for="field in fields"
                        :field="field"
                        @removed="deleteField(field.id)"
                        :key="field.name">
                </field-properties-card>
                <div class="col-auto mr-2">
                    <b-button class="float-right mb-5"  @click="addField()" variant="primary">New Field
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    // @ is an alias to /src
    import FieldPropertiesCard from '../components/FieldPropertiesCard'
    import {mapActions, mapGetters} from 'vuex'
    import {actionTypes, fieldTypes} from "../store/formStore";

    export default {
        name: 'DynamicFormContainer',
        components: {
            FieldPropertiesCard
        },
        computed: {
            ...mapGetters([
                'fields'
            ]),
            actionTypes() {
                return actionTypes;
            }
        },
        getters: {
            actionTypes: actionTypes
        },
        methods: {
            ...mapActions([
                actionTypes.deleteField,
                actionTypes.updateField,
                actionTypes.addField
            ])
        }
    }
</script>
