<template>
    <div>
        <div class="container-body">
            <div class="wallet-hd">
                <div class="weui-cell" style="height:85px;">
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <img :src="userInfo.head_img" class="user-portrait" />
                        </div>
                        <div class="weui-cell__bd">
                            <label class="weui-label class_font_size_bd" style="color: #FFFFFF;font-size: 17px" name="vip_level">{{this.vip_level}}</label>
                            <p style="width:150px;color: #FFFFFF;font-size: 12px;opacity: 0.7;width: 200px">{{this.vip_info}}</p>
                        </div>
                    </div>
                    <div class="weui-cell__bd">
                    </div>
                    <div class="weui-cell__ft" v-if="is_vip == true">
                        <div class="weui-btn weui-btn_mini weui-btn_warn" style="background-color: #A878E5;font-size:12px;margin-top: 10px">{{this.vip_date}}</div>
                    </div>
                </div>
            </div>
            <div style="background: #F5F5F5;">

                <!-- 开通会员 -->
                <div class="content-manipulation" style="margin-top: 8px">
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
                            <div class="weui-cell__ft" style="margin-top: 5px"  v-if="is_vip == false">
                                <a @click="payVip(item)" class="weui-btn weui-btn_mini weui-btn_warn" style="background-color: #A878E5;font-size:12px">购买</a>
                            </div>
                            <div class="weui-cell__ft" style="margin-top: 5px"  v-if="is_vip == true">
                                <a class="weui-btn weui-btn_mini weui-btn_warn" style="background-color: #DDDDDD;font-size:12px">购买</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 当前等级 会员特权 -->
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
            vip_info: '无特殊权限',
            vip_date: "剩余12天",
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
                    var days = response["days"];

                    this.userInfo.vip = this.vipInfo;
                    NormalHelper.setUserInfo(this.userInfo);

                    this.vipList = [];
                    for (var i = 0; i < this.vipConfig.length; i++) {
                        if (this.vipInfo && this.vipInfo["vip_type"] == this.vipConfig[i]["level"]) {
                            this.vip_date = "剩余" + days + "天";
                            this.is_vip = true;
                            this.vip_level = this.vipConfig[i]["name"];
                            this.vip_info = "可查看所有出租人的联系方式";
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
                token: this.userInfo.token,
                vip: item.level,
                source: 1,
                allPrice: item.price,
                paymentAry: JSON.stringify({
                    "pay_type": "WX"
                })
            };
            var p_obj = {
                action: 'c=Zb&m=Order&a=createMembersOrder',
                param: param,
                success: (response) => {
                        var pay = {
                            order_no: response.order_no,
                            all_price: response.price,
                            pay_type: 2
                        }
                        NormalHelper.Set("pay", pay);
            this.$router.push({
                path: '/payment'
            });

                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        prePay(order_no, order_price) {
            var that = this;
            if (NormalHelper.isWeixin()) {
                var p_obj = {
                    action: 'c=Zb&m=Order&a=prePay',
                    param: {
                        out_trade_no: order_no,
                        total_fee: parseFloat(order_price) * 100,
                        openid: this.userInfo.wx_openid
                    }
                };
                var serverUrl = p_obj.serverUrl || GlobalModel.SERVER_URL;
                Vue.http.post(serverUrl + p_obj.action, p_obj.param, {
                    emulateJSON: true
                }).then((response) => {
                    var payJson = {
                        appId: response.body.appid,
                        timeStamp: response.body.timeStamp + "",
                        nonceStr: response.body.nonceStr,
                        package: response.body.package,
                        signType: "MD5",
                        paySign: response.body.sign
                    };
                    WeixinJSBridge.invoke('getBrandWCPayRequest', payJson,
                        function(res) {
                            that.getVipInfo();
                        }
                    );
                }, (response) => {
                    //请求异常
                    weui.alert("支付失败");
                })
            }else{
                //弹出 关注公众号二维码 并提示
                this.$router.push({
                    path: '/QrCode'
                });
            }
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
.wallet-hd {
    background-image: linear-gradient(-180deg, #A878E5 0%, #8760BA 100%);
    height: 105px;
    color: #fff;
    .title {
        padding-top: 30px;
        font-size: 15px;
    }
    .money {
        font-size: 50px;
    }
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
</style>
