<template>
    <div>
        <div class="container-body">
            <div content="product">
                <div class="head-wapper">
                    <div class="img-head">
                        <img :src="head_img">
                        <span>{{nick_name}}</span>
                    </div>
                    <div class="status" style="color:#E35257" v-if="orderDetails.status==0">{{orderDetails.status_name}}</div>
                    <div class="status" style="color:#4990E2" v-else>{{orderDetails.status_name}}</div>
                </div>
                <div class="service-information">
                    <div class="product_img">
                        <img :src="img_product">
                    </div>
                    <div class="product_content">{{category_name}}</div>
                    <div class="product_price">
                        <span>{{product.price}}元</span>
                        <span>/{{danwei}}</span>
                    </div>
                    <div class="product_num">
                        <span>x{{product.num}}</span>
                    </div>
                </div>
                <div class="order-time">
                    {{orderDetails.create_time}}
                    <span>合计：<span>{{orderDetails.price}}元</span></span>
                </div>
                <div class="order-phone">
                    {{type>0?'买':'卖'}}家联系方式&nbsp;&nbsp;{{orderDetails.status>=1?orderDetails.phone:'***********'}}
                    <span v-if="type==1&&orderDetails.status>=1"><img :src="lxmj" @click="customer(1)"></span>
                    <span v-if="type==0&&orderDetails.status>=1"><img :src="lxmj2" @click="customer(0)"></span>
                </div>
                <div class="message">
                    <div>留言</div>
                    <div content="liuyan">
                        {{orderDetails.memo}}
                    </div>
                </div>
                <div class="order-phone">
                    订单编号&nbsp;&nbsp;{{orderNo}}
                </div>
            </div>
        </div>
        <div class="button-wapper">
            <div>
                <div class="button-cancel" v-if="(type==0&&(orderDetails.status==0))" @click="cancel">取消订单</div>
                <div class="button-shut" v-if="(type==1&&(orderDetails.status==0||orderDetails.status==1||orderDetails.status==5))" @click="shut">关闭订单</div>
                <div class="button-confirm" v-if="(type==1&&(orderDetails.status==1))" @click="confirm">确认订单</div>
                <div class="button-customer" v-if="(type==1&&(orderDetails.status==6||orderDetails.status==10))" @click="customer">联系客服</div>
                <div class="button-refund" v-if="(type==0&&orderDetails.status==1)" @click="refund">申请退款</div>
                <div class="button-cancelRe" v-if="(type==0&&orderDetails.status==11)" @click="cancelReturn">取消退款</div>
                <div class="button-complete" v-if="(type==0&&(orderDetails.status==5))" @click="complete">服务完成</div>
                <div class="button-payment" v-if="(type==0&&(orderDetails.status==0))" @click="payment">付款</div>
            </div>
        </div>
    </div>
</template>
<script>
import lxmj from './image/lxmj.png'
import lxmj2 from './image/lxmj2.png'
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
            lxmj2: lxmj2,
            num: 1,
            price: 0,
            danwei: '',
            category_name: ''

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
                orderNo: this.orderNo,
                type: this.type
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
                    this.category_name = response.productList.product.category_name;
                    //0是买家看卖家，1是卖家看买家
                    if (this.type == 0) {
                        this.head_img = response.seller.head_img;
                        this.nick_name = response.seller.nick_name;
                    } else {
                        this.head_img = response.buyers.head_img;
                        this.nick_name = response.buyers.nick_name;
                    }
                    this.status_name = response.status_name;
                    this.img_product = response.productList.product.product_image;
                    if (response.productList.product.price_type == 1) {
                        this.danwei = '小时';
                    }
                    if (response.productList.product.price_type == 2) {
                        this.danwei = '天';
                    }
                    if (response.productList.product.price_type == 3) {
                        this.danwei = '次';
                    }
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },

        payment() { //付款
            var pay = {
                order_no: this.orderNo,
                all_price: this.orderDetails.price,
                pay_type: 1
            }
            NormalHelper.Set("pay", pay);
            this.$router.push({
                path: '/payment'
            });
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
                    this.orderDetails.status_name = '已取消';
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
                check: this.orderDetails.status
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.orderDetails.status = 15;
                    this.orderDetails.status_name = '交易关闭';
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
                    this.orderDetails.status_name = '进行中';
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
                    this.orderDetails.status_name = '退款中';
                    weui.alert("已提交申请等待后台审核");
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        cancelReturn() { //取消退款
            var param = {
                c: 'Zb',
                m: 'Order',
                a: 'cancelReturn',
                orderNo: this.orderNo
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.orderDetails.status = 1;
                    this.orderDetails.status_name = '待确认';
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
                    this.orderDetails.status_name = '已完成';
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        customer(type) { //联系买家
            if (type > -1) {
                if (type > 0) {
                    window.location.href = 'tel://' + this.orderDetails.phone;
                } else {
                    window.location.href = 'tel://' + this.orderDetails.seller.account;
                }
            } else {
                window.location.href = 'tel://'+NormalHelper.userInfo().server_phone;
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
    bottom: 0;
    .head-wapper {
        position: relative;
        height: 46px;
        border-bottom: 1px solid #e2e2e2;
        line-height: 46px;
        .img-head {
            height: 100%;
            margin-left: 50%;
            padding-left: 15px;
            position: relative;
            right: 50%;
            img {
                width: 27px;
                height: 27px;
                border-radius: 50%;
                position: absolute;
                top: 9.5px;
            }
            span {
                position: absolute;
                left: 52px;
                font-size: 14px;
                color: #333333;
            }
        }
        .status {
            position: absolute;
            right: 15px;
            top: 0;
            bottom: 0;
            font-size: 14px;
        }
    }
    .service-information {
        height: 117.5px;
        border-bottom: 1px solid #E2E2E2;
        padding-left: 15px;
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
    .order-time {
        height: 45px;
        line-height: 45px;
        padding: 0 15px;
        border-bottom: 1px solid #e2e2e2;
        font-size: 14px;
        color: #999999;
        span:nth-child(1) {
            float: right;
            color: #333333;
            span {
                color: #8760BA;
            }
        }
    }
    .order-phone {
        height: 45px;
        line-height: 45px;
        padding: 0 15px;
        border-bottom: 1px solid #e2e2e2;
        font-size: 14px;
        color: #666666;
        span:nth-child(1) {
            float: right;
            img {
                height: 45px;
                width: 68px;
            }
        }
    }
    .message {
        padding-left: 15px;
        padding-bottom: 16px;
        border-bottom: 1px solid #E2E2E2;
        div:first-child {
            font-size: 14px;
            color: #666;
            margin: 15px 0px 15px;
        }
        div:last-child {
            margin-right: 15px;
            font-size: 14px;
            color: #BBBBBB;
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
        position: absolute;
        top: 0;
        bottom: 0;
        right: 15px;
        margin-top: 11px;
        .button-cancel,
        .button-shut,
        .button-confirm,
        .button-customer,
        .button-cancelRe,
        .button-refund,
        .button-complete,
        .button-payment {
            display: inline-block;
            text-align: center;
            padding: 3.5px 8.5px;
            color: #8760BA;
            border: 1px solid #A878E5;
            border-radius: 8px;
            font-size: 12px;
        }
    }
}
</style>
