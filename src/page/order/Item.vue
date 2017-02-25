<template>
<div>
<div class="weui-panel weui-panel_access">
 <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
                <div class="weui-cell" >
                    <div class="weui-cell__hd">
                     <img :src="item.seller.head_img" class="weui-media-box__thumb" style="width: 25px;height:25px;display: block">
                     </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>{{item.seller.nick_name}}</p>
                    </div>
                     <div class="weui-cell__bd weui-cell_primary">
                                <p>{{item.status_name}}</p>
                                   </div>
                    <span class="weui-cell__ft"></span>
                </div>

            </div>
   <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
            <img :src="item.productList[0].product.product_image" class="weui-media-box__thumb">
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title">{{item.productList[0].product.category_name}}</h4>
                <p class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
            </div>
        </div>
    </div>
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
     created: function() {

        },
    mounted() {

    },
    methods: {},
    destroyed() {}
}
</script>
<style lang="less" scoped>
.item-entry {}
</style>
