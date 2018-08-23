import { MOMENTS } from '../mutation-types'

const state = {
    moments: {
        commentData: [],
        dynamicData: {},
        likeData: [],
        location: ''
    }
}

const mutations = {
    [MOMENTS.SET_MOMENTS] (state, data) {
        state.moments = data
    },
    // comment
    [MOMENTS.ADD_COMMENT] (state, data) {
        state.moments.commentData.push(data)
    },
    [MOMENTS.EDIT_COMMENT] (state, data) {
        const len = state.moments.commentData.length
        const index = isNaN(data.index) ? len : data.index
        state.moments.commentData.splice(index, 1, data.data)
    },
    [MOMENTS.DELETE_COMMENT] (state, data) {
        const len = state.moments.commentData.length
        const index = isNaN(data) ? len : data
        state.moments.commentData.splice(index, 1)
    },
    // dynamic
    [MOMENTS.SET_DYNAMIC] (state, data) {
        state.moments.dynamicData = data
    },
    // like
    [MOMENTS.EDIT_LIKE] (state, data) {
        const len = state.moments.likeData.length
        const index = isNaN(data.index) ? len : data.index
        state.moments.likeData.splice(index, 1, data.data)
    },
    [MOMENTS.ADD_LIKE] (state, data) {
        state.moments.likeData.push(data)
    },
    [MOMENTS.DELETE_LIKE] (state, data) {
        const len = state.moments.likeData.length
        const index = isNaN(data) ? len : data
        state.moments.likeData.splice(index, 1)
    },
    // location
    [MOMENTS.SET_LOCATION] (state, data) {
        state.moments.location = data
    }
}
const getters = {
    moments: state => {
        return state.moments
    },
    dynamicData: state => {
        return state.moments.dynamicData
    },
    getCommentByIndex: state => index => {
        return state.moments.commentData[index]
    }
}

export default {
    state,
    mutations,
    getters
}
