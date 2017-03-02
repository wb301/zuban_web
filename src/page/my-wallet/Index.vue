<template>
    <div>
        <div class="container-body">
            <div class="wallet-hd">
                <div class="title">账户余额（元）</div>
                <div class="money">{{userInfo.money.maxMoney}}</div>
            </div>
            <div class="weui-tab">
                <div class="weui-navbar">
                    <div class="weui-navbar__item weui-bar__item_on">
                        可提现（元）：{{userInfo.money.available}}
                    </div>
                    <div class="weui-navbar__item">
                        冻结中（元）：{{userInfo.money.freeze}}
                    </div>
                </div>
                <div class="weui-tab__panel">
                </div>
            </div>
            <div class="weui-cells">
                <div class="weui-cell" href="javascript:;">
                    <label class="weui-label class_font_size_hd" @click='toWithdraw'>申请提现</label>
                    <input class="weui-input disabled-input class_font_size_bd" type="text" />
                    <div><router-link :to="{path:'/money'}"><img :src="arrow" style="width:15px;height:15px;" /></router-link></div>
                </div>
                <div class="weui-cell" href="javascript:;">
                    <label class="weui-label class_font_size_hd" @click='toMoneyHistroy'>收支明细</label>
                    <input class="weui-input disabled-input class_font_size_bd" type="text" />
                    <div><router-link to="{path:'/detail'}"><img :src="arrow" style="width:15px;height:15px;" /></router-link></div>
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
// import 'src/lib/js/dropload.min.js'
// import 'src/lib/css/dropload.css'
export default {
    components: {},
    data() {
        return {
            arrow: jiantou,
            userInfo: NormalHelper.userInfo()
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

            var param = {
                token: this.userInfo.token
            };
            var p_obj = {
                action: 'c=Zb&m=User&a=getUserInfo',
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
        },
        toWithdraw() {
            console.log("申请提现");
            // this.$router.push({
            //     path: '/my-wallet'
            // });
        },
        toMoneyHistroy() {
            console.log("收支明细");
            // this.$router.push({
            //     path: '/my-wallet'
            // });
        }
    }
}
</script>
