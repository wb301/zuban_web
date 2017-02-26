<template>
    <div>
        <div class="item-cell">
            <p style="float: left;margin-left: 10px;margin-top: 2px">{{item.name}}￥{{item.price}}元</p>
            <a @click="payVip(item)" class="weui-btn weui-btn_mini weui-btn_warn" style="float: right;margin-right: 10px">充值</a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {}
    },
    data() {
        return {}
    },
    methods: {
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
.item-cell {
    height: 45px;
    width: 100%;
}
</style>
