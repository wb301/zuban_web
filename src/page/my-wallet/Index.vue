e<template>
    <div>
        <div class="container-body">
            <div class="wallet-hd">
                <div class="title">账户余额（元）</div>
                <div class="money">{{maxMoney}}</div>
            </div>
            <div class="weui-tab">
                <div class="weui-navbar">
                    <div class="weui-navbar__item weui-bar__item_on">
                        <span>可提现（元）：{{available}}</span>
                    </div>
                    <div class="weui-navbar__item">
                        <span>冻结中（元）：{{freeze}}</span>
                    </div>
                </div>
                <div class="weui-tab__panel">
                </div>
            </div>
            <div class="weui-cells" style="margin-top: 27px;">
                <div class="weui-cell" @click='toWithdraw'>
                    <div class="weui-cell__hd ">
                        <label class="weui-label class_font_size_hd">支付宝提现</label>
                    </div>
                    <div class="weui-cell__bd "></div>
                    <div class="weui-cell__ft ">
                        <div><img :src="arrow" style="width:15px;height:15px;" /></div>
                    </div>
                </div>

                <div class="weui-cell" @click='toWithdrawByBank'>
                    <div class="weui-cell__hd ">
                        <label class="weui-label class_font_size_hd">银行卡提现</label>
                    </div>
                    <div class="weui-cell__bd "></div>
                    <div class="weui-cell__ft ">
                        <div><img :src="arrow" style="width:15px;height:15px;" /></div>
                    </div>
                </div>

                <div class="weui-cell" @click='toWithdrawHistroy'>
                    <div class="weui-cell__hd ">
                        <label class="weui-label class_font_size_hd">提现记录</label>
                    </div>
                    <div class="weui-cell__bd "></div>
                    <div class="weui-cell__ft ">
                        <div><img :src="arrow" style="width:15px;height:15px;" /></div>
                    </div>
                </div>

                <div class="weui-cell" @click='toMoneyHistroy'>
                    <div class="weui-cell__hd ">
                        <label class="weui-label class_font_size_hd">收支明细</label>
                    </div>
                    <div class="weui-cell__bd "></div>
                    <div class="weui-cell__ft ">
                        <div><img :src="arrow" style="width:15px;height:15px;" /></div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.container-body {
    text-align: center;
    .wallet-hd {
        background-image: linear-gradient(-180deg, #A878E5 0%, #8760BA 100%);
        height: 150px;
        color: #fff;
        .title {
            padding-top: 30px;
            font-size: 15px;
        }
        .money {
            font-size: 50px;
        }
    }
    .weui-navbar {
        .weui-navbar__item {
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            color: #8760BA;
            letter-spacing: 0.85px;
            border-bottom: 1px solid #A878E5;
        }
        .weui-bar__item_on {
            background-color: #A878E5;
            color: #fff;
        }
    }
    .weui-cell {
        height: 45px;
        font-size: 14px;
        color: #333;
        line-height: 45px;
    }
}
</style>
<script>
import jiantou from './image/jiantou1.png'
export default {
    components: {},
    data() {
        return {
            arrow: jiantou,
            maxMoney: 0,
            available: 0,
            freeze: 0
        }
    },
    mounted() {
        $(".disabled-input").focus(function() {
            document.activeElement.blur();
        });
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {

            var userInfo = NormalHelper.userInfo();
            var param = {
                token: userInfo.token
            };
            var p_obj = {
                action: 'c=Zb&m=User&a=getUserInfo',
                param: param,
                success: (response) => {
                    response["token"] = userInfo.token;
                    NormalHelper.setUserInfo(response);
                    this.maxMoney = response["money"]["maxMoney"];
                    this.available = response["money"]["available"];
                    this.freeze = response["money"]["freeze"];
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        toWithdraw() {
            this.$router.push({
                path: '/money'
            });
        },
        toWithdrawByBank() {
            this.$router.push({
                path: '/moneyByBank'
            });
        },
        toWithdrawHistroy() {
            this.$router.push({
                path: '/withdrawDetail'
            });
        },
        toMoneyHistroy() {
            this.$router.push({
                path: '/detail'
            });
        }
    }
}
</script>
