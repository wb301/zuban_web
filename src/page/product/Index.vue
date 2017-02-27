<template>
    <div>
        <div class="container-body">
            <div class="swipe">
                <mt-swipe :auto="4000" class="swipt-wapper">
                    <mt-swipe-item><img :src="img_meinv"></mt-swipe-item>
                    <mt-swipe-item><img :src="img_meinv"></mt-swipe-item>
                    <mt-swipe-item><img :src="img_meinv"></mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="user-information">
                <div class="user-portrait">
                    <img :src="img_meinv">
                </div>
                <div class="user-info">
                    <div>Kyumi琪</div>
                    <div><img :src="gender_icon[1]"></div>
                </div>
                <div class="da-phone" v-if="members==1">
                    <img :src="icon">
                </div>
            </div>
            <div class="service-information">
                <div>陪逛街</div>
                <div>
                    <span>￥</span>
                    <span>179</span>
                    <span>/小时</span>
                </div>
                <div>白天有需要逛街的可以联系我哈~帮选购，帮砍价，还有看电影</div>
            </div>
            <div class="region-information">
                服务地区：上海 浦东新区
            </div>
            <div class="contact-information">
                <div>
                    <div>
                        <div>联系方式</div>
                        <div v-if="members!=1">15元购买联系方式后可查看</div>
                    </div>
                    <div class="specific">
                        <div>手机号：
                            <span v-if="members==1">13672888888</span>
                            <span v-else>***********</span>
                        </div>
                        <div>微信号：
                            <span v-if="members==1">kyumi0122</span>
                            <span v-else>***********</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>基本信息</div>
                    </div>
                    <div class="specific">
                        <div>所在地：上海</div>
                        <div>年龄：24</div>
                    </div>
                    <div class="specific">
                        <div>身高：165cm</div>
                        <div>体重：42kg</div>
                    </div>
                    <div class="specific">
                        <div>学历：大学本科</div>
                        <div>职业：自由职业</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-wapper">
            <div v-if="members!=1">
                <div class="button-buy">购买联系方式</div>
                <div class="button-immediately">立即租</div>
            </div>
            <div class="button-immediately" v-else>立即租</div>
        </div>
    </div>
</template>
<script>
import {
    Swipe,
    SwipeItem
} from 'mint-ui';
import 'mint-ui/lib/swipe/style.css';
import boda from './image/boda.png'
import nan from './image/nan.png'
import nv from './image/nv.png'
import meinv from '../service-list/release/image/Artboard6.jpg'

export default {
    components: {
        Swipe,
        SwipeItem
    },
    data() {
        return {
            gender_icon: {
                1: nan,
                2: nv
            },
            icon: boda,
            img_meinv: meinv,
            members: 2
        }
    },
    mounted() {

    },
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
    .swipe {
        height: 375px;
        width: 100%;
        .swipt-wapper {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .user-information,
    .service-information,
    .region-information {
        border-bottom: 1px solid #E2E2E2;
        margin-left: 15px;
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
        .da-phone {
            width: 55px;
            height: 55px;
            position: absolute;
            right: 10px;
            top: 10px;
            img {
                width: 100%;
                width: 100%;
            }
        }
    }
    .service-information {
        height: 87.5px;
        >div:nth-child(1) {
            margin-top: 15px;
            font-size: 13px;
            color: #333;
        }
        >div:nth-child(2) {
            color: #A878E5;
            margin-top: 3px;
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
    .region-information {
        height: 43px;
        line-height: 43px;
        font-size: 13px;
        color: #333;
    }
    .contact-information {
        margin: 15px 15px;
        >div>div:nth-child(1) {
            >div {
                display: inline-block;
            }
            div:nth-child(1) {
                font-size: 15px;
                color: #666;
            }
            div:nth-child(2) {
                font-size: 11px;
                color: #8760BA;
                padding: 0 6px;
                border: 1px solid #A878E5;
                border-radius: 5px;
            }
        }
        .specific {
            font-size: 13px;
            color: #333;
            margin: 3px 0;
            >div {
                display: inline-block;
                width: 45%;
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
    font-size: 16px;
    >div {
        div {
            width: 50%;
            float: left;
        }
    }
    .button-buy {
        background-color: #FFFFFF;
        line-height: 49.5px;
        text-align: center;
        color: #8760BA;
        border-top: 0.5px solid #A878E5;
    }
    .button-immediately {
        background-color: #A877E6;
        line-height: 50px;
        text-align: center;
        color: #FFFFFF;
    }
}
</style>
