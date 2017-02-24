<template>
    <div>
        <div class="container-body">
            <div class="release-wapper">
                <div class="image-manipulation"></div>
                <div class="segmentation"></div>
                <div class="content-manipulation">
                    <div class="weui-cells">
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">服务内容</label>
                            </div>
                            <div class="weui-cell__bd">
                                <input class="weui-input" type="test" placeholder="比如陪吃饭、陪看电影" />
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">价格</label>
                            </div>
                            <div class="weui-cell__bd">
                                <input class="weui-input" type="test" placeholder="请输入服务价格/元" />
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">价格单位</label>
                            </div>
                            <div class="weui-cell__bd">
                                <input class="weui-input disabled-input" type="text" @click="selectUnitPrice" />
                            </div>
                            <div><img :src="image"></div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">服务地区</label>
                            </div>
                            <div class="weui-cell__bd">
                                <input class="weui-input disabled-input" type="text" />
                            </div>
                            <div><img :src="image"></div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">服务类型</label>
                            </div>
                            <div class="weui-cell__bd">
                                <input class="weui-input disabled-input" type="text" />
                            </div>
                            <div><img :src="image"></div>
                        </div>
                    </div>
                    <div class="agreement">
                        <div class="agreed">
                            同意
                            <router-link :to="{path: '/registered'}">《租伴网服务者入住协议》
                            </router-link>
                        </div>
                        <div class="instructions">说明：交易成功，平台收取交易额10%的手续费</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import xiala from 'src/page/service-list/list/image/xiala.png'
export default {
    components: {},
    data() {
        return {
            image: xiala
        }
    },
    mounted() {
        $(".disabled-input").focus(function() {
            document.activeElement.blur();
        });
    },
    methods: {
        selectUnitPrice() {
            var arr = [{
                label: "最近时间",
                value: 'mr'
            }, {
                label: "价格低到高",
                value: 'jg_0'
            }, {
                label: "价格从低到高",
                value: 'jg_0'
            }, {
                label: "价格从高到低",
                value: 'jg_1'
            }, {
                label: "距离从近到远",
                value: 'jl_0'
            }, {
                label: "距离从远到近",
                value: 'jl_1'
            }];
            var _self = this;
            weui.picker(arr, {
                defaultValue: ['mr'],
                className: 'custom-classname',
                onConfirm: function(result) {
                    _self.orderBy = result[0].value;
                    _self.name.order = result[0].label;
                    _self.page = 1;
                    _self.getShowProductList(dropload);
                },
                id: 'unitPricePicker'
            });
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    .release-wapper {
        .image-manipulation {}
        .segmentation {
            height: 8px;
            background: #F5F5F5;
        }
        .content-manipulation {
            .weui-cell>div {
                img {
                    width: 12px;
                    height: 12px;
                }
            }
            .agreement {
                height: 79px;
                margin-left: 15px;
                .agreed {
                    font-size: 13px;
                    height: 39.5px;
                    display: table-cell;
                    vertical-align: bottom;
                }
                .instructions {
                    font-size: 11px;
                    color: #E35257;
                    height: 50%;
                }
            }
        }
    }
}
</style>
