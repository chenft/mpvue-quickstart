import { logAuto } from '@/utils/log'
const reg = /.+\/([0-9a-zA-Z_-]+)\/main$/
export const aldMixin = {
    // 自动加入进入页面的统计
    mounted: function () {
        const routePath = this.$mp.page.route
        const result = routePath.match(reg)
        const path = result && result[1]
        if (!this.$data.customAld && path && logAuto[path]) {
            this.$ald(logAuto[path])
        }
    }
}
export const dataMixin = {
    onUnload () {
        if (typeof this.$options.data === 'function') {
            Object.assign(this.$data, this.$options.data())
        }
    }
}
export const shareMixin = {
    onShareAppMessage () {
        const { shareTitle, sharePath, shareImageUrl } = this.$data
        return {
            title: shareTitle || '',
            path: sharePath || `/pages/index/main?from=share`,
            imageUrl: shareImageUrl || ''
        }
    }
}
