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
                        <input class="weui-input" id="region" v-model="region" type="text" @click="selectRegion" placeholder="请设置地区" />
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
            region: '',
            regionList: [],
            region_code: 0
        }
    },
    mounted() {
        $("#region").focus(function() {
            document.activeElement.blur();
        });
        var param = {
            c: 'Zb',
            m: 'Region',
            a: 'getRegionList',
            mapping: {
                name: 'label',
                code: 'value'
            }
        };
        var p_obj = {
            action: '',
            param: param,
            success: (response) => {
                this.regionList = response;
            },
            fail: (response) => {
                alert(response.msg)
            }
        };
        AjaxHelper.GetRequest(p_obj);
    },
    methods: {
        selectRegion() {
            weui.picker(this.regionList, {
                className: 'custom-classname',
                onChange: function(result) {
                    console.log(result)
                },
                onConfirm: function(result) {
                    console.log(result)
                },
                id: 'doubleLinePicker'
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
                account: this.mobile,
                password: this.password,
                code: this.code,
                region_code: this.region_code
            };
            var p_obj = {
                action: 'c=Zb&m=Register&a=registerByMobile',
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
