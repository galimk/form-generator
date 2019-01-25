import Vue from 'vue'
import Vuex from 'vuex'
import formStore from './store/formStore';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        formStore
    }
})
