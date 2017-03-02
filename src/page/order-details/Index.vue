<template>
    <div>
        <div class="container-body">
            <div content="product">
            <div class="user-information">
                <div class="user-portrait">
                    <img :src="img_meinv">
                </div>
                <div class="user-info">
                    <div>Kyumi琪</div>
                </div>
                <div class="order-status">
                    <div>已完成</div>
                </div>
            </div>
            <div class="service-information">
                <div class="product_img">
                    <img :src="img_meinv">
                </div>
                <div class="product_content">陪逛街</div>
                <div class="product_price">
                    <span>179</span>
                    <span>/小时</span>
                </div>
                <div class="product_num">
                    <span>x2</span>
                </div>
            </div>
            <div>
            </div>

                <div content="order">
                <div class="weui-cell time">
                    <div class="weui-cell__hd">
                        <label class="weui-label">2017-02-23 22:43:34</label>
                    </div>
                    <div class="weui-cell__bd"></div>
                    <div class="weui-cell__ft">
                        <span>合计：</span>
                        <span>350</span>
                        <span>元</span>
                    </div>

                </div>
                <div class="weui-cell phone">
                    <div class="weui-cell__hd">
                        <label class="weui-label">您的联系方式</label>
                    </div>
                    <div class="weui-cell__bd">
                       13761094580
                    </div>
                    <div class="weui-cell__bd"></div>
                    <div class="weui-cell__ft">
                        <span><img :src="lxmj"></span>
                    </div>
                </div>
                </div>
                <div class="message">
                    <div>留言</div>
                    <div content="liuyan">
                        dfsldk;fksdlkf;slkdf;lks;dkf;skldf;ks;dfsd
                        sdfsdmf.sdfssdfsdfsdfsdfsad是东方航空技术方式开发圣诞节福克斯是东方开始的方式决定了房间
                    </div>
                </div>
                <div class="weui-cell order_no">
                    <div class="weui-cell__hd">
                        <label class="weui-label">订单编号</label>
                    </div>
                    <div class="weui-cell__bd">
                        13761094580
                    </div>
                </div>
            </div>
        </div>
        <div class="button-wapper">
            <div class="button-confirm">确认支付</div>
        </div>
    </div>
</template>
<script>
import 'src/lib/js/dropload.min.js'
import 'src/lib/css/dropload.css'

import nan from '../product/image/nan.png'
import nv from '../product/image/nv.png'
import meinv from '../service-list/release/image/Artboard6.jpg'

import less_1 from './image/less_1.png'
import lxmj from './image/lxmj.png'
import less_2 from './image/less_2.png'
import plus_1 from './image/plus_1.png'
import plus_2 from './image/plus_2.png'
export default {
    components: {

    },
    data() {
        return {
            orderDetails: [],
            type: 0, //0是买家查看订单 1 卖家查看订单
            orderNo: '',
            head_img: '',
            nick_name: '',
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
            lxmj: lxmj,
            quantity: 9999,
            contact_information: 13672888888

        }
    },
    mounted() {
        this.type = this.$route.params.type
        this.orderNo = this.$route.params.orderNo
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
                    //0是买家看卖家，1是卖家看买家
                    this.head_img = response.seller.head_img;
                    this.nick_name = response.seller.nick_name;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
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

    >
    div {
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

    >
    div:nth-child(1) {
        font-size: 12px;
        color: #333;
        margin-top: 15.5px;
    }

    >
    div:nth-child(2) {
        height: 15.1px;
        width: 15.7px;

    >
    img {
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

    >
    div:nth-child(1) {
        font-size: 12px;
        color: #333;
        margin-top: 15.5px;
    }

    >
    div:nth-child(2) {
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
    .product_img{
        width: 100px;
        height: 100px;
        left:5px;
        margin-top: 15.5px;
        float:left;
    img {
        width: 90px;
        height: 90px;
    }
    }
    .product_content{
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
    .weui-label{
        text-align: right;
        width: 85px;
    }
    .weui-cell__bd{
        text-align: left;
       margin-left: 10px;
    }
    .weui-cell__ft{
        img{
            height: 35px;
            width: 50px;
        }
    }
    }

    .weui-cell.time {
        padding-left: 0;
        font-size: 14px;
        border-bottom: 1px solid #E2E2E2;
    .weui-label{
        width: 150px;
    }
    .weui-cell__ft{
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
        .weui-cell__bd{
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

    >
    div {
        width: 50%;
        float: right;
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
