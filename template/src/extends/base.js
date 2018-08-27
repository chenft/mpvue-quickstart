import * as mixin from '@/mixins/index'
import Vue from 'vue'

export function BaseVue (options = {}) {
    if (!options.mixins) {
        options.mixins = []
    }
    options.mixins = [mixin.dataMixin, mixin.aldMixin, mixin.shareMixin].concat(options.mixins)

    if (this instanceof BaseVue) {
        return new Vue(options)
    }
    return Vue.extend(options)
}
