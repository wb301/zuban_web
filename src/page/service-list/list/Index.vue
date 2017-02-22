<template>
    <div>
        <div class="container-body">
            <div class="weui-tab">
                <div class="weui-navbar">
                    <div class="weui-navbar__item" @click="selectRegion">
                        地区
                        <img :src="image" />
                    </div>
                    <div class="weui-navbar__item" @click="selectCategory">
                        分类
                        <img :src="image" />
                    </div>
                    <div class="weui-navbar__item" @click="selectSort">
                        排序
                        <img :src="image" />
                    </div>
                </div>
            </div>
            <div class="dropload-wapper">
                <list-item v-for="(item,index) in productList" :item="item"></list-item>
            </div>
        </div>
</template>
<script>
import xiala from './image/xiala.png'
import 'src/lib/js/dropload.min.js'
import 'src/lib/css/dropload.css'
import ListItem from './item'

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
            productList: []
        }
    },
    mounted() {
        this.getRegionList();
        this.getCategoryList();
        this.getShowProductList();
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
            }, {
                label: "智能综合",
                value: 'zh'
            }];
            weui.picker(arr, {
                defaultValue: ['mr'],
                className: 'custom-classname',
                onConfirm: function(result) {
                    //TODO:
                },
                id: 'sortPicker'
            });
        },
        getRegionList() {
            var param = {
                c: 'Zb',
                m: 'Region',
                a: 'getRegionList',
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
                defaultValue: [2],
                className: 'custom-classname',
                onConfirm: function(result) {
                    //TODO:
                },
                id: 'regionPicker'
            });
        },
        getCategoryList() {
            var param = {
                c: 'Zb',
                m: 'Category',
                a: 'getCategoryList',
                mapping: {
                    name: 'label',
                    code: 'value'
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
                defaultValue: [2],
                className: 'custom-classname',
                onConfirm: function(result) {
                    //TODO:
                },
                id: 'categoryPicker'
            });
        },
        getShowProductList() {
            var param = {
                c: 'Zb',
                m: 'Product',
                a: 'getShowProductList',
                logitude: 1,
                latitude: 12,
                page: 1,
                row: 10
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.productList = response.list;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        createDropload() {
            $('.inner').dropload({
                domUp: {
                    domClass: 'dropload-up',
                    domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
                    domUpdate: '<div class="dropload-update">↑释放更新</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
                },
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                loadUpFn: function(me) {
                    $.ajax({
                        type: 'GET',
                        url: 'json/update.json',
                        dataType: 'json',
                        success: function(data) {
                            var result = '';
                            for (var i = 0; i < data.lists.length; i++) {
                                result += '<a class="item opacity" href="' + data.lists[i].link + '">' + '<img src="' + data.lists[i].pic + '" alt="">' + '<h3>' + data.lists[i].title + '</h3>' + '<span class="date">' + data.lists[i].date + '</span>' + '</a>';
                            }
                            // 为了测试，延迟1秒加载
                            setTimeout(function() {
                                $('.lists').html(result);
                                // 每次数据加载完，必须重置
                                dropload.resetload();
                            }, 1000);
                        },
                        error: function(xhr, type) {
                            alert('Ajax error!');
                            // 即使加载出错，也得重置
                            dropload.resetload();
                        }
                    });
                },
                loadDownFn: function(me) {
                    $.ajax({
                        type: 'GET',
                        url: 'json/more.json',
                        dataType: 'json',
                        success: function(data) {
                            var result = '';
                            for (var i = 0; i < data.lists.length; i++) {
                                result += '<a class="item opacity" href="' + data.lists[i].link + '">' + '<img src="' + data.lists[i].pic + '" alt="">' + '<h3>' + data.lists[i].title + '</h3>' + '<span class="date">' + data.lists[i].date + '</span>' + '</a>';
                            }
                            // 为了测试，延迟1秒加载
                            setTimeout(function() {
                                $('.lists').append(result);
                                // 每次数据加载完，必须重置
                                dropload.resetload();
                            }, 1000);
                        },
                        error: function(xhr, type) {
                            alert('Ajax error!');
                            // 即使加载出错，也得重置
                            dropload.resetload();
                        }
                    });
                }
            });
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
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
}
</style>
