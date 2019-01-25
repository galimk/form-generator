import Vue from 'vue'
import Vuex from 'vuex'
import formStore from './store/formStore';
import BootstrapVue from 'bootstrap-vue';

Vue.use(Vuex);
Vue.use(BootstrapVue);

export default new Vuex.Store({
    modules: {
        formStore
    }
})
