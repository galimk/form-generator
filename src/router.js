import Vue from 'vue'
import Router from 'vue-router'
import DynamicFormContainer from './views/DynamicFormContainer.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: DynamicFormContainer
    }
  ]
})
