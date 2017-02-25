<template>
    <div style = "background: #F5F5F5;">

        <!-- 当前等级 会员特权 -->
        <div class="content-manipulation" style = "margin-top:0px;">
            <div class="weui-cells" style="margin-top: 8px">
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

        <!-- <div v-if={{this.is_vip}}>
            你好
        </div> -->

        <!-- 开通会员 -->
        <!-- <div style="margin-top: 10px">
            <label class="weui-label">开通会员</label>
            <div >
                <div class="dropload-wapper">
                    <div>
                        <list-item v-for="(item,index) in vipList" :item="item"></list-item>
                    </div>
                </div>
            </div>

        </div>    -->     

    </div>
</template>
<script>
import xiala from '../service-list/list/image/xiala.png'
import ListItem from './item'

export default {
    components: {
        
    },
    data() {
        return {
            image : xiala,
            vip_level : '注册会员',
            vip_info  : '无',
            is_vip : false,
            vipList  : [],
            vipInfo: NormalHelper.userInfo()["vip"]
        }
    },
    mounted() {
        this.getVipInfo()
    },
    methods: {
        getVipInfo() {

            var param = {
                token: NormalHelper.userInfo()["token"]
            };
            var p_obj = {
                action: 'c=Zb&m=SystemConfig&a=getVipPayList',
                param: param,
                success: (response) => {
                    this.vipInfo = response["info"];
                    this.vipConfig = response["config"];

                    var userInfo = NormalHelper.userInfo();
                    userInfo["vip"] = this.vipInfo;
                    NormalHelper.setUserInfo(userInfo);

                    if(this.vipInfo){

                        for (var i = 0; i < this.vipConfig.length; i++) {
                            if(this.vipInfo["vip_type"] == this.vipConfig[i]["level"]){
                                this.vip_level = this.vipConfig[i]["name"];
                                this.vip_info = "可在"+this.vipInfo["start_time"]+"至"+this.vipInfo["end_time"]+"内免费查看出租人的联系方式";
                            }
                            this.vipList.push(this.vipConfig[i]);
                        }
                    }
                    console.log(response);



                    // response["token"] = this.userInfo.token;
                    // NormalHelper.setUserInfo(response);
                    // this.userInfo = response;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        updUserInfo() {

            var param = {"token" : this.userInfo.token,"sex" : this.sex};
            if(this.nick_name_model){
                param["nick_name"] = this.nick_name_model;
            }
            if(this.wx_account_model){
                param["wx_account"] = this.wx_account_model;
            }
            if(this.qualifications_model){
                param["qualifications"] = this.qualifications_model;
            }
            if(this.professional_model){
                param["professional"] = this.professional_model;
            }
            if(this.age_model){
                if (!(/^[1-9]\d$/.test(this.age_model)) || this.age_model > 100) {
                    weui.alert("年龄在1~100之间");
                    return false;
                };
                param["age"] = this.age_model;
            }
            if(this.height_model){
                if (!(/^[1-9]\d{2}$/.test(this.height_model)) || this.height_model > 500) {
                    weui.alert("身高在0~260之间");
                    return false;
                };
                param["height"] = this.height_model;
            }
            if(this.weight_model){
                if (!(/^[1-9]\d{2}$/.test(this.weight_model)) || this.weight_model > 500) {
                    weui.alert("体重在50~500之间");
                    return false;
                };
                param["weight"] = this.weight_model;
            }

            var p_obj = {
                action: 'c=Zb&m=User&a=updUserInfo',
                param: param,
                success: (response) => {
                    response["token"] = this.userInfo.token;
                    NormalHelper.setUserInfo(response);
                    this.userInfo = response;
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
.class_height{
    height: 25px
}
</style>