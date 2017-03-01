<template>
    <div>
        <div class="container-body">
            <div class="user-information">
                <div class="user-portrait">
                    <img :src="img_meinv">
                </div>
                <div class="user-info">
                    <div>Kyumi琪</div>
                    <div><img :src="gender_icon[1]"></div>
                </div>
            </div>
            <div class="service-information">
                <div>
                    <div v-if="type==2">陪逛街</div>
                    <div v-else>购买联系方式</div>
                    <div>
                        <span>￥</span>
                        <span v-text="type==2?productInfo.price:productInfo.look_price">179</span>
                        <span>/{{type==2?productInfo.price_type == 1 ? '小时' : productInfo.price_type == 2 ? '天' : '次' :'元'}}</span>
                    </div>
                </div>
                <div v-if="type==2">
                    <img :src="quantity>0?btn_less[1]:btn_less[2]" @click="quantity>0?quantity--:''">
                    <span> {{quantity}} </span>
                    <img :src="quantity<9999?btn_plus[1]:btn_plus[2]" @click="quantity<9999?quantity++:''">
                </div>
            </div>
            <div v-if="type==2">
                <div class="weui-cell phone">
                    <div class="weui-cell__hd">
                        <label class="weui-label">您的联系方式</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="test" v-model="contact_information" placeholder="请输入联系方式" />
                    </div>
                </div>
                <div class="message">
                    <div>留言</div>
                    <div>
                        <textarea class="weui-textarea" placeholder="请输入文本" rows="5" v-model="memo"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-wapper">
            <div class="button-buy">
                <label>ca</label>合计：<span>{{allPrice}}元</span></div>
            <div class="button-confirm" @click="createOrder">确认支付</div>
        </div>
    </div>
</template>
<script>
import nan from '../product/image/nan.png'
import nv from '../product/image/nv.png'
import meinv from '../service-list/release/image/Artboard6.jpg'

import less_1 from './image/less_1.png'
import less_2 from './image/less_2.png'
import plus_1 from './image/plus_1.png'
import plus_2 from './image/plus_2.png'

// function onBridgeReady() {
//     WeixinJSBridge.invoke(
//         'getBrandWCPayRequest', {
//             "appId": "wx2421b1c4370ec43b", //公众号名称，由商户传入     
//             "timeStamp": " 1395712654", //时间戳，自1970年以来的秒数     
//             "nonceStr": "e61463f8efa94090b1f366cccfbbb444", //随机串     
//             "package": "prepay_id=u802345jgfjsdfgsdg888",
//             "signType": "MD5", //微信签名方式:     
//             "paySign": "70EA570631E4BB79628FBCA90534C63FF7FADD89", //微信签名
//             "total_fee": 100
//         },
//         function(res) {
//             if (res.err_msg == "get_brand_wcpay_request:ok") {} // 使用以上方式判断前端返回,微信团队郑重提示:res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
//         }
//     );
// }

// if (typeof WeixinJSBridge == "undefined") {
//     if (document.addEventListener) {
//         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
//     } else if (document.attachEvent) {
//         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
//         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
//     }
// } else {
//     onBridgeReady();
// }

export default {
    components: {},
    data() {
        return {
            gender_icon: {
                1: nan,
                2: nv
            },
            img_meinv: meinv,
            btn_less: {
                1: less_1,
                2: less_2
            },
            btn_plus: {
                1: plus_1,
                2: plus_2
            },
            quantity: 1,
            contact_information: NormalHelper.userInfo().account,
            memo: '',
            type: this.$route.params.type,
            productCode: this.$route.params.productCode,
            productInfo: {},
            allPrice: 0,
            order_no: '',
            order_price: ''
        }
    },
    mounted() {
        // console.log(NormalHelper.userInfo());
        this.getProductInfo();
        this.getOderPrice();
    },
    watch: {
        quantity: function() {
            this.getOderPrice();
        }
    },
    methods: {
        getProductInfo() {
            var param = {
                c: 'Zb',
                m: 'Product',
                a: 'getProductInfo',
                productCode: this.productCode
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.productInfo = response;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        getOderPrice() {
            var param = {
                c: 'Zb',
                m: 'Order',
                a: 'getOderPrice',
                productSysCode: this.productCode,
                num: this.type == 1 ? 1 : this.quantity,
                type: this.type == 1 ? 0 : 1
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.allPrice = response.product.allPrice;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        createOrder() {
            var param = {
                memo: this.memo,
                phone: this.contact_information,
                allPrice: this.allPrice,
                order_type: this.type == 1 ? 0 : 1,
                //地区code
                source: NormalHelper.userInfo().region_code,
                receiver: NormalHelper.userInfo().nick_name,
                //时间戳
                check_code: Date.parse(new Date()),
                paymentAry: {
                    payment: 'ON_LINE',
                    pay_type: 'WX'
                },
                cartList: [{
                    product_sys_code: this.productInfo.product_sys_code,
                    num: this.quantity
                }],
            };
            param.paymentAry = JSON.stringify(param.paymentAry);
            param.cartList = JSON.stringify(param.cartList)
            var p_obj = {
                action: 'c=Zb&m=Order&a=createOrder',
                param: param,
                success: (response) => {
                    this.order_no = response.order_no;
                    this.order_price = response.price;
                    this.prePay();
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        prePay() {
            console.log(NormalHelper.isWeixin());
            if (NormalHelper.isWeixin()) {
                var p_obj = {
                    action: 'c=Zb&m=Order&a=prePay',
                    param: {
                        out_trade_no: this.order_no,
                        total_fee: this.order_price,
                        openid: 'oAnh1wZJm5gxyIk0OrzYJjAUUCVw'
                    }
                };
                var serverUrl = p_obj.serverUrl || GlobalModel.SERVER_URL;
                Vue.http.post(serverUrl + p_obj.action, p_obj.param, {
                    emulateJSON: true
                }).then((response) => {
                    console.log(response);
                    var payJson = {
                        appId: response.body.appid,
                        nonceStr: response.body.nonceStr,
                        package: "prepay_id=" + response.body.prePayId,
                        paySign: response.body.sign,
                        signType: "MD5",
                        timeStamp: response.body.timeStamp
                    };
                    WeixinJSBridge.invoke('getBrandWCPayRequest', payJson,
                        function(res) {
                            console.log(res);
                            //myApp.alert(res.err_msg);
                        }
                    );
                }, (response) => {
                    //请求异常
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
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    margin-left: 15px;
    .user-information,
    .service-information {
        border-bottom: 1px solid #E2E2E2;
    }
    .user-information {
        height: 75px;
        position: relative;
        >div {
            display: inline-block;
        }
        .user-portrait {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            overflow: hidden;
            margin: 15px 0;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .user-info {
            position: absolute;
            top: 0;
            bottom: 0;
            margin-left: 15px;
            >div:nth-child(1) {
                font-size: 15px;
                color: #333;
                margin-top: 18.5px;
            }
            >div:nth-child(2) {
                height: 15.1px;
                width: 15.7px;
                >img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .service-information {
        height: 70px;
        position: relative;
        >div {
            >div:nth-child(1) {
                margin-top: 7.5px;
                font-size: 13px;
                color: #333;
            }
            >div:nth-child(2) {
                color: #A878E5;
                margin-top: 5px;
                span:nth-child(1) {
                    font-size: 12px;
                }
                span:nth-child(2) {
                    font-size: 17px;
                }
                span:nth-child(3) {
                    font-size: 10px;
                }
            }
        }
        >div:nth-child(2) {
            width: 100px;
            position: absolute;
            right: 20px;
            top: 0;
            bottom: 7.5px;
            line-height: 60px;
            text-align: right;
            span {
                font-size: 16px;
                margin-bottom: 1px;
                vertical-align: middle;
            }
            img {
                vertical-align: middle;
                width: 14px;
                height: 14px;
            }
        }
    }
    .weui-cell.phone {
        padding-left: 0;
        font-size: 14px;
        border-bottom: 1px solid #E2E2E2;
        .weui-input {
            text-align: right;
            color: #666666;
        }
    }
    .weui-cell.phone:before {
        border: 0;
    }
    .message {
        div:first-child {
            font-size: 14px;
            color: #666;
            margin: 15px 0;
        }
        div:last-child {
            margin-right: 15px;
            textarea {
                font-size: 13px;
                color: #BBBBBB;
            }
        }
    }
}

.button-wapper {
    height: 50px;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    >div {
        width: 50%;
        float: left;
    }
    .button-buy {
        font-size: 14px;
        background-color: #FFFFFF;
        line-height: 50px;
        color: #333333;
        label {
            visibility: hidden;
        }
        span {
            color: #8760BA;
        }
    }
    .button-confirm {
        font-size: 16px;
        background-color: #A877E6;
        line-height: 50px;
        text-align: center;
        color: #FFFFFF;
    }
}
</style>
