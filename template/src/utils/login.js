import wxp from './wx-promise.js'
import { ajax } from './ajax.js'
import config from '@/config'

const checkloginApi = `${config.servPre}wxchecklogin`

const { STORAGE_KEY_RDSESSION } = config

let jscode = ''

function wxLogin () {
    return new Promise((resolve, reject) => {
        wxp.login()
            .then((res) => {
                jscode = res.code
                resolve(res)
            })
    })
}

function checkLogin () {
    const requestData = {
        jscode,
        rdsession: wx.getStorageSync(STORAGE_KEY_RDSESSION) || ''
    }
    console.log(requestData)
    return ajax.request(checkloginApi, requestData, { method: 'post' })
        .then((res) => {
            if (res.status === 1) {
                const rdsession = res.rdsession
                wx.setStorageSync(STORAGE_KEY_RDSESSION, rdsession)
                return Promise.resolve(rdsession)
            } else {
                return false
            }
        })
}
export default async function () {
    await wxLogin()
    const res = await checkLogin()
    return res
}
