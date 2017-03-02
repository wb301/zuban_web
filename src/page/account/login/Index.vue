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
                        <input class="weui-input" v-model="password" type="password" placeholder="请输入密码" />
                    </div>
                </div>
                <div class="weui-cell"></div>
                <a href="javascript:;" class="weui-btn weui-btn_primary" @click="login">登录</a>
                <div class="weui-flex">
                    <div class="weui-flex__item">
                        <router-link :to="{path: '/registered'}">手机快速注册</router-link>
                    </div>
                    <div class="weui-flex__item">
                        <router-link :to="{path: '/password/list'}">忘记/重置密码</router-link>
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
            pos: NormalHelper.getPostion(),
            openid: NormalHelper.getOpenId()
        }
    },
    beforeRouteEnter(to, from, next) {
        if (NormalHelper.userInfo().token == 1) {
            next();
        } else {
            next('/list');
        }
    },
    mounted() {},
    methods: {
        login() {
            var param = {
                account: this.mobile,
                password: this.password,
                latitude: this.pos.latitude,
                logitude: this.pos.logitude
            };
            if(this.openid != ''){
                param.openId = this.openid;
            }
            var mobile = param.account;
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
                weui.alert("手机号码有误，请重填");
                return false;
            };
            var str = /^(\w){6,20}$/;
            if (!str.exec(this.password)) {
                weui.alert("密码格式错误！");
                return
            }
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
    .weui-flex {
        margin: 21.5px 15px;
        a:link,
        a:visited {
            font-size: 14px;
            color: #4990E2;
        }
        >.weui-flex__item:nth-child(1) {
            text-align: left;
        }
        >.weui-flex__item:nth-child(2) {
            text-align: right;
        }
    }
    .weui-btn {
        margin: 10px 15px 0px 15px;
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
}
</style>
