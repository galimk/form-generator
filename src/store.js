import Vue from 'vue'
import Vuex from 'vuex'
import formStore from './store/formStore';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        formStore
    },
    plugins: [createPersistedState()]
})
