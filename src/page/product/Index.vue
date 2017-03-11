<template>
    <div>
        <div class="container-body">
            <div class="swipe">
                <mt-swipe :auto="4000" class="swipt-wapper">
                    <mt-swipe-item v-for="(item,index) in imageList"><img :src="item"></mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="user-information">
                <div class="user-portrait">
                    <img :src="userInfo.head_img">
                </div>
                <div class="user-info">
                    <div>{{userInfo.nick_name}}</div>
                    <div><img :src="gender_icon"></div>
                </div>
                <div class="da-phone" v-if="members==1" @click="phone">
                    <img :src="icon">
                </div>
            </div>
            <div class="service-information">
                <div>{{productInfo.category.category_name}}</div>
                <div>
                    <span>￥</span>
                    <span>{{productInfo.price}}</span>
                    <span>/{{productInfo.price_type == 1 ? '小时' : productInfo.price_type == 2 ? '天' : '次' }}</span>
                </div>
                <div>{{productInfo.product_info}}</div>
            </div>
            <div class="region-information">
                服务地区：{{productInfo.region_name}}
            </div>
            <div class="contact-information">
                <div>
                    <div>
                        <div>联系方式</div>
                        <div v-if="members!=1&&type<1">{{productInfo.look_price}}元购买联系方式后可查看</div>
                    </div>
                    <div class="specific">
                        <div>手机号：
                            <span v-if="members==1||type>0">{{userInfo.account}}</span>
                            <span v-else>***********</span>
                        </div>
                        <div>微信号：
                            <span v-if="members==1||type>0">{{userInfo.wx_account}}</span>
                            <span v-else>***********</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>基本信息</div>
                    </div>
                    <div class="specific_2">
                        <div>所在地：{{userInfo.region_name}}</div>
                    </div>
                    <div class="specific_2">
                        <div>年龄：{{userInfo.age}}</div>
                    </div>
                    <div class="specific">
                        <div>身高：{{userInfo.height}}厘米</div>
                        <div>体重：{{userInfo.weight}}斤</div>
                    </div>
                    <div class="specific">
                        <div>学历：{{userInfo.qualifications}}</div>
                        <div>职业：{{userInfo.professional}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-wapper">
            <div v-if="type==0">
                <div class="button-buy" @click="buyContact" v-if="members!=1">购买联系方式</div>
                <div class="button-buy buy_default" v-else>
                    此分类暂时免费
                </div>
                <div class="button-immediately" @click="rentImmediately">立即租</div>
            </div>
            <div class="button-buy" v-else>我的发布</div>
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

export default {
    components: {
        Swipe,
        SwipeItem
    },
    data() {
        return {
            gender_icon: nan,
            icon: boda,
            members: 2,
            type: 0,
            productCode: NormalHelper.Get("buy_productCode"),
            productInfo: {
                category: {}
            },
            userInfo: {},
            imageList: []
        }
    },
    mounted() {
        $(".swipe").height($("body").width());
        this.getProductInfo();
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
                    this.imageList = response.image_list;
                    var userInfo = NormalHelper.userInfo();
                    if (response.user_id == userInfo.user_id) {
                        this.userInfo = userInfo;
                        this.type = 1;
                    } else {
                        this.userInfo = response.user_info;
                    }
                    if (this.userInfo) {
                        this.gender_icon = this.userInfo.sex == 'M' ? nan : nv;
                    }
                    if (response.vip_level > 0 || parseFloat(response.look_price) <= 0)
                        this.members = 1;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        phone() {
            window.location.href = 'tel://' + this.userInfo.account;
        },
        buyContact() {
            NormalHelper.Set("confirm_type", 1);
            NormalHelper.Set("confirm_code", this.productInfo.product_sys_code);
            this.$router.push({
                path: '/confirm'
            });
        },
        rentImmediately() {
            NormalHelper.Set("confirm_type", 2);
            NormalHelper.Set("confirm_code", this.productInfo.product_sys_code);
            this.$router.push({
                path: '/confirm'
            });
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
    .swipe {
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
        height: 80px;
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
        .specific_2 {
            font-size: 13px;
            color: #333;
            margin: 3px 0;
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
    .button-buy.buy_default {
        line-height: 50px;
        border-top: 0;
        background-color: #DDDDDD;
        color: #FFFFFF;
    }
    .button-immediately {
        background-color: #A877E6;
        line-height: 50px;
        text-align: center;
        color: #FFFFFF;
    }
}
</style>
