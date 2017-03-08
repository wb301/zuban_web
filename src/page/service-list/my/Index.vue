<template>
    <div>
        <div class="container-body">
            <div class="weui-cells">
                <div class="weui-cell weui-cell_access" style="height:85px;" @click='myInfo'>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <img :src="userInfo.head_img" class="user-portrait" />
                        </div>
                        <div class="weui-cell__bd">
                            <h3 style="font-size: 17px;">{{userInfo.nick_name}}</h3>
                            <img :src="shouji" alt="" style="width:8px;height: 10px;margin-top:4px;float:left" />
                            <p style="width:150px;color: #999999;font-size: 14px">{{userInfo.account}}</p>
                        </div>
                    </div>
                    <div class="weui-cell__bd">
                    </div>
                    <div class="weui-cell__ft">
                    </div>
                </div>
                <div class="weui-cell weui-cell_access" @click='myServiceList'>
                    <div class="weui-cell__bd">
                        我的发布
                    </div>
                    <div class="weui-cell__ft">
                    </div>
                </div>
                <div class="weui-cell weui-cell_access" @click='changePassword'>
                    <div class="weui-cell__bd">
                        修改密码
                    </div>
                    <div class="weui-cell__ft">
                    </div>
                </div>
            </div>
            <div class="weui-cells" style="margin-top:8px;">
                <div class="weui-cell weui-cell_access" @click='myVip'>
                    <div class="weui-cell__bd">
                        我的会员
                    </div>
                    <div class="weui-cell__ft">
                    </div>
                </div>
                <div class="weui-cell weui-cell_access" @click='myWallet'>
                    <div class="weui-cell__bd">
                        我的钱包
                    </div>
                    <div class="weui-cell__ft">
                    </div>
                </div>
            </div>
            <div class="weui-cells" style="margin-top:8px;">
                <div class="weui-cell weui-cell_access" @click='myOrderlist_1'>
                    <div class="weui-cell__bd">
                        接到订单
                    </div>
                    <div class="weui-cell__ft">
                    </div>
                </div>
                <div class="weui-cell weui-cell_access" @click='myOrderlist_0'>
                    <div class="weui-cell__bd">
                        预约订单
                    </div>
                    <div class="weui-cell__ft">
                    </div>
                </div>
            </div>
            <div class="weui-cells" style="margin-top:8px;">
                <div class="weui-cell weui-cell_access" @click='toQrcode'>
                    <div class="weui-cell__bd">
                        关于我们
                    </div>
                    <div class="weui-cell__ft">
                    </div>
                </div>
                <div class="weui-cell weui-cell_access" v-if="is_weixin === false" @click='toLogin'>
                    <div class="weui-cell__bd">
                        注销登录
                    </div>
                    <div class="weui-cell__ft">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import xiala from '../list/image/xiala.png'
import shouji from '../list/image/shouji.png'
export default {
    components: {

    },
    data() {
        return {
            image: xiala,
            shouji: shouji,
            is_weixin: NormalHelper.isWeixin(),
            userInfo: NormalHelper.userInfo()
        }
    },
    mounted() {

    },
    methods: {
        myInfo() {
            this.$router.push({
                path: '/my-info'
            });
        },
        myServiceList() {
            this.$router.push({
                path: '/my-service-list'
            });
        },
        changePassword() {
            this.$router.push({
                path: '/password/my'
            });
        },
        myVip() {
            this.$router.push({
                path: '/vip'
            });
        },
        myOrderlist_0() {
            this.$router.push({
                path: '/buy_orderlist'
            });
        },
        myOrderlist_1() {
            this.$router.push({
                path: '/my_orderlist'
            });
        },
        myWallet() {
            this.$router.push({
                path: '/my-wallet'
            });
        },
        toLogin() {
            NormalHelper.setUserInfo({});
            this.$router.push({
                path: '/login'
            });
        },
        toQrcode() {
            this.$router.push({
                path: '/QrCode'
            });
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    background: #F5F5F5;
    .weui-cells {
        margin-top: 0;
    }
    .user-portrait {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        overflow: hidden;
        margin: 5px 10px 0px -15px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .weui-cell__bd {
        font-size: 14px;
        color: #666666;
    }
}
</style>
