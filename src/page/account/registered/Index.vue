<template>
    <div>
        <div class="container-body">
            <div>
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <input class="weui-input" v-model="mobile" type="text" placeholder="请输入您的手机号" />
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <input class="weui-input" v-model="password" type="password" placeholder="设置6-20位" />
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <input class="weui-input" v-model="region" type="text" @click="selectRegion" placeholder="请设置地区" />
                    </div>
                </div>
                <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="code" maxlength="6" placeholder="输入验证码">
                    </div>
                    <div class="weui-cell__ft">
                        <a href="javascript:;" class="weui-vcode-btn" disabled="true" @click="getCode">获取验证码</a>
                    </div>
                </div>
                <div class="weui-cell"></div>
                <a href="javascript:;" class="weui-btn weui-btn_primary" @click="registered">提交</a>
                <label for="weuiAgree" class="weui-agree">
                    <input id="weuiAgree" type="checkbox" class="weui-agree__checkbox">
                    <span class="weui-agree__text">
                        同意<a href="javascript:void(0);">《相关条款》</a>
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>
<script>
import weui from 'src/lib/js/weui.min.js'
export default {
    components: {},
    data() {
        return {
            mobile: '',
            password: '',
            code: '',
            region: ''
        }
    },
    mounted() {
        
    },
    methods: {
        selectRegion() {
            weui.picker([{
                label: '飞机票',
                value: 0,
                disabled: true // 不可用
            }, {
                label: '火车票',
                value: 1
            }, {
                label: '汽车票',
                value: 3
            }, {
                label: '公车票',
                value: 4,
            }], {
                className: 'custom-classname',
                defaultValue: [3],
                onChange: function(result) {
                    console.log(result)
                },
                onConfirm: function(result) {
                    console.log(result)
                },
                id: 'singleLinePicker'
            });
        },
        getCode() {
            var param = {
                mobile: this.mobile
            };
            var p_obj = {
                action: 'c=Zb&m=User&a=sendMobileCode',
                param: param,
                success: (response) => {

                },
                fail: (response) => {
                    alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        registered() {
            var param = {
                mobile: this.mobile,
                password: this.password
            };
            var p_obj = {
                action: 'c=Zb&m=Login&a=login',
                param: param,
                success: (response) => {
                    // NormalHelper.setCookie(GlobalModel.COOKIE_USER_INFO, response);
                    // this.$router.push({
                    //     path: '/dashboard'
                    // });
                },
                fail: (response) => {
                    alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    margin-top: 20px;
    .weui-flex,
    .weui-btn {
        margin: 0 15px;
    }
    .weui-btn {
        height: 45px;
        background: #A877E6;
        box-shadow: 0 4px 9px 0 rgba(178, 125, 227, 0.80);
        border-radius: 4px;
    }
    .flex-item {
        font-size: 14px;
        color: #4990E2;
    }
    .weui-agree__checkbox {
        width: 16px;
        height: 16px;
    }
    .weui-agree {
        font-size: 16px;
    }
}
</style>
