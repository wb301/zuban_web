<template>
    <div>
        <div class="content-manipulation ">
            <div class="weui-cells " style="margin-top: 0px ">
                <div class="weui-cell">
                    <div class="weui-cell__hd class_font_size_hd">
                        <label class="weui-label class_font_size_hd">银行卡卡号</label>
                    </div>
                    <div class="weui-cell__bd class_font_size_bd">
                        <input class="weui-input" v-model="alipay_account" type="text" placeholder="请输入银行卡卡号" />
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd class_font_size_hd">
                        <label class="weui-label class_font_size_hd">银行名称</label>
                    </div>
                    <div class="weui-cell__bd class_font_size_bd">
                        <input class="weui-input" v-model="alipay_bank_name" type="text" placeholder="请输入银行名称" />
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd class_font_size_hd">
                        <label class="weui-label class_font_size_hd">银行卡所属人</label>
                    </div>
                    <div class="weui-cell__bd class_font_size_bd">
                        <input class="weui-input" v-model="alipay_user_name" type="text" placeholder="请输入银行卡所属人" />
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd class_font_size_hd">
                        <label class="weui-label class_font_size_hd">金额</label>
                    </div>
                    <div class="weui-cell__bd class_font_size_bd">
                        <input class="weui-input" v-model="money_model" type="text" placeholder="请输入提现金额" />
                    </div>
                    <div class="weui-cell__ft class_font_size_bd">
                        <label class="label" @click="allWithdraw">全部提现</label>
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd class_font_size_hd">
                        <label class="weui-label class_font_size_hd">可提现金额(元):</label>
                    </div>
                    <div class="weui-cell__bd class_font_size_bd">
                        <label class="weui-input disabled-input">{{userInfo.money.available}}</label>
                    </div>
                </div>
            </div>
        </div>
        <button class="weui-btn weui-btn_primary weui-btn" @click='toWithdraw'>下一步</button>
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
            width:100%;
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

.weui-btn {
    margin-top: 30px;
    height: 45px;
    width: 345px;
    background-color: #A877E6;
}
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
<script>
export default {
    components: {},
    data() {
        return {
            userInfo: NormalHelper.userInfo(),
            money_model: "",
            alipay_account: "",
            alipay_bank_name: "",
            alipay_user_name: ""
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
                weui.alert("请输入银行卡卡号");
                return false;
            }

            if(this.alipay_bank_name == ""){
                weui.alert("请输入银行名称");
                return false;
            }

            if(this.alipay_user_name == ""){
                weui.alert("请输入银行卡所属人");
                return false;
            }

            var param = {
                token: this.userInfo.token,
                price: this.money_model,
                account: this.alipay_account,
                bank_name: this.alipay_bank_name,
                user_name: this.alipay_user_name,
                from: "YHK"
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
