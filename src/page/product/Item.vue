<template>
<div class="weui-panel weui-panel_access">
   <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
            <img :src="item.productList[0].product.product_image" class="weui-media-box__thumb">
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title">{{item.productList[0].product.category_name}}</h4>
                <p class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
            </div>
        </a>

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
