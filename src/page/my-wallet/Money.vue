<template>
    <div>
        <div class="container-body">
            <div class="weui-cells" style="margin-top: 0px">
                <div class="weui-cell" href="javascript:;">
                    <label class="weui-label">支付宝账号</label>
                    <input class="weui-input" v-model="alipay_account" type="text" placeholder="请输入支付宝账号" />
                </div>
                <div class="weui-cell" href="javascript:;">
                    <label class="label">金额</label>
                    <input class="weui-input" v-model="money_model" type="text" placeholder="请输入提现金额" />
                    <label class="label" @click="allWithdraw">全部提现</label>
                </div>
                <div class="weui-cell" href="javascript:;">
                    <label class="class_font_size_hd">可提现金额(元):</label>
                    <label class="weui-input disabled-input">{{userInfo.money.available}}</label>
                    <input class="weui-input" v-model="categor" type="text" />
                </div>
            </div>
            <button class="weui-btn weui-btn_primary" @click='toWithdraw'>下一步</button>
        </div>
    </div>
</template>
<style lang="less" scoped>
.container-body {
    .weui-cell {
        height: 40px;
        font-size: 13px;
        .weui-label{
            width:30%;
        }
        .class_font_size_hd{
            width:80%;
        }
        .label {
            width: 20%;
        }
        input {
            width: 68%;
            height: 13px;
            display: block;
        }
    }
    .weui-btn {
        margin-top: 30px;
        height: 45px;
        width: 345px;
        background-color: #A877E6;
    }
}
</style>
<script>
export default {
    components: {},
    data() {
        return {
            userInfo: NormalHelper.userInfo(),
            money_model: "",
            alipay_account: ""
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
                    console.log(this.userInfo);
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        toWithdraw() {
            if(this.money_model == "" || this.money_model <= 0){
                weui.alert("请输入提现金额");
                return false;
            }

            if(this.money_model > this.userInfo.money.available){
                weui.alert("提现金额不能大于可提现金额");
                return false;
            }

            if(this.alipay_account == ""){
                weui.alert("请输入支付宝账号");
                return false;
            }

            var param = {
                token: this.userInfo.token,
                price: this.money_model,
                account: this.alipay_account,
                from: "ZFB"
            };
            var p_obj = {
                action: 'c=Zb&m=User&a=userApplyWithdraw',
                param: param,
                success: (response) => {
                    this.getUserInfo();
                    weui.alert("提现成功");
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        allWithdraw() {
            this.money_model = this.userInfo.money.available;
        }
    }
}
</script>
