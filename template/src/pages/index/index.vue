<template>
<div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
        <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        <div class="userinfo-nickname">
            <card :text="userInfo.nickName"></card>
        </div>
    </div>

    <div class="usermotto">
        <div class="user-motto">
            <card :text="motto"></card>
        </div>
    </div>

    <form class="form-container">
        <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
        <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
</div>
</template>

<script>
import base from '@/extends/base'
import Bus from '@/eventBus'
export default {
    extends: base,
    data{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
        return {
            motto: 'Hello World',
            userInfo: {}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
        }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    },

    beforeMount () {
        this.homeTransit()
    },

    methods: {
        homeTransit () {
            const options = this.$root.$mp.query
            if (options.path) {
                const path = options.path
                var paramStr = ''
                for (var key in options) {
                    if (key !== 'path') {
                        paramStr += `${key}=${options[key]}&`
                    }
                }
                paramStr = paramStr.substring(0, paramStr.length - 1)
                let url = `/pages/${path}?` + paramStr
                wx.navigateTo({
                    url: url
                })
            } else if (options.go) {
                let url = decodeURIComponent(options.go)
                wx.navigateTo({
                    url
                })
            }
        },
        bindViewTap{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
            const url = '../logs/main'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
            wx.navigateTo({ url }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
        },
        getUserInfo{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
        // 调用登录接口
            wx.login({
                success: () => {
                    wx.getUserInfo({
                        success: (res) => {
                            this.userInfo = res.userInfo{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
                        }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
                    }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
                }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
            }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
        },
        clickHandle{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}(msg, ev) {
            console.log('clickHandle:', msg, ev){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
        }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    },

    created{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
        // 调用应用实例的方法获取全局数据
        this.getUserInfo(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

        // Bus.$on('completeEdit', this.showTipModal)
        // Bus.$emit('completeEdit')
        // Bus.$off('completeEdit', this.showTipModal)


    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style scoped lang="scss">
.userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $green;
}

.userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
