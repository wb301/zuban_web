<template>
    <div>
        <div class="item-entry">
            <div class="wapper">
                <div class="head-wapper">
                    <span class="img-head"><img :src="item.seller.head_img"></span>
                    <span class="name">{{item.seller.nick_name}}</span>
                    <span class="status">{{item.status_name}}</span>
                </div>
                <div class="info-wapper">
                    <span class="img-info"><img :src="item.productList[0].product.product_image"></span>
                    <span class="info">{{item.productList[0].product.product_info}}</span>
                    <div class="price">
                        <span>￥</span>
                        <span>{{item.price}}</span>
                        <span>/{{item.danwei}}</span>
                    </div>
                    <span class="num">x{{item.productList[0].num}}</span>
                </div>
                <div class="time-wapper">
                    <span class="time">{{item.create_time}}</span>
                    <div class="t-price">
                        <span>合计:</span>
                        <span>￥{{item.total_price}}</span>
                    </div>
                </div>
                <div class="button-release" @click="goPay">支付</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {}
    },
    data() {
        return {}
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
        goPay() { //支付

        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.item-entry {
    height: 228px;
    background: #FFFFFF;
    position: relative;
    bottom: 1;
    .wapper {
        border-bottom: 1px solid #e2e2e2;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        .head-wapper {
            position: relative;
            height: 48px;
            border-bottom: 1px solid #e2e2e2;
            .img-head {
                width: 27px;
                height: 27px;
                img {
                    margin-left: 15px;
                    margin-top: 11px;
                    width: 27px;
                    height: 27px;
                }
            }
            .name {
                font-size: 17px;
                color: #333333;
                margin-top: 16px;
                margin-left: 10px;
                position: absolute;
            }
            .status {
                margin-top: 17px;
                font-size: 14px;
                color: #4990E2;
                position: absolute;
                right: 20px;
            }
        }
        .info-wapper {
            position: relative;
            height: 88px;
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
            .num {
                font-size: 14px;
                width: 40px;
                color: #333333;
                margin-top: 55px;
                right: 0px;
                position: absolute;
            }
        }
        .time-wapper {
            position: relative;
            height: 45px;
            border-bottom: 1px solid #e2e2e2;
            .time {
                font-size: 14px;
                color: #999999;
                margin-top: 15.5px;
                margin-left: 10px;
                position: absolute;
            }
            .t-price {
                position: absolute;
                margin-top: 15.5px;
                position: absolute;
                right: 20px;
                font-size: 14px;
                span:nth-child(1) {
                    color: #333333;
                }
                span:nth-child(2) {
                    color: #A878E5;
                }
            }
        }
        .button-release {
            position: absolute;
            width: 65px;
            height: 28px;
            right: 20px;
            margin-top: 8.5px;
            background-color: #A877E6;
            text-align: center;
            color: #FFFFFF;
        }
    }
}
</style>
