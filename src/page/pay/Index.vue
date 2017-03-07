<template>
    <div>
        <div class="container-body">
            <div class="pay-wapper">
                <div class="weui-cell weui-cell_access" @click="pay('wx')">
                    <div class="weui-cell__bd">
                        <img :src="wx">
                        <p class="font_size">微信支付</p>
                        <p class="font_size">微信安全支付</p>
                    </div>
                    <div class="weui-cell__ft">
                    </div>
                </div>
                <div class="weui-cell weui-cell_access" @click="pay('zfb')" v-if="!isWeixin">
                    <div class="weui-cell__bd">
                        <img :src="zfb">
                        <p class="font_size">支付宝支付</p>
                        <p class="font_size">支付宝安全支付</p>
                    </div>
                    <div class="weui-cell__ft">
                    </div>
                </div>
            </div>
            <div class="qrcode-wapper">
                <p class="title">公众号二维码</p>
                <div>
                    <img :src="qrcode">
                </div>
                <p class="content">说明：暂不支持浏览器付款 扫描下方二维码，关注租伴网公众号</p>
            </div>
        </div>
    </div>
</template>
<script>
import qrcode from '../my-info/image/qrcode.jpg'
import wx from './image/wx.png'
import zfb from './image/zfb.png'
export default {
    components: {

    },
    data() {
        return {
            zfb: zfb,
            wx: wx,
            qrcode: qrcode,
            order_no: '',
            order_price: 0,
            orderType: 1,
            openid: NormalHelper.userInfo().wx_openid,
            isWeixin: NormalHelper.isWeixin()
        }
    },
    mounted() {
        var payInfo = NormalHelper.Get("pay");
        this.orderType = payInfo.pay_type;
        this.order_no = payInfo.order_no;
        this.order_price = payInfo.all_price;
    },
    methods: {
        pay(type) {
            if (type == "zfb") {
                weui.alert('支付宝暂不支持');
                return;
            }
            this.prePay();
        },
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
                            if (res == "get_brand_wcpay_request:ok") {
                                weui.alert("支付成功");
                            } else {
                                weui.alert("支付失败");
                            }
                            if (this.pay_type == 1) {
                                that.$router.push({
                                    path: '/buy_orderlist'
                                });
                            } else {
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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .weui-cell:before {
        border: 0;
    }
    .weui-cell {
        border-bottom: 1px solid #d9d9d9;
    }
    .weui-cell__bd {
        >img {
            width: 40px;
            height: 40px;
            position: absolute;
            left: 15px;
        }
        >p {
            margin-left: 50px;
        }
        >p:nth-child(2) {
            font-size: 14px;
            color: #333333;
        }
        >p:nth-child(3) {
            font-size: 12px;
            color: #999999;
        }
    }
    .qrcode-wapper {
        padding-bottom: 5px;
        border-bottom: 1px solid #d9d9d9;
        >.title {
            margin-left: 15px;
            padding: 10px 0px;
            font-size: 14px;
            color: #666666;
        }
        >div:nth-child(2) {
            text-align: center;
            margin-top: 25px;
            img {
                height: 205px;
                width: 205px;
                background: #FFFFFF;
                border: 1px solid #E2E2E2;
            }
        }
        >.content {
            margin-top: 25px;
            text-align: center;
            font-size: 12px;
            color: #E35257;
            line-height: 30px;
        }
    }
}
</style>
