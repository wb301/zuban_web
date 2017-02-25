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
                <div for="weuiAgree" class="weui-agree" v-if="this.next=='list'">
                    <div class="weui-agree__item"></div>
                    <div class="weui-agree__item">
                        <router-link :to="{path: '/login'}">已有帐号,去登录</router-link>
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
            codeBtn: {
                prompt: '获取验证码',
                disabled: ''
            },
            mobileCode: '',
            next: 'list',
            pos: NormalHelper.getPostion()
        }
    },
    mounted() {
        this.next = this.$route.params.next
        if(NormalHelper.userInfo().mobile){
            this.mobile = NormalHelper.userInfo().mobile;
        }
    },
    methods: {
        getCode() {
            if (this.codeBtn.disabled == "") {
                var param = {
                    mobile: this.mobile,
                    from: 2
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
            };
           var str = /^(\d){6,20}$/;
            if (!str.exec(this.password)) {
                weui.alert("密码格式错误！");
                return
            }
            var _self = this;
            var p_obj = {
                action: 'c=Zb&m=User&a=changePassword',
                param: param,
                success: (response) => {
                    alert("新密码已设置成功！")
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
            var _self = this;
            var p_obj = {
                action: 'c=Zb&m=Login&a=login',
                param: param,
                success: (response) => {
                    NormalHelper.setUserInfo(response);
                    this.$router.push({
                        path: '/'+_self.next
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
    .weui-agree{
        font-size: 14px;
        color: #4990E2;
        a:link ,a:visited{
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
