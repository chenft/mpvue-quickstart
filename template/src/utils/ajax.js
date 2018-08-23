import md5 from 'md5'
import config from '@/config'

var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()

// 添加请求拦截器
fly.interceptors.request.use((req) => {
    const parse = urlParse(req.url)
    if (!parse) {
        return Promise.reject(new Error(req))
    }

    let query = Object.assign({}, parse.query, (req.needLogin && { rdsession: wx.getStorageSync(config.STORAGE_KEY_RDSESSION) }) || {})

    const timestamp = Math.round(Date.now())
    const sign = md5(config.APP_KEY + '#' + getParamsMd5(Object.assign({}, req.body, {
        timestamp
    }, query)) + '#' + config.APP_SECRET).toUpperCase()

    query = Object.assign({ timestamp, sign }, query)
    req.url = queryExtend(req.url, query)

    req.headers = req.method.toUpperCase() === 'POST'
        ? { 'Content-Type': 'application/x-www-form-urlencoded' }
        : { 'Content-Type': 'application/json' }

    return req
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use((res) => {
    if (res.data.code === 200) {
        return res.data.data
    } else {
        console.log({
            headers: res.headers,
            request: res.request,
            response: res.data,
            // 后端返回的错误信息
            message: res.data.message
        })
    }
    return res.data
}, (err) => {
    // 发生网络错误后会走到这里
    console.log(err)
})

function queryExtend (url, query) {
    if (url.indexOf('?') === -1) url += '?'
    Object.keys(query).forEach(key => {
        url += `${key}=${query[key]}&`
    })
    return url.slice(0, -1)
}

function urlParse (input) {
    if (!input) return false
    let qs = ''
    let url = ''
    if (input.startsWith('http')) {
        url = input.split('?')[0]
        qs = input.split('?')[1]
    } else {
        qs = input.trim().replace(/^[?#&]/, '')
    }
    let query = queryParse(qs)
    return {
        url,
        query
    }
}

function queryParse (queryString) {
    const ret = Object.create(null)
    if (!queryString) return ret
    for (const param of queryString.split('&')) {
        let [key, value] = param.split('=')
        ret[key] = value
    }
    return ret
}

function getParamsMd5 (params) {
    let keys = Object.keys(params).sort()
    let str = ''
    for (let i in keys) {
        str += `${keys[i]}=${params[keys[i]]}&`
    }
    str = str.slice(0, str.length - 1)
    return md5(str)
}

export const ajax = fly
export const formatUrl = function (url, query = {}) {
    if (!url) {
        throw new Error('no url')
    }
    const timestamp = Math.round(Date.now())
    query.rdsession = wx.getStorageSync(config.STORAGE_KEY_RDSESSION)
    const sign = md5(config.APP_KEY + '#' + getParamsMd5(Object.assign({}, {
        timestamp
    }, query)) + '#' + config.APP_SECRET).toUpperCase()

    query = Object.assign({ timestamp, sign }, query)
    url = queryExtend(url, query)
    return url
}
