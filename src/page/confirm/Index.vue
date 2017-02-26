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
                    <div>陪逛街</div>
                    <div>
                        <span>￥</span>
                        <span>179</span>
                        <span>/小时</span>
                    </div>
                </div>
                <div>
                    <img :src="quantity>0?btn_less[1]:btn_less[2]">
                    <span> {{quantity}} </span>
                    <img :src="quantity<9999?btn_plus[1]:btn_plus[2]">
                </div>
            </div>
            <div>
                <div class="weui-cell phone">
                    <div class="weui-cell__hd">
                        <label class="weui-label">您的联系方式</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="test" v-model="contact_information" placeholder="请输入联系方式" />
                    </div>
                </div>
                <div class="message">
                </div>
            </div>
        </div>
        <div class="button-wapper">
            <div class="button-buy">
                <label>ca</label>合计：<span>15元</span></div>
            <div class="button-confirm">确认支付</div>
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
            quantity: 9999,
            contact_information: 13672888888
        }
    },
    mounted() {},
    watch: {},
    methods: {

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
        .weui-input {
            text-align: right;
            color: #666666;
        }
    }
    .weui-cell.phone:before {
        border: 0;
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
