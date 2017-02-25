<template>
    <div style = "background: #F5F5F5;">

        <div class="weui-cells" style = "margin-top:0px;">
            <a class="weui-cell weui-cell_access" href="javascript:;"  style = "height:125px;" @click='myInfo'>

                <div class="weui-cell">
                    <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                        <img :src="userInfo.head_img" style="width: 75px;height:75px;display: block"/>
                    </div>
                    <div class="weui-cell__bd">
                        <h3>{{userInfo.nick_name}}</h3>

                        <img :src="shouji" alt="" style="width:12px;margin-top:3px;float:left" />
                        <p style="width:200px;color: #999999;">{{userInfo.account}}</p>

                    </div>

                </div>

                <div class="weui-cell__bd">
                    
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click='myServiceList'>
                <div class="weui-cell__bd">
                    <p>我的发布</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click='changePassword'>
                <div class="weui-cell__bd">
                    <p>修改密码</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
        </div>

        <div class="weui-cells" style = "margin-top:7.5px;">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click='myVip'>
                <div class="weui-cell__bd">
                    <p>我的会员</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>我的钱包</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
        </div>

        <div class="weui-cells" style = "margin-top:7.5px;">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click='myOrderlist_1'>
                <div class="weui-cell__bd">
                    <p>接到订单</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click='myOrderlist_0'>
                <div class="weui-cell__bd">
                    <p>预约订单</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
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
            userInfo: NormalHelper.userInfo()
        }
    },
    mounted() {
        console.log();
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
                path: '/orderlist/0'
            });
        },
        myOrderlist_1() {
            this.$router.push({
                path: '/orderlist/1'
            });
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
</style>