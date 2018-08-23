{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// mpvue has been set in webpack.base.conf with an alias.
{{/if_eq}}
import '../static/sdk/ald-stat'
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#if vuex}}
import store from './store'
{{/if}}
import { ajax } from './utils/ajax'
import './assets/style/common.scss'

Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
App.mpType = 'app'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{#if vuex}}
Vue.prototype.$store = store
{{/if}}
Vue.prototype.$ajax = ajax

const app = new Vue(App){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
app.$mount(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: [
            '^pages/index/main'
        ],
        window: {
            backgroundTextStyle: "light",
            navigationBarBackgroundColor: "#fff",
            navigationBarTitleText: "WeChat",
            navigationBarTextStyle: "black"
        }
    }
}
