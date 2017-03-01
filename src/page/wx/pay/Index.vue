<template>
    <div>
        <div class="container-body">
        </div>
    </div>
</template>
<script>
import wx from 'weixin-js-sdk';
export default {
    components: {},
    data() {
        return {
        }
    },
    mounted() {
       this.wxPay();
    },
    methods: {
        wxPay(){
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx403ead26691402fb', // 必填，公众号的唯一标识
                timestamp: param.timestamp, // 必填，生成签名的时间戳
                nonceStr: param.noncestr, // 必填，生成签名的随机串
                signature: param.signJs,// 必填，调用js签名，
                jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，这里只写支付的
            });
            wx.chooseWXPay({
                timestamp: param.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: param.noncestr, // 支付签名随机串，不长于 32 位
                package: "prepay_id="+param.transNo, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: param.sign, // 支付签名
                success: function (res) {
                    if(res.errMsg == "chooseWXPay:ok"){
                    //alert("支付成功");
                        window.location.href = "/hims/weixin/pages/Order_ok.html?access_token="+getUrlParam("access_token");
                    }else{
                        alert(res.errMsg);
                    }
                },
                cancel: function(res){
                //alert('取消支付');
                }
            });
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
}
</style>
