<template>
    <div>
        <div class="container-body">
            <div content="product">
                <div class="user-information">
                    <div class="user-portrait">
                        <img :src="head_img">
                    </div>
                    <div class="user-info">
                        <div>{{nick_name}}</div>
                    </div>
                    <div class="order-status">
                        <div>{{orderDetails.status_name}}</div>
                    </div>
                </div>
                <div class="service-information">
                    <div class="product_img">
                        <img :src="img_product">
                    </div>
                    <div class="product_content">{{product.category_name}}</div>
                    <div class="product_price">
                        <span>{{product.price}}</span>
                        <span>/{{danwei}}</span>
                    </div>
                    <div class="product_num">
                        <span>x{{product.num}}</span>
                    </div>
                </div>
                <div>
                </div>
                <div content="order">
                    <div class="weui-cell time">
                        <div class="weui-cell__hd">
                            <label class="weui-label">{{orderDetails.create_time}}</label>
                        </div>
                        <div class="weui-cell__bd"></div>
                        <div class="weui-cell__ft">
                            <span>合计：</span>
                            <span>{{orderDetails.price}}</span>
                            <span>元</span>
                        </div>
                    </div>
                    <div class="weui-cell phone">
                        <div class="weui-cell__hd">
                            <label class="weui-label">买家联系方式</label>
                        </div>
                        <div class="weui-cell__bd">
                            {{orderDetails.phone}}
                        </div>
                        <div class="weui-cell__bd"></div>
                        <div class="weui-cell__ft" v-if="(type==1)">
                            <span><img :src="lxmj" @click="customer"></span>
                        </div>
                    </div>
                </div>
                <div class="message">
                    <div>留言</div>
                    <div content="liuyan">
                        {{orderDetails.memo}}
                    </div>
                </div>
                <div class="weui-cell order_no">
                    <div class="weui-cell__hd">
                        <label class="weui-label">订单编号</label>
                    </div>
                    <div class="weui-cell__bd">
                        {{orderNo}}
                    </div>
                </div>
            </div>
        </div>
        <div class="button-wapper">
            <div>
                <div class="button-cancel" v-if="(type==0&&(orderDetails.status==0))" @click="cancel">取消订单</div>
                <div class="button-shut" v-if="(type==1&&(orderDetails.status==0||orderDetails.status==1||orderDetails.status==5))" @click="shut">关闭订单</div>
                <div class="button-confirm" v-if="(type==1&&(orderDetails.status==1))" @click="confirm">确认订单</div>
                <div class="button-customer" v-if="(type==1&&(orderDetails.status==6||orderDetails.status==10))" @click="customer">联系客服</div>
                <div class="button-refund" v-if="(type==0&&(orderDetails.status==6||orderDetails.status==10||orderDetails.status==1||orderDetails.status==5))" @click="refund">申请退款</div>
                <div class="button-complete" v-if="(type==0&&(orderDetails.status==5))" @click="complete">服务完成</div>
                <div class="button-payment" v-if="(type==0&&(orderDetails.status==0))" @click="payment">付款</div>
            </div>
        </div>
    </div>
</template>
<script>
import 'src/lib/js/dropload.min.js'
import 'src/lib/css/dropload.css'

import lxmj from './image/lxmj.png'
export default {
    components: {

    },
    data() {
        return {
            orderDetails: {},
            product: {},
            openid: NormalHelper.userInfo().wx_openid,
            type: 0, //0是买家查看订单 1 卖家查看订单
            orderNo: '',
            head_img: '',
            nick_name: '',
            img_product: '',
            status_name: '',
            lxmj: lxmj,
            num: 1,
            price: 0,
            danwei: ''

        }
    },
    mounted() {
        this.type = NormalHelper.Get("order_type")
        this.orderNo = NormalHelper.Get("order_no")
        this.getOrderDetails();
    },
    methods: {

        //订单详情
        getOrderDetails() {
            var param = {
                c: 'Zb',
                m: 'Order',
                a: 'getOrderDetails',
                orderNo: this.orderNo
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    if (response.length <= 0) {
                        weui.alert('网络异常！')
                    }
                    this.orderDetails = response;
                    this.product = response.productList;

                    //0是买家看卖家，1是卖家看买家
                    if (this.type == 0) {
                        this.head_img = response.seller.head_img;
                        this.nick_name = response.seller.nick_name;
                    } else {
                        this.head_img = response.buyers.head_img;
                        this.nick_name = response.buyers.nick_name;
                    }
                    this.status_name = response.status_name;
                    this.img_product=response.productList.product.product_image;
            if(response.productList.product.price_type==1){
                this.danwei='小时';
            }
            if(response.productList.product.price_type==2){
                this.danwei='天';
            }
            if(response.productList.product.price_type==3){
                this.danwei='次';
            }

                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },

        payment() { //付款
            var that = this;
            console.log(NormalHelper.isWeixin());
            if (NormalHelper.isWeixin()) {
                var p_obj = {
                    action: 'c=Zb&m=Order&a=prePay',
                    param: {
                        out_trade_no: this.orderNo,
                        total_fee: parseFloat(this.orderDetails.price) * 100,
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
                            console.log(res);
                            if(res == "get_brand_wcpay_request:ok"){
                                weui.alert("支付成功");
                                that.$router.push({
                                    path: '/buy_orderlist'
                                });
                            }else{
                                weui.alert("支付失败");
                            }
                        }
                );
            }, (response) => {
                    //请求异常
                })
            }
        },
        cancel() { //取消订单
             var param = {
                 c: 'Zb',
                 m: 'Order',
                 a: 'orderCancel',
                 orderNo: this.orderNo
             };
             var p_obj = {
                 action: '',
                 param: param,
                 success: (response) => {
                     this.orderDetails.status = 9;
                     this.orderDetails.status_name='已取消';
                 },
                 fail: (response) => {
                     weui.alert(response.msg)
                 }
             };
             AjaxHelper.GetRequest(p_obj);
        },
        shut() { //关闭订单
             var param = {
                 c: 'Zb',
                 m: 'Order',
                 a: 'orderShut',
                 orderNo: this.orderNo,
                 check:this.orderDetails.status
             };
             var p_obj = {
                 action: '',
                 param: param,
                 success: (response) => {
                     this.orderDetails.status = 15;
                     this.orderDetails.status_name='交易关闭';
                 },
                 fail: (response) => {
                     weui.alert(response.msg)
                 }
             };
             AjaxHelper.GetRequest(p_obj);
        },
        confirm() { //确认订单
            var param = {
                c: 'Zb',
                m: 'Order',
                a: 'deliveryOrder',
                orderNo: this.orderNo
            };
            var p_obj = {
                        action: '',
                        param: param,
                        success: (response) => {
                        this.orderDetails.status = 5;
                        this.orderDetails.status_name='进行中';
        },
            fail: (response) => {
                weui.alert(response.msg)
            }
        };
            AjaxHelper.GetRequest(p_obj);
        },
        refund() { //申请退款
            var param = {
                c: 'Zb',
                m: 'Order',
                a: 'orderReturn',
                orderNo: this.orderNo
            };
            var p_obj = {
                        action: '',
                        param: param,
                        success: (response) => {
                        this.orderDetails.status = 11;
                        this.orderDetails.status_name='退款中';
                        weui.alert("已提交申请等待后台审核");
        },
            fail: (response) => {
                weui.alert(response.msg)
            }
        };
            AjaxHelper.GetRequest(p_obj);
        },
        complete() { //服务完成
            var param = {
                c: 'Zb',
                m: 'Order',
                a: 'orderConfirm',
                orderNo: this.orderNo
            };
            var p_obj = {
                        action: '',
                        param: param,
                        success: (response) => {
                        this.orderDetails.status = 6;
                        this.orderDetails.status_name='已完成';
        },
            fail: (response) => {
                weui.alert(response.msg)
            }
        };
            AjaxHelper.GetRequest(p_obj);
        },
        customer() { //联系买家
            window.location.href = 'tel://'+this.orderDetails.phone;
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
        height: 40px;
        position: relative;
        > div {
            display: inline-block;
        }
        .user-portrait {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            overflow: hidden;
            margin: 10px 0;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .user-info {
            position: absolute;
            top: 0;
            bottom: 0;
            margin-left: 10px;
            > div:nth-child(1) {
                font-size: 12px;
                color: #333;
                margin-top: 15.5px;
            }
            > div:nth-child(2) {
                height: 15.1px;
                width: 15.7px;
                > img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .order-status {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 20px;
            > div:nth-child(1) {
                font-size: 12px;
                color: #333;
                margin-top: 15.5px;
            }
            > div:nth-child(2) {
                height: 15.1px;
                width: 15.7px;
            }
        }
    }
}

.service-information {
    height: 117.5px;
    position: relative;
    .product_price {
        color: #8760BA;
        width: 100px;
        position: absolute;
        right: 15px;
        top: 15px;
        bottom: 7.5px;
        line-height: 14px;
        text-align: right;
        span {
            font-size: 14px;
            margin-bottom: 1px;
            vertical-align: middle;
        }
    }
    .product_num {
        color: #000000;
        width: 40px;
        position: absolute;
        right: 15px;
        bottom: 16px;
        line-height: 14px;
        text-align: right;
        span {
            font-size: 14px;
            margin-bottom: 1px;
            vertical-align: middle;
        }
    }
    .product_img {
        width: 100px;
        height: 100px;
        left: 5px;
        margin-top: 15.5px;
        float: left;
        img {
            width: 90px;
            height: 90px;
        }
    }
    .product_content {
        color: #333;
        font-size: 14px;
        width: 110px;
        height: 28px;
        overflow: auto;
        float: left;
        margin-top: 14px;
        margin-left: 5px;
    }
}

.weui-cell.phone {
    padding-left: 0;
    font-size: 14px;
    border-bottom: 1px solid #E2E2E2;
    .weui-label {
        text-align: right;
        width: 85px;
    }
    .weui-cell__bd {
        text-align: left;
        margin-left: 10px;
    }
    .weui-cell__ft {
        img {
            height: 35px;
            width: 50px;
        }
    }
}

.weui-cell.time {
    padding-left: 0;
    font-size: 14px;
    border-bottom: 1px solid #E2E2E2;
    .weui-label {
        width: 150px;
    }
    .weui-cell__ft {
        color: #333;
        span:nth-child(2) {
            color: #8760BA;
        }
        span:nth-child(3) {
            color: #8760BA;
        }
    }
}

.weui-cell.order_no {
    padding-left: 0;
    font-size: 14px;
    border-bottom: 1px solid #E2E2E2;
    text-align: left;
    .weui-cell__bd {
        text-align: right;
    }
}

.message {
    margin-bottom: 16px;
    div:first-child {
        font-size: 14px;
        color: #666;
        margin: 15px 0px 15px;
    }
    div:last-child {
        margin-right: 15px;
        font-size: 13px;
        color: #BBBBBB;
    }
}

.button-wapper {
    height: 50px;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    > div {
        width: 100%;

    }
    .button-complete {
        font-size: 16px;
        background-color: #A877E6;
        line-height: 50px;
        text-align: center;
        color: #FFFFFF;
        float: right;
        width:50%;
    }
.button-refund {
    font-size: 16px;
    background-color: #A877E6;
    line-height: 50px;
    text-align: center;
    color: #FFFFFF;
    float: right;
    width:50%;
}
.button-customer {
    font-size: 16px;
    background-color: #A877E6;
    line-height: 50px;
    text-align: center;
    color: #FFFFFF;
    float: right;
    width:50%;
}
.button-confirm {
    font-size: 16px;
    background-color: #A877E6;
    line-height: 50px;
    text-align: center;
    color: #FFFFFF;
    float: right;
    width:50%;
}
.button-shut {
    font-size: 16px;
    background-color: #A877E6;
    line-height: 50px;
    text-align: center;
    color: #FFFFFF;
    float: right;
    width:50%;
}
.button-cancel {
    font-size: 16px;
    background-color: #A877E6;
    line-height: 50px;
    text-align: center;
    color: #FFFFFF;
    float: right;
    width:50%;
}
.button-payment {
    font-size: 16px;
    background-color: #A877E6;
    line-height: 50px;
    text-align: center;
    color: #FFFFFF;
    width:50%;
    float: right;
}
}
</style>
