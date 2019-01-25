<template>
    <div class="container">
        <div class="row">
            <div class="col-6 mt-2">
                <b-card title="Card Title"
                        img-alt="Image"
                        img-top
                        tag="article"
                        class="mb-2">
                    <p class="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <b-button href="#" variant="primary">Go somewhere</b-button>
                </b-card>
                <div class="col-auto pr-0">
                    <b-button class="float-right" variant="primary">New Field</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import {mapActions, mapGetters} from 'vuex'
    import {actionTypes, fieldTypes} from "../store/formStore";

    export default {
        name: 'home',
        components: {
            HelloWorld
        },
        computed: {
            ...mapGetters([])
        },
        methods: {
            ...mapActions([
                actionTypes.deleteField,
                actionTypes.updateField,
                actionTypes.addField
            ])
        },
        mounted() {
            console.log('here...');
            this.$store.dispatch(actionTypes.addField, fieldTypes.Radio);
        }
    }
</script>
