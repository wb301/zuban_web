<template>
    <div style="background: #F5F5F5;">
        <!-- 当前等级 会员特权 -->
        <div class="content-manipulation">
            <div class="weui-cells" style="margin-top: 0px">
                <div class="weui-cell class_height">
                    <div class="weui-cell__hd">
                        <label class="weui-label class_font_size_hd">当前等级</label>
                    </div>
                    <div class="weui-cell__bd">
                        <label class="weui-label class_font_size_bd" name="vip_level">{{this.vip_level}}</label>
                    </div>
                </div>
                <div class="weui-cell class_height">
                    <div class="weui-cell__hd">
                        <label class="weui-label class_font_size_hd">会员特权</label>
                    </div>
                    <div class="weui-cell__bd">
                        <label class="weui-label class_font_size_bd" style="width: 100%">{{this.vip_info}}</label>
                    </div>
                </div>
                <div class="weui-cell class_height">
                    <div class="weui-cell__hd">
                        <label class="weui-label class_font_size_hd">会员特权说明</label>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div><img :src="image" style="width: 100%"></div>
        </div>

        <!-- 说明 -->
        <div class="content-manipulation">
            <div class="weui-cells" style="margin-top: -10px">
                <div class="weui-cell" style="height: 30px">
                    <div class="weui-cell__hd">
                        <label class="weui-label" style="width: 100%;font-size: 12px;color: #E35257;">说明:会员时间的计算从支付当天开始算起,到期后自动失效;支付成功10分钟内即可在服务详情页查看租人的联系方式。</label>
                    </div>
                </div>
            </div>
        </div>

        <!-- 开通会员 -->
        <div class="content-manipulation" style="margin-top: 8px" v-if="is_vip == false">
            <div class="weui-cells" style="margin-top: 0px">
                <div class="weui-cell class_height">
                    <div class="weui-cell__hd">
                        <label class="weui-label class_font_size_hd">开通会员</label>
                    </div>
                </div>

                <div class="weui-cell class_height" v-for="(item,index) in vipList">
                    <div class="weui-cell__hd">
                        <label class="weui-label class_font_size_bd">{{item.name}}</label>
                    </div>
                    <div class="weui-cell__bd">
                        <label class="weui-label class_font_size_bd">{{item.price}}元</label>
                    </div>
                    <div class="weui-cell__ft" style="margin-top: 5px">
                        <a @click="payVip(item)" class="weui-btn weui-btn_mini weui-btn_warn" style="background-color: #A878E5;font-size:12px">购买</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vip from './image/vip.png'

export default {
    components: {

    },
    data() {
        return {
            image: vip,
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
        },
        payVip(item) {

            var param = {
                token: NormalHelper.userInfo()["token"],
                vip: item.level,
                source: 1,
                allPrice: item.price,
                paymentAry: JSON.stringify({
                    "pay_type": "WX"
                })
            };
            console.log(JSON.stringify(param));
            var p_obj = {
                action: 'c=Zb&m=Order&a=createMembersOrder',
                param: param,
                success: (response) => {

                    alert("下单成功!" + JSON.stringify(response));
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
.class_font_size_hd {
    font-size: 14px;
    color: #666666;
}
.class_height {
    height: 25px
}
.class_font_size_bd {
    font-size: 14px;
    color: #333333;
}
</style>
