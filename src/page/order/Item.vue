<template>
<div>

<div class="item-entry" >
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
.item-entry {
    padding-top: 12.5px;
    height: 117.5px;
    position: relative;
    .wapper {
        border-bottom: 1px solid #e2e2e2;
        position: absolute;
        right: 0;
        left: 15px;
        top: 0;
        bottom: 0;
        padding-top: 12.5px;
        .img-wapper {
            width: 90px;
            height: 90px;
            img {
                width: 90px;
                height: 90px;
            }
        }
        .info-wapper {
            position: absolute;
            left: 100px;
            right: 0;
            top: 12.5px;
            bottom: 15px;
            >div {
                height: 45px;

            }
            .info-top {
                >div {
                    line-height: 15px;
                }
                .title {
                    font-size: 13px;
                    color: #333;
                }
                .name {
                    font-size: 10px;
                    color: #999;
                }
                .juli {
                    font-size: 10px;
                    color: #999;
                    position: absolute;
                    right: 10px;
                }
            }
            .info-bottom {
                >div {
                    line-height: 15px;
                }
                .price {
                    color: #A878E5;
                    span:nth-child(1) {
                        font-size: 12px;
                    }
                    span:nth-child(2) {
                        font-size: 17px;
                    }
                    span:nth-child(3) {
                        font-size: 10px;
                    }
                }
                .content {
                    font-size: 10px;
                    color: #999;
                }
            }
        }
    }
}
</style>
