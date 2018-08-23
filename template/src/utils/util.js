import wxp from './wx-promise.js'

export function navigate (cfg, auth) {
    // console.log(cfg, auth)
    // 小程序内页面
    if (cfg.type === 'page') {
        wx.navigateTo({
            url: cfg.path
        })
        // 其他小程序
    } else if (cfg.type === 'app') {
        if (!wx.navigateToMiniProgram) {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        } else {
            wx.navigateToMiniProgram({
                appId: cfg.appid || cfg.appId,
                path: cfg.path
            })
        }
        // web页面不处理
    }
}

export function promiseQueue (list, fn) {
    let index = 0
    let length = list.length
    return list.reduce((promise, thing) => {
        return promise.then(() => {
            return thing().then(res => {
                typeof fn === 'function' && fn(res, index++, length)
                return res
            })
        })
    }, Promise.resolve())
}
/**
 * 获取一组图片的信息，返回一个Promise对象，在所有图片获取完之后返回
 * @param {Array} imageList 需要获取信息的图片列表
 * @param {Function} fn 每次获取成功时调用，传入获取的图片信息和当前执行到第几个
 */
export function getImagesInfo (imageList, fn) {
    let queue = []
    // 获取图片信息&drawImage
    imageList.forEach((item, index) => {
        queue.push(() => {
            return wxp.getImageInfo(item).then(res => {
                fn(res, index)
                return res
            })
        })
    })
    return promiseQueue(queue)
}

export function showErrorModel (msg = '') {
    return wxp.showModal({
        title: '',
        content: msg || '',
        showCancel: false,
        confirmText: '知道了'
    })
}

export function updateTip () {
    wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
}

export function showTip (msg) {
    wx.showToast({
        title: msg,
        icon: 'none'
    })
}

export function confirm (title, content, confirm = '', cancel = '') {
    return wxp.showModal({
        title,
        content,
        confirm,
        cancel
    }).then(res => {
        return res.confirm
    })
}

export const createUid = function () {
    let uid = ''
    try {
        uid = wx.getStorageSync('weshine::uniqid')
    } catch (e) {
    }
    if (uid) return uid
    uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
    try {
        wx.setStorageSync('weshine::uniqid', uid)
    } catch (error) {
    }
    return uid
}
const camelizeRE = /[-_](\w)/g
export const camelize = (str) => {
    return str.replace(camelizeRE, (_, c) => {
        return c ? c.toUpperCase() : ''
    })
}
