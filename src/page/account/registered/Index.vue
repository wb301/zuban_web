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
                <div class="weui-cell" v-if="region_code==0">
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
                <div for="weuiAgree" class="weui-agree">
                    <div class="weui-agree__item">
                        <input id="weuiAgree" type="checkbox" class="weui-agree__checkbox" v-model="is_agree">同意
                        <router-link :to="{path: '/agree/registered'}">《租伴网入驻协议》</router-link>
                    </div>
                    <div class="weui-agree__item">
                        <router-link :to="{path: '/login'}">手机号已注册?</router-link>
                    </div>
                </div>
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
            is_agree: 1,
            codeBtn: {
                prompt: '获取验证码',
                disabled: ''
            },
            mobileCode: '',
            pos: NormalHelper.getPostion(),
            openid: NormalHelper.getOpenId()
        }
    },
    mounted() {
        if(this.$route.query.region){
            var region = JSON.parse(this.$route.query.region);
            this.region_code = region.code;
            this.region = region.name;
        }
        if(this.region_code == 0){
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
        }
    },
    methods: {
        checkAgree() {
            if (this.is_agree <= 0) {
                weui.alert("请先阅读《相关条款》");
                return;
            }
        },
        selectRegion() {
            var _self = this;
            weui.picker(this.regionList, {
                defaultValue: [2],
                className: 'custom-classname',
                onConfirm: function(result) {
                    _self.region_code = result[2].value;
                    _self.region = result[0].label + " " + result[1].label + " " + result[2].label;
                },
                id: 'doubleLinePicker'
            });
        },
        getCode() {
            this.checkAgree();
            if (this.codeBtn.disabled == "") {
                var param = {
                    mobile: this.mobile,
                    from: 1
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
            this.checkAgree();
            var param = {
                account: this.mobile,
                password: this.password,
                code: this.code,
                region_code: this.region_code,
                region_name: this.region,
                latitude: this.pos.latitude,
                logitude: this.pos.logitude
            };
            if (this.openid != '') {
                param.openId = this.openid;
            }
            var str = /^(\w){6,20}$/;
            if (!str.exec(this.password)) {
                weui.alert("密码格式错误！");
                return;
            }
            var _self = this;
            var p_obj = {
                action: 'c=Zb&m=Register&a=registerByMobile',
                param: param,
                success: (response) => {
                    this.login();
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        login() {
            var param = {
                account: this.mobile,
                password: this.password,
                latitude: this.pos.latitude,
                logitude: this.pos.logitude
            };
            var p_obj = {
                action: 'c=Zb&m=Login&a=login',
                param: param,
                success: (response) => {
                    NormalHelper.setUserInfo(response);
                    this.$router.push({
                        path: '/list'
                    });
                },
                fail: (response) => {
                    weui.alert(response.msg);
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
    .weui-cell__ft {
        a:link,
        a:visited {
            font-size: 16px;
            color: #4990E2;
        }
    }
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
        font-size: 14px;
        color: #4990E2;
        a:link,
        a:visited {
            font-size: 14px;
            color: #4990E2;
        }
        >.weui-agree__item:nth-child(1) {
            text-align: left;
            float: left;
        }
        >.weui-agree__item:nth-child(2) {
            text-align: right;
        }
    }
}
</style>
