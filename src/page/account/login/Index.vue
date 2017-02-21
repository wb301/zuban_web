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
                        <a href="">忘记密码</a>
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
            password: ''
        }
    },
    mounted() {

    },
    methods: {
        login() {
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
                    sweetAlert(response.msg)
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
    .weui-btn,
    .weui-flex {
        margin: 0 15px;
        >.weui-flex__item:nth-child(1) {
            text-align: left;
        }
        >.weui-flex__item:nth-child(2) {
            text-align: right;
        }
    }
}
</style>
