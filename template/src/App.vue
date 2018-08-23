<script>
import Vue from 'vue'
import login from '@/utils/login'
// import config from '@/config'
export default {
    mounted () {
        const {
            f,
            from
        } = this.$root.$mp.appOptions.query
        this.f = f || ''
        this.from = from || ''
        Vue.prototype.$ald = this.ald
    },
    async created{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
        const res = await login()
        console.log(res)
    },
    methods: {
        ald (name, data = {}) {
            const app = getApp()
            app.aldstat.sendEvent(name, {
                f: this.f,
                from: this.from,
                ...data
            })
        }
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box;
}
/* this rule will be remove */
* {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
}
</style>
