<template>
    <div>
        <div class="container-body">
            <div><span>扫描下方二维码，关注租伴网公众号</span></div>
            <img :src="qrcode" />
        </div>
    </div>
</template>
<script>
import qrcode from './image/qrcode.jpg'
export default {
    components: {

    },
    data() {
        return {
            qrcode: qrcode,
            order_no:'',
            order_price:0,
            orderType:1,
            openid: NormalHelper.userInfo().wx_openid,

        }
    },
    mounted() {
        this.orderType = NormalHelper.Get("pay_type")
        this.order_no = NormalHelper.Get("order_no")
        this.order_price = NormalHelper.Get("all_price")
    },
    methods: {
        prePay() {
            var that = this;
            if (NormalHelper.isWeixin()) {
                var p_obj = {
                    action: 'c=Zb&m=Order&a=prePay',
                    param: {
                        out_trade_no: this.order_no,
                        total_fee: parseFloat(this.order_price) * 100,
                        openid: this.openid
                    }
                };
                var serverUrl = p_obj.serverUrl || GlobalModel.SERVER_URL;
                Vue.http.post(serverUrl + p_obj.action, p_obj.param, {
                    emulateJSON: true
                }).then((response) => {
                    console.log(response);
                var payJson = {
                    appId: response.body.appid,
                    timeStamp: response.body.timeStamp + "",
                    nonceStr: response.body.nonceStr,
                    package: response.body.package,
                    signType: "MD5",
                    paySign: response.body.sign
                };
                WeixinJSBridge.invoke('getBrandWCPayRequest', payJson,
                        function(res) {
                            if(res == "get_brand_wcpay_request:ok"){
                                weui.alert("支付成功");
                            }else{
                                weui.alert("支付失败");
                            }
                            if(this.pay_type==1){
                                that.$router.push({
                                    path: '/buy_orderlist'
                                });
                            }else {
                                this.$router.push({
                                    path: '/vip'
                                });
                            }
                        }
                );
            }, (response) => {
                    //请求异常
                    weui.alert("支付异常!")
                })
            }
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    width: 100%;
    text-align: center;
    position: fixed;
    top: 200px;
    bottom: 300px;
    span {
        font-size: 14px;
        color: #333;
    }
    img {
        margin-top: 20px;
        width: 150px;
        height: 150px;
    }
}
</style>
