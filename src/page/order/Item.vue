<template>
    <div>
        <div class="item-entry">
            <div class="wapper">
                <div class="head-wapper">
                    <div v-if="type==0" class="img-head">
                        <img :src="item.seller.head_img">
                        <span>{{item.seller.nick_name}}</span>
                    </div>
                    <div v-if="type==1" class="img-head">
                        <img :src="item.buyers.head_img">
                        <span>{{item.buyers.nick_name}}</span>
                    </div>
                    <div class="status" style="color:#E35257" v-if="item.status==0">{{item.status_name}}</div>
                    <div class="status" style="color:#4990E2" v-else>{{item.status_name}}</div>
                </div>
                <div class="info-wapper" v-if="item.order_type==1" @click="toDetails(item)">
                    <span class="img-info">
                        <img :src="item.productList[0].product.product_image">
                    </span>
                    <span class="info">{{item.productList[0].product.product_info}}</span>
                    <div class="price">
                        <span>{{item.price}}元/{{item.danwei}}</span>
                    </div>
                    <span class="num">x{{item.productList[0].num}}</span>
                </div>
                <div class="info-phone" v-else @click="phone()">
                    <div>
                        <span>购买联系方式</span>
                        <span>{{item.price}}元</span>
                    </div>
                    <div v-if="item.status==10">手机号码:{{item.seller.account}}</div>
                    <div v-if="item.status==0">支付后即可查看联系方式</div>
                </div>
                <div class="time-wapper">
                    <span class="time">{{item.create_time}}</span>
                    <div class="t-price">
                        <span>合计:</span>
                        <span>{{item.total_price}}元</span>
                    </div>
                </div>
                <div class="btn-wapper" v-if="item.order_type==1||(item.order_type==0&&item.status==0)">
                    <div v-show="type==1" @click="phone">
                        <img :src="contactBuyer" />
                    </div>
                    <div>
                        <div class="button-cancel" v-if="(type==0&&(item.status==0))" @click="cancel">取消订单</div>
                        <div class="button-shut" v-if="(type==1&&(item.status==0||item.status==1||item.status==5))" @click="shut">关闭订单</div>
                        <div class="button-confirm" v-if="(type==1&&(item.status==1))" @click="confirm">确认订单</div>
                        <div class="button-customer" v-if="(type==1&&(item.status==6||item.status==10))" @click="customer">联系客服</div>
                        <div class="button-refund" v-if="(type==0&&item.status==1)" @click="refund">申请退款</div>
                        <div class="button-cancelRe" v-if="(type==0&&item.status==11)" @click="cancelReturn">取消退款</div>
                        <div class="button-complete" v-if="(type==0&&(item.status==5))" @click="complete">服务完成</div>
                        <div class="button-payment" v-if="type==0&&item.status==0" @click="payment">付款</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import contactBuyer from './image/contact-the-buyer.png'
export default {
    props: {
        item: {
            type: Object,
            default: function() {
                return {};
            }
        },
        type: {
            type: Number,
            default: function() {
                return 0;
            }
        }
    },
    data() {
        return {
            contactBuyer: contactBuyer
        }
    },
    watch: {
        item: {
            handler: function() {
                this.item.danwei = "小时";
                if (this.item.price_type == 2) {
                    this.item.danwei = "天";
                } else if (this.item.price_type == 3) {
                    this.item.danwei = "次";
                }
            },
            immediate: true
        }
    },
    methods: {
        //联系买家
        phone() {
            if (this.item.order_type == 0) {
                if (this.item.status == 10) {
                    window.location.href = 'tel://' + this.item.seller.account;
                    return;
                }
            }
            window.location.href = 'tel://' + this.item.phone;
        },
        payment() { //付款
            var pay = {
                order_no: this.item.order_no,
                all_price: this.item.price,
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
                orderNo: this.item.order_no,
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.item.status = 9;
                    this.item.status_name = '已取消';
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
                check: this.item.status,
                orderNo: this.item.order_no
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.item.status = 15;
                    this.item.status_name = '交易关闭';
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        customer() { //联系客服
            window.location.href = 'tel://' + NormalHelper.userInfo().server_phone;
        },
        confirm() { //确认订单
            var param = {
                c: 'Zb',
                m: 'Order',
                a: 'deliveryOrder',
                orderNo: this.item.order_no
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.item.status = 5;
                    this.item.status_name = '进行中';
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
                orderNo: this.item.order_no
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.item.status = 11;
                    this.item.status_name = '退款中';
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
                orderNo: this.item.order_no
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.item.status = 1;
                    this.item.status_name = '待确认';
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
                orderNo: this.item.order_no
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.item.status = 6;
                    this.item.status_name = '已完成';
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        toDetails(item) {
            if (item.order_type == 1) {
                NormalHelper.Set("order_type", this.type);
                NormalHelper.Set("order_no", item.order_no);
                this.$router.push({
                    path: '/order-details'
                });
            }
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.item-entry {
    margin-bottom: 5px;
    .wapper {
        background: #FFFFFF;
        border-bottom: 1px solid #e2e2e2;
        position: relative;
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
                right: 20px;
                top: 0;
                bottom: 0;
                font-size: 14px;
            }
        }
        .info-wapper {
            position: relative;
            height: 87.5px;
            border-bottom: 1px solid #e2e2e2;
            .img-info {
                width: 60px;
                height: 60px;
                img {
                    margin-left: 15px;
                    margin-top: 14px;
                    width: 60px;
                    height: 60px;
                }
            }
            .info {
                font-size: 14px;
                width: 105px;
                color: #333333;
                margin-top: 14px;
                margin-left: 10px;
                position: absolute;
            }
            .price {
                position: absolute;
                color: #A878E5;
                margin-top: -70px;
                position: absolute;
                right: 20px;
                span {
                    font-size: 14px;
                }
            }
            .num {
                font-size: 14px;
                width: 40px;
                color: #333333;
                margin-top: 55px;
                right: 0px;
                position: absolute;
            }
        }
        .info-phone {
            height: 66px;
            border-bottom: 1px solid #e2e2e2;
            padding: 0 15px;
            position: relative;
            >div:nth-child(1) {
                padding-top: 10px;
                span {
                    font-size: 14px;
                }
                span:nth-child(1) {
                    color: #333333;
                }
                span:nth-child(2) {
                    color: #8760BA;
                    position: absolute;
                    right: 15px;
                }
            }
            >div:nth-child(2) {
                font-size: 12px;
                color: #999999;
            }
        }
        .time-wapper {
            position: relative;
            height: 45px;
            padding: 0 15px;
            line-height: 45px;
            border-bottom: 1px solid #e2e2e2;
            .time {
                font-size: 14px;
                color: #999999;
            }
            .t-price {
                position: absolute;
                top: 0;
                bottom: 0;
                right: 15px;
                font-size: 14px;
                span:nth-child(1) {
                    color: #333333;
                }
                span:nth-child(2) {
                    color: #A878E5;
                }
            }
        }
        .btn-wapper {
            height: 47px;
            line-height: 47px;
            padding: 0 15px;
            position: relative;
            >div:nth-child(1) {
                position: absolute;
                img {
                    height: 45px;
                    width: 68px;
                }
            }
            >div:nth-child(2) {
                position: absolute;
                top: -1px;
                bottom: 0;
                right: 15px;
                >div {
                    display: inline-block;
                }
                .button-payment,
                .button-cancel,
                .button-shut,
                .button-confirm,
                .button-customer,
                .button-refund,
                .button-cancelRe,
                .button-complete {
                    border-radius: 4px;
                    font-size: 12px;
                    width: 65px;
                    height: 28px;
                    text-align: center;
                    line-height: 28px;
                }
                .button-cancel,
                .button-shut,
                .button-customer,
                .button-cancelRe,
                .button-refund {
                    width: 63px;
                    height: 26px;
                    line-height: 26px;
                }
                //付款 // 确认订单 //服务完成
                .button-payment,
                .button-confirm,
                .button-complete {
                    background: #A878E5;
                    color: #FFFFFF;
                }
                // 取消订单 //关闭订单 //联系客服 //申请退款
                .button-cancel,
                .button-shut,
                .button-customer,
                .button-cancelRe,
                .button-refund {
                    color: #8760BA;
                    border: 1px solid #A878E5;
                }
            }
        }
        // .button-release {
        //     position: absolute;
        //     width: 65px;
        //     height: 28px;
        //     right: 20px;
        //     margin-top: 8.5px;
        //     background-color: #A877E6;
        //     text-align: center;
        //     color: #FFFFFF;
        // }
    }
}
</style>
