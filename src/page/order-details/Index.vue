<template>
    <div>
        <div class="container-body">
            <div class="details-wapper">
                <div class="weui-media-box__hd">
                    <img :src="this.head_img" class="weui-media-box__thumb">
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">标题一</h4>
                    <p class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import 'src/lib/js/dropload.min.js'
import 'src/lib/css/dropload.css'
export default {
    components: {

    },
    data() {
        return {
            orderDetails:[],
            type: 0, //0是买家查看订单 1 卖家查看订单
            orderNo:'',
            head_img:'',
            nick_name:'',

        }
    },
    mounted() {
        this.type = this.$route.params.type
        this.orderNo = this.$route.params.orderNo
        this.getOrderDetails();
    },
    methods: {

        //订单详情
        getOrderDetails() {
            var param = {
                c: 'Zb',
                m: 'Order',
                a: 'getOrderDetails',
                orderNo: this.orderNo
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    if(response.length <= 0){
                       weui.alert('网络异常！')
                    }
                    this.orderDetails = response;
                    //0是买家看卖家，1是卖家看买家
                    this.head_img=response.seller.head_img;
                    this.nick_name=response.seller.nick_name;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
},
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    .details-wapper{
        height: 117.5px;
        position: relative;

    }
    }

</style>
