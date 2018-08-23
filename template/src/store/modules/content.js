import { CONTENT } from '../mutation-types'

const state = {
    content: []
}

const mutations = {
    [CONTENT.SET_CONTENT] (state, data) {
        state.content = data
    }
}
const getters = {
    content: state => {
        return state.content
    }
}

export default {
    state,
    mutations,
    getters
}
