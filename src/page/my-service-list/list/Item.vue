<template>
    <div>
        <div class="item-entry" @click="toProductInfo()">
            <div class="wapper">
                <div class="img-wapper"><img :src="item.product_image"></div>
                <div class="info-wapper">
                    <div>
                        <div class="info-top">
                            <div>
                                <span class="title">{{item.category_name}}</span>
                                <span class="status">{{item.statusName}}</span>
                            </div>
                            <div>
                                <span class="region">{{item.region_name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="info-bottom">
                        <div class="price">
                            <span>￥</span>
                            <span>{{item.price}}</span>
                            <span>/{{item.danwei}}</span>
                        </div>
                        <div class="content">{{item.product_info}}</div>
                        <div class="btn-remove" @click.stop="updateProductInfo(1)" v-if="item.status==0">上架</div>
                        <div class="btn-remove" @click.stop="updateProductInfo(0)" v-if="item.status==1">下架</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {}
    },
    watch: {
        item: {
            handler: function() {
                this.item.danwei = "小时";
                if (this.item.price_type == 2) {
                    this.item.danwei = "天";
                } else if (this.item.price_type == 3) {
                    this.item.danwei = "次";
                }
                var map = {
                    "0": "已下架",
                    "1": "已上架",
                    "2": "出售中"
                };
                this.item.statusName = map[this.item.status];
            },
            immediate: true
        }
    },
    methods: {
        toProductInfo() {
            this.$router.push({
                path: '/service-edit/' + this.item.product_sys_code
            });
        },
        updateProductInfo(status) {
            var p_obj = {
                action: 'c=Zb&m=Product&a=updateProductInfo',
                param: {
                    productInfo: {
                        status: status,
                        product_sys_code: this.item.product_sys_code
                    }
                },
                success: (response) => {
                    this.item.status = status;
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
                position: relative;
                >div:not(.btn-remove) {
                    line-height: 15px;
                }
                .price {
                    margin-top: 12px;
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
                .btn-remove {
                    position: absolute;
                    right: 10px;
                    bottom: 15px;
                    border-radius: 4px;
                    font-size: 12px;
                    text-align: center;
                    width: 63px;
                    height: 26px;
                    line-height: 26px;
                    color: #8760BA;
                    border: 1px solid #A878E5;
                }
            }
        }
    }
}
</style>
