<template>
    <div>
        <div class="container-body">
            <div class="weui-tab">
                <div class="weui-navbar">
                    <div class="weui-navbar__item" @click="selectRegion">
                        {{name.region}}
                        <img :src="image" />
                    </div>
                    <div class="weui-navbar__item" @click="selectCategory">
                        {{name.category}}
                        <img :src="image" />
                    </div>
                    <div class="weui-navbar__item" @click="selectSort">
                        {{name.order}}
                        <img :src="image" />
                    </div>
                </div>
            </div>
            <div class="dropload-wapper">
                <div>
                    <list-item v-for="(item,index) in productList" :item="item"></list-item>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import xiala from './image/xiala.png'
import 'src/lib/js/dropload.min.js'
import 'src/lib/css/dropload.css'
import ListItem from './item'
var dropload = '';
export default {
    components: {
        ListItem
    },
    data() {
        return {
            image: xiala,
            area: '',
            areaList: [],
            regionList: [],
            categoryList: [],
            productList: [],
            page: 0,
            orderBy: '',
            categoryId: '',
            regionCode: '',
            pos: NormalHelper.getPostion(),
            name: {
                region: '地区',
                category: '分类',
                order: '排序'
            }
        }
    },
    mounted() {
        this.getRegionList();
        this.getCategoryList();
        this.createDropload();
    },
    methods: {
        selectSort() {
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
                id: 'sortPicker'
            });
        },
        getRegionList() {
            var param = {
                c: 'Zb',
                m: 'Region',
                a: 'getRegionList',
                fixAll: 1,
                mapping: {
                    name: 'label',
                    code: 'value'
                }
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.regionList = response;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        selectRegion() {
            var _self = this;
            weui.picker(this.regionList, {
                defaultValue: [1],
                className: 'custom-classname',
                onConfirm: function(result) {
                    _self.regionCode = result[2].value;
                    _self.name.region = result[2].label;
                    _self.page = 1;
                    _self.getShowProductList(dropload);
                },
                id: 'regionPicker'
            });
        },
        getCategoryList() {
            var param = {
                c: 'Zb',
                m: 'Category',
                a: 'getCategoryList',
                fixAll: 1,
                mapping: {
                    category_name: 'label',
                    id: 'value'
                }
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.categoryList = response;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        selectCategory() {
            var _self = this;
            weui.picker(this.categoryList, {
                defaultValue: [1],
                className: 'custom-classname',
                onConfirm: function(result) {
                    _self.categoryId = result[1].value;
                    _self.name.category = result[1].label;
                    _self.page = 1;
                    _self.getShowProductList(dropload);
                },
                id: 'categoryPicker'
            });
        },
        getShowProductList(me) {
            var param = {
                c: 'Zb',
                m: 'Product',
                a: 'getShowProductList',
                page: this.page,
                row: 10
            };
            if (this.orderBy != "") {
                param.orderBy = this.orderBy;
            }
            if (this.categoryId != "") {
                param.categoryId = this.categoryId;
            }
            if (this.regionCode != "") {
                param.regionCode = this.regionCode;
            }
            param.latitude = this.pos.latitude;
            param.logitude = this.pos.logitude;
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    if (this.page == 1) {
                        this.productList = response.list;
                        if (response.list.length > 0) {
                            me.resetload();
                            me.unlock();
                            me.noData(false);
                        } else {
                            me.noData();
                            me.resetload();
                        }
                    } else {
                        if (response.list.length > 0) {
                            for (var i = 0; i < response.list.length; i++) {
                                this.productList.push(response.list[i]);
                            }
                        } else {
                            me.lock();
                            me.noData();
                        }
                        me.resetload();
                    }
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        createDropload() {
            var _self = this;
            dropload = $('.dropload-wapper').dropload({
                domUp: {
                    domClass: 'dropload-up',
                    // 下拉过程显示内容
                    domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
                    // 下拉到一定程度显示提示内容
                    domUpdate: '<div class="dropload-update">↑释放更新</div>',
                    // 释放后显示内容
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
                },
                domDown: {
                    domClass: 'dropload-down',
                    // 滑动到底部显示内容
                    domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                    // 内容加载过程中显示内容
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    // 没有更多内容-显示提示
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                loadUpFn: function(me) {
                    _self.page = 1;
                    _self.getShowProductList(me);
                },
                loadDownFn: function(me) {
                    _self.page++;
                    _self.getShowProductList(me);
                }
            });
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    .weui-tab {
        background: #FFFFFF;
        img {
            width: 12px;
            height: 12px;
        }
    }
    .dropload-wapper {
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }
}
</style>
