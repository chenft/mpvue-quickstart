import Vue from 'vue'
import Vuex from 'vuex'
import moments from './modules/moments'
import content from './modules/content'

Vue.use(Vuex)

const modules = {
    moments,
    content
}

const store = new Vuex.Store({
    modules
})

export default store
