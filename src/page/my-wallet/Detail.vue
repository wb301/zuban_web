<template>
    <div>
        <div class="container-body">
            <div class="weui-tab">
                <div class="weui-navbar">
                    <div class="weui-navbar__item" @click="selectStatus">
                        <span>{{list.price_type}}</span>
                    </div>
                </div>
            </div>
            <div class="dropload-wapper">
                <div>
                    <list-item v-for="(item,index) in HistoryList" :item="item"></list-item>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import 'src/lib/js/dropload.min.js'
import 'src/lib/css/dropload.css'
import HistoryList from './item'
var dropload = '';
export default {
    components: {
        HistoryList
    },
    data() {
        return {
            list: [],
            page: 0,
            status: '1',
            // name: {
            //     status: "全部"
            // }
        }
    },
    mounted() {
        this.createDropload();
    },
    methods: {
        selectStatus() {
            var arr = [{
                label: "全部",
                value: '-1'
            }, {
                label: "收款",
                value: '3'
            }, {
                label: "提现",
                value: '5'
            }];
            var _self = this;
            weui.picker(arr, {
                defaultValue: ['-1'],
                className: 'custom-classname',
                onConfirm: function(result) {
                    _self.status = result[0].value;
                    _self.list.price_type = result[0].label;
                    _self.page = 1;
                    _self.getUserMoneyHistoryList(dropload);
                },
                id: 'statusPicker'
            });
        },
        getUserMoneyHistoryList(me) {
            var param = {
                c: 'Zb',
                m: 'User',
                a: 'getUserMoneyHistoryList',
                token: '4a03812ccc71e558ec4344be6484fa64',
                page: this.page,
                row: 5
            };
            if (this.status != "") {
                param.status = this.status;
            }
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    if (this.page == 1) {
                        this.HistoryList = response.list;
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
                                this.HistoryList.push(response.list[i]);
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
                    _self.getUserMoneyHistoryList(me);
                },
                loadDownFn: function(me) {
                    _self.page++;
                    _self.getUserMoneyHistoryList(me);
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
