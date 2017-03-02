<template>
    <div>
        <div class="container-body">
            <div class="weui-cells">
                <div class="weui-cell" href="javascript:;">
                    <label class="class_font_size_hd">支付宝账号</label>
                    <input class="weui-input" v-model="alipay_account" type="text" placeholder="请输入支付宝账号" />
                </div>
                <div class="weui-cell" href="javascript:;">
                    <label class="label">金额</label>
                    <input class="weui-input" v-model="money" type="text" placeholder="请输入提现金额" />
                    <a>全部提现</a>
                </div>
                <div class="weui-cell" href="javascript:;">
                    <label class="weui-label">可提现金额(元):</label>
                    <input class="weui-input" v-model="categor" type="text" />
                </div>
            </div>
            <button class="weui-btn weui-btn_primary">下一步</button>
        </div>
    </div>
</template>
<style lang="less" scoped>
.container-body {
    .weui-cell {
        height: 40px;
        font-size: 13px;
        .class_font_size_hd{
            width:25%;
        }
        .label {
            width: 12%;
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
</script>
