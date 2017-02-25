<template>
    <div class="container-body">
        <swiper v-ref:image direction="horizontal" :mousewheel-control="true" :performance-mode="false" :pagination-visible="true" :pagination-clickable="true" :loop="true" @slide-change-start="onSlideChangeStart" @slide-change-end="onSlideChangeEnd">
        </swiper>
        <div>
            <img :scr="userInfo.head_img" />
            <span>{{userInfo.nick_name}}</span>
            <img :scr="icon" class="icon" />
        </div>
        <div class="weui-cells__title">
            <div class="weui-cells">
                <div class="weui-cell">
                    <div class="weui-cell__hd">律师</div>
                    <div class="weui-cell__bd">¥律师</div>
                    <div class="weui-cell__ft">测试测试测试测试测试测试</div>
                </div>
            </div>
        </div>
        <div class="weui-cells__title">
            <div class="weui-cell__hd">服务地区：</div>
        </div>
        <div class="weui-flex">
            <div class="weui-flex__item">联系方式</div>
            <div class="weui-flex__item left">手机号：</div>
            <div class="weui-flex__item right">微信号：</div>
        </div>
        <div class="weui-flex">
            <div>基本信息</div>
            <span class="weui-flex__item">所在地：</span>
            <span class="weui-flex__item">年龄：</span>
            <span class="weui-flex__item">身高：</span>
            <span class="weui-flex__item">体重：</span>
            <span class="weui-flex__item">学历：</span>
            <span class="weui-flex__item">职业：</span>
        </div>
        <a href="javascript:;" class="weui-btn weui-btn_primary">立即租</a>
    </div>
</template>
<script>
import vue from 'vue'
import 'src/lib/js/dropload.min.js'
import 'src/lib/css/dropload.css'
import ListItem from './item'
import Swiper from 'vue-swiper'
import image1 from './image/1.jpg'
import image2 from './image/2.jpg'
import boda from './image/boda.png'
export default {
    components: {
        ListItem,
        Swiper
    },
    data() {
        return {
            image: [image1, image2],
            icon: boda,
            productList: [],
            page: 1,
            type: 0,
            status: 'ALL',
            userInfo: NormalHelper.getCookie(GlobalModel.COOKIE_USER_INFO) ? JSON.parse(NormalHelper.getCookie(GlobalModel.COOKIE_USER_INFO)) : {
                nick_name: '测试',
                account: '12345678909'
            }

        }
    },
    mounted() {
        this.type = this.$route.params.type
        this.getOrderList();
    },
    methods: {
        onSlideChangeStart(currentPage) {
            console.log('onSlideChangeStart', currentPage);
        },
        onSlideChangeEnd(currentPage) {
            console.log('onSlideChangeEnd', currentPage);
        },
        changeStatus(type) {
            this.status = type;
            //$(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
            this.getOrderList();
        },

        getOrderList() {
            var param = {
                c: 'Zb',
                m: 'Order',
                a: 'orderCommonFilter',
                status: this.status,
                type: this.type,
                page: this.page,
                row: 5
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    if (this.page == 1) {
                        this.productList = response.list;
                        if (response.list.length <= 0) {

                        }
                    } else {
                        if (response.list.length > 0) {
                            for (var i = 0; i < response.list.length; i++) {
                                this.productList.push(response.list[i]);
                            }
                        }
                    }
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
.icon {
    height: 45px;
    width: 45px;
    float: right;
}

.weui-btn {
    width: 100%;
    background-color: #A878E5;
    font-size: 16px;
    color: #FFFFFF;
    bottom: 0px;
    position: fixed;
}

.weui-flex {
    width: 100%;
}

.weui-flex__item {
    width: 100%;
    .left {
        float: left;
    }
    .right {
        float: right;
    }
}
</style>
