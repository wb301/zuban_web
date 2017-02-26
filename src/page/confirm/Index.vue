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
export default {
    components: {},
    data() {
        return {
            gender_icon: {
                1: nan,
                2: nv
            },
            img_meinv: meinv,
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
    margin: 0 15px;
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
        >div>div:nth-child(1) {
            margin-top: 15px;
            font-size: 13px;
            color: #333;
        }
        >div>div:nth-child(2) {
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
        >div:nth-child(3) {
            font-size: 10px;
            color: #999;
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
