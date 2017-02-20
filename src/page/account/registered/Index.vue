<template>
    <div>
        <div class="container-body">
            <div class="title-wapper">租伴网</div>
            <div class="wapper-main">
                <div class="prompt-wapper">
                    <div>注册帐号</div>
                </div>
                <div class="content-wapper">
                    <el-input v-model="mobile" placeholder="您的手机号"></el-input>
                    <verification-code ref="verification" :mobile="mobile"></verification-code>
<!--                     <div class="radio-wapper">
                        类型:
                        <el-radio class="radio" v-model="radio" label="1">个人</el-radio>
                        <el-radio class="radio" v-model="radio" label="2">企业</el-radio>
                    </div> -->
                    <el-input v-model="userName" :placeholder="placeholder[radio]"></el-input>
                    <el-button type="primary" class="regist" @click="registerByMobile()">注册</el-button>
                    <div class="prompt-login">
                        已有租伴网帐号？
                        <router-link :to="{path: '/login'}">直接登录</router-link>
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
            mobile: '',
            // radio: '1',
            // placeholder: {
            //     '1': '用户名',
            //     '2': '企业名称',
            // },
            userName: ''
        }
    },
    mounted() {

    },
    methods: {
        registerByMobile() {
            var param = {
                mobile: this.mobile,
                code: this.$refs.verification.mobileCode,
                userName: this.userName
            };
            var p_obj = {
                action: '/users/Register/RegisterByMobile',
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
    height: 508px;
    background: #FFFFFF;
    border: 1px solid #D3DCE6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    margin: auto;
    margin-top: 40px;
    .prompt-wapper {
        height: 50px;
        border-bottom: 1px solid #E0E6ED;
        font-size: 14px;
        color: #1F2D3D;
        text-align: center;
        line-height: 50px;
    }
    .content-wapper {
        height: 457px;
        margin: 20px 50px;
        .el-input,
        .radio-wapper {
            margin-top: 20px;
        }
        .regist {
            width: 100%;
            margin-top: 40px;
        }
        .prompt-login {
            margin-top: 20px;
        }
    }
}
</style>
