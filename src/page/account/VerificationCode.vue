<template>
    <div>
        <div class="code-wapper">
            <el-input v-model="mobileCode" placeholder="手机验证码"></el-input>
            <el-button :disabled="codeBtn.disabled" @click="actionSendMobileCode()">{{codeBtn.prompt}}</el-button>
        </div>
    </div>
</template>
<script>
export default {
    components: {

    },
    props: {
        mobile: ''
    },
    data() {
        return {
            codeBtn: {
                prompt: '获取验证码',
                disabled: false
            },
            mobileCode: ''
        }
    },
    created: function() {

    },
    mounted() {

    },
    methods: {
        actionSendMobileCode() {
            var _self = this;
            var param = {
                mobile: this.mobile,
            };
            var p_obj = {
                action: '/users/Login/SendMobileCode',
                param: param,
                success: (response) => {
                    _self.codeBtn = {
                        prompt: "重新发送(60)",
                        disabled: true
                    }
                    var time = 60;
                    var interval = setInterval(function() {
                        time--;
                        _self.codeBtn.prompt = "重新发送(" + time + ")";
                        if (time === 1) {
                            clearInterval(interval);
                            _self.codeBtn = {
                                prompt: "重新发送",
                                disabled: false
                            }
                        };
                    }, 1000);

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
.code-wapper {
    position: relative;
    margin-top: 20px;
    .el-input {
        margin-top: 0px;
    }
    .el-button {
        position: absolute;
        right: 0;
        top: 0;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }
}
</style>
