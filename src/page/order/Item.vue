<template>
    <div>
        <div class="item-entry">
            <div class="wapper">
                <div class="head-wapper">
                    <div class="img-head">
                        <img :src="item.seller.head_img">
                        <span>{{item.seller.nick_name}}</span>
                    </div>
                    <div class="status" style="color:#E35257" v-if="item.status==0">{{item.status_name}}</div>
                    <div class="status" style="color:#4990E2" v-if="item.status==1||item.status==5||item.status==6||item.status==10">{{item.status_name}}</div>
                </div>
                <div class="info-wapper" v-if="item.order_type==1">
                    <span class="img-info">
                        <img :src="item.productList[0].product.product_image">
                    </span>
                    <span class="info">{{item.productList[0].product.product_info}}</span>
                    <div class="price">
                        <span>{{item.price}}元/{{item.danwei}}</span>
                    </div>
                    <span class="num">x{{item.productList[0].num}}</span>
                </div>
                <div class="info-phone" v-else>
                    <div>
                        <span>购买联系方式</span>
                        <span>{{item.price}}元</span>
                    </div>
                    <div>支付后再次进入服务详情页即可查看联系方式</div>
                </div>
                <div class="time-wapper">
                    <span class="time">{{item.create_time}}</span>
                    <div class="t-price">
                        <span>合计:</span>
                        <span>{{item.total_price}}元</span>
                    </div>
                </div>
                <div class="btn-wapper">
                    <div>
                        <img :src="contactBuyer" />
                    </div>
                    <div>
                        <div class="button-cancel" @click="cancel">取消订单</div>
                        <div class="button-shut" @click="shut">关闭订单</div>
                        <div class="button-confirm" @click="confirm">确认订单</div>
                        <div class="button-customer" @click="customer">联系客服</div>
                        <div class="button-refund" @click="refund">申请退款</div>
                        <div class="button-complete" @click="complete">服务完成</div>
                        <div class="button-payment" @click="payment" v-if="item.status==0">付款</div>
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
        item: {}
    },
    data() {
        return {
            contactBuyer: contactBuyer
        }
    },
    created: function() {
        this.item.danwei = "小时";
        if (this.item.price_type == 2) {
            this.item.danwei = "天";
        } else if (this.item.price_type == 3) {
            this.item.danwei = "次";
        }

        // '0'=>'待付款',
        //     '1'=>'待发货',
        //     '5'=>'已发货',
        //     '6'=>'交易完成',
        //     '15'=>'交易关闭',
        // status
    },
    methods: {
        payment() { //付款

        },
        cancel() { //取消订单

        },
        shut() { //关闭订单

        },
        customer() { //联系客服

        },
        confirm() { //确认订单

        },
        refund() { //申请退款

        },
        complete() { //服务完成

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
            height: 45px;
            line-height: 45px;
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
                top: 0;
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
