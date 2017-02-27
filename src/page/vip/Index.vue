<template>
    <div style="background: #F5F5F5;">
        <!-- 当前等级 会员特权 -->
        <div class="content-manipulation">
            <div class="weui-cells" style="margin-top: 0px">
                <div class="weui-cell class_height">
                    <div class="weui-cell__hd">
                        <label class="weui-label">当前等级</label>
                    </div>
                    <div class="weui-cell__bd">
                        <label class="weui-label" name="vip_level">{{this.vip_level}}</label>
                    </div>
                </div>
                <div class="weui-cell class_height">
                    <div class="weui-cell__hd">
                        <label class="weui-label">会员特权</label>
                    </div>
                    <div class="weui-cell__bd">
                        <label class="weui-label" style="width: 100%">{{this.vip_info}}</label>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-top: 10px">
            <label class="weui-label">会员特权说明</label>
            <div><img :src="image"></div>
        </div>
        <!-- 说明 -->
        <div style="margin-top: 10px">
            <label class="weui-label" style="color:blue">说明:</label>
            <label class="weui-label" style="width: 100%;color:blue">会员时间的计算从支付当天开始算起,到期后自动失效;支付成功10分钟内即可在服务详情页查看租人的联系方式。</label>
        </div>
        <!-- 开通会员 -->
        <div style="margin-top: 10px" v-if="is_vip == false">
            <label class="weui-label">开通会员</label>
            <div>
                <div class="dropload-wapper">
                    <div>
                        <list-item v-for="(item,index) in vipList" :item="item"></list-item>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import xiala from '../service-list/list/image/xiala.png'
import ListItem from './item'

export default {
    components: {
        ListItem
    },
    data() {
        return {
            image: xiala,
            vip_level: '注册会员',
            vip_info: '无',
            userInfo: NormalHelper.userInfo(),
            is_vip: NormalHelper.userInfo()["vip"] ? true : false,
            vipList: [],
            vipInfo: NormalHelper.userInfo()["vip"]
        }
    },
    mounted() {
        this.getVipInfo()
    },
    methods: {
        getVipInfo() {

            var param = {
                token: this.userInfo.token
            };
            var p_obj = {
                action: 'c=Zb&m=SystemConfig&a=getVipPayList',
                param: param,
                success: (response) => {
                    this.vipInfo = response["info"];
                    this.vipConfig = response["config"];

                    this.userInfo.vip = this.vipInfo;
                    NormalHelper.setUserInfo(this.userInfo);

                    for (var i = 0; i < this.vipConfig.length; i++) {
                        if (this.vipInfo && this.vipInfo["vip_type"] == this.vipConfig[i]["level"]) {

                            this.is_vip = true;
                            this.vip_level = this.vipConfig[i]["name"];
                            this.vip_info = "可在" + this.vipInfo["start_time"] + "至" + this.vipInfo["end_time"] + "内免费查看出租人的联系方式";
                        }
                        this.vipList.push(this.vipConfig[i]);
                    }
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.class_height {
    height: 25px
}
</style>
