<template>
    <div>
        <div class="container-body">
            <div class="weui-cells">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <input class="weui-input" v-model="mobile" type="text" placeholder="请输入您的手机号" />
                    </div>
                </div>
                <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="tel" placeholder="请输入手机号">
                    </div>
                    <div class="weui-cell__ft">
                        <a href="javascript:;" class="weui-vcode-btn">获取验证码</a>
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
            mobile: ''
        }
    },
    mounted() {

    },
    methods: {
        login() {
            var param = {
                mobile: this.mobile,
                code: this.$refs.verification.mobileCode
            };
            var p_obj = {
                action: '/users/Login/Login',
                param: param,
                success: (response) => {
                    NormalHelper.setCookie(GlobalModel.COOKIE_USER_INFO, response);
                    this.$router.push({
                        path: '/dashboard'
                    });
                },
                fail: (response) => {
                    sweetAlert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    
}
</style>
