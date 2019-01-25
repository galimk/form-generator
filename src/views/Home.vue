<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
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
