<template>
    <div>
        <div class="item-entry" @click="toProductInfo(item)">
            <div class="wapper">
                <div class="info-wapper">
                    <div>
                        <div class="info-top">
                            <div>
                                <span class="title">{{item.remark}}</span>
                                <span class="status">{{item.create_time}}</span>
                            </div>
                            <div>
                                <span class="region">{{item.price}}</span>
                            </div>
                        </div>
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
    // created: function() {
    //     var map = {
    //         "3": "收款",
    //         "5": "提现"
    //     };
    //     this.item.statusName = map[this.item.price_type];
    // },
    methods: {
        // toProductInfo(item){
        //     this.$router.push({
        //         path: '/product/'+item.product_sys_code
        //     });
        // }
    },
    // destroyed() {}
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
                .region {
                    font-size: 10px;
                    color: #999;
                }
                .status {
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
