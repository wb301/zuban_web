<template>
    <div>
        <div class="item-entry">
            <div class="wapper">
                <!-- <div class="img-wapper"><img :src="item.product_image"></div> -->
                <div class="info-wapper">
                    <div>
                        <div class="info-top">
                            <div>
                                <span class="title">{{item.name}}</span>
                            </div>
                            <div>
                                <!-- <span class="name">{{item.userInfo.nick_name}}</span> -->
                            </div>
                        </div>
                    </div>
                    <div class="info-bottom">
                        <div class="price">
                            <span>￥</span><!-- 
                            <span>{{item.price}}</span>
                            <span>/{{item.danwei}}</span> -->
                        </div>
                        <!-- <div class="content">{{item.product_info}}</div> -->
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
        // this.item.juli = parseFloat(this.item.juli / 1000).toFixed(1);
        // this.item.danwei = "小时";
        // if (this.item.price_type == 2) {
        //     this.item.danwei = "天";
        // }else if(this.item.price_type == 3){
        //     this.item.danwei = "次";
        // }
    },
    methods: {},
    destroyed() {}
}
</script>
<style lang="less" scoped>
.item-entry {
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
