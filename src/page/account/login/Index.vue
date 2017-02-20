<template>
    <div>
        <div class="container-body">
            <div class="wapper-main">
                <div class="prompt-wapper">
                    <div>帐号登录</div>
                </div>
                <div class="content-wapper">
                    <el-input v-model="mobile" placeholder="您的手机号"></el-input>
                    <verification-code ref="verification" :mobile="mobile"></verification-code>
                    <el-button type="primary" class="login" @click="login()">登录</el-button>
                    <div class="prompt-regist">
                        还没有租伴网帐号？
                        <router-link :to="{path: '/registered'}">立即注册</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VerificationCode from '../VerificationCode'
export default {
    components: {
        VerificationCode
    },
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
a {
    text-decoration: none;
}

.title-wapper {
    font-size: 20px;
    text-align: center;
    margin-top: 40px;
}

.wapper-main {
    width: 358px;
    height: 398px;
    background: #FFFFFF;
    margin: auto;
    margin-top: 40px;
    .prompt-wapper {
        height: 50px;
        font-size: 14px;
        color: #1F2D3D;
        text-align: center;
        line-height: 50px;
    }
    .content-wapper {
        height: 347px;
        margin: 20px 50px;
        .el-input {
            margin-top: 20px;
        }
        .login {
            width: 100%;
            margin-top: 40px;
        }
        .prompt-regist {
            text-align: center;
            margin-top: 20px;
        }
    }
}
</style>
