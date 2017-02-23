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
                        <input class="weui-input" v-model="password" type="password" placeholder="设置6-20位由字母、数字、下划线组成的密码" />
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
                        <a href="javascript:void(0);" :class="codeBtn.disabled" class="weui-vcode-btn" @click="getCode">{{codeBtn.prompt}}</a>
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
export default {
    components: {},
    data() {
        return {
            mobile: '',
            password: '',
            code: '',
            region: '',
            regionList: [],
            region_code: 0,
            codeBtn: {
                prompt: '获取验证码',
                disabled: ''
            },
            mobileCode: ''
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
                weui.alert(response.msg)
            }
        };
        AjaxHelper.GetRequest(p_obj);
    },
    methods: {
        selectRegion() {
            var _self = this;
            weui.picker(this.regionList, {
                defaultValue: [2],
                className: 'custom-classname',
                onConfirm: function(result) {
                    _self.region_code = result[2].value;
                    _self.region = result[0].label + " " + result[1].label + " " + result[2].label
                },
                id: 'doubleLinePicker'
            });
        },
        getCode() {
            if (this.codeBtn.disabled == "") {
                var param = {
                    mobile: this.mobile
                };
                if (!(/^1(3|4|5|7|8)\d{9}$/.test(param.mobile))) {
                    weui.alert("手机号码有误，请重填");
                    return false;
                };
                var p_obj = {
                    action: 'c=Zb&m=User&a=sendMobileCode',
                    param: param,
                    success: (response) => {
                        this.codeBtn = {
                            prompt: "重新发送(60)",
                            disabled: 'a_default'
                        };
                        var _self = this;
                        var time = 60;
                        var interval = setInterval(function() {
                            time--;
                            _self.codeBtn.prompt = "重新发送(" + time + ")";
                            if (time === 1) {
                                clearInterval(interval);
                                _self.codeBtn = {
                                    prompt: "重新发送",
                                    disabled: ''
                                }
                            };
                        }, 1000);
                    },
                    fail: (response) => {
                        weui.alert(response.msg)
                    }
                };
                AjaxHelper.PostRequest(p_obj);
            }

        },
        registered() {
            var param = {
                account: this.mobile,
                password: this.password,
                code: this.code,
                region_code: this.region_code
            };
           var str = /^(\d){6,20}$/;
            if (!str.exec(this.password)) {
                weui.alert("密码格式错误！");
                return
            } 
            var p_obj = {
                action: 'c=Zb&m=Register&a=registerByMobile',
                param: param,
                success: (response) => {
                    this.$router.push({
                        path: 'login'
                    });
                },
                fail: (response) => {
                    weui.alert(response.msg)
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
    .a_default {
        color: #e2e2e2;
    }
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
