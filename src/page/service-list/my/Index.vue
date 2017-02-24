<template>
    <div style = "background: #F5F5F5;">

        <div class="weui-cells" style = "margin-top:0px;">
            <a class="weui-cell weui-cell_access" href="javascript:;"  style = "height:125px;">

                <div class="weui-cell">
                    <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                        <img :src="image" style="width: 50px;display: block"/>
                    </div>
                    <div class="weui-cell__bd">
                        <h3>{{userInfo.nick_name}}</h3>

                        <img :src="image" alt="" style="width:20px;float:left" />
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
        </div>

        <div class="weui-cells" style = "margin-top:7.5px;">
            <a class="weui-cell weui-cell_access" href="javascript:;">
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
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>接到订单</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
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
export default {
    components: {
        
    },
    data() {
        return {
            image: xiala,
            userInfo: NormalHelper.getCookie(GlobalModel.COOKIE_USER_INFO) ? JSON.parse(NormalHelper.getCookie(GlobalModel.COOKIE_USER_INFO)) : {nick_name:'测试',account:'12345678909'}
        }
    },
    mounted() {
        console.log();
    },
    methods: {
        myServiceList() {
            this.$router.push({
                path: '/my-service-list'
            });
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
</style>