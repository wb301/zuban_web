<template>
    <div>
        <div class="container-body">
            <div class="wallet-hd">
                <div class="title">账户余额（元）</div>
                <div class="money">299.09</div>
            </div>
            <div class="weui-tab">
                <div class="weui-navbar">
                    <div class="weui-navbar__item weui-bar__item_on">
                        可提现（元）：
                    </div>
                    <div class="weui-navbar__item">
                        冻结中（元）：
                    </div>
                </div>
                <div class="weui-tab__panel">
                </div>
            </div>
            <div class="weui-cells">
                <div class="weui-cell" href="javascript:;">申请提现</div>
                <div class="weui-cell" href="javascript:;">收支明细</div>
            </div>
            <div>说明文字</div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.container-body {
    text-align: center;
    margin-top: 20px;
    .wallet-hd {
        background-image: linear-gradient(-180deg, #A878E5 0%, #8760BA 100%);
        height: 150px;
        color: #fff;
        .title {
            padding-top: 30px;
            font-size: 15px;
        }
        .money {
            font-size: 50px;
        }
    }
    .weui-navbar {
        border: 1px solid #A878E5;
        .weui-navbar__item {
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            color: #8760BA;
            letter-spacing: 0.85px;
        }
        .weui-bar__item_on {
            background-color: #A878E5;
            color: #fff;
            // padding-bottom: -5px;
        }
    }
    .weui-cell {
        height: 45px;
        font-size: 14px;
        color: #333;
        line-height: 45px;
    }
}
</style>
<script>
// import 'src/lib/js/dropload.min.js'
// import 'src/lib/css/dropload.css'
export default {
    components: {},
    data() {
        return {

        }
    },
    mounted() {
        // this.createDropload();
    },
    methods: {
        // createDropload() {
        //     var _self = this;
        //     dropload = $('.dropload-wapper').dropload({
        //         domUp: {
        //             domClass: 'dropload-up',
        //             // 下拉过程显示内容
        //             domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
        //             // 下拉到一定程度显示提示内容
        //             domUpdate: '<div class="dropload-update">↑释放更新</div>',
        //             // 释放后显示内容
        //             domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        //         },
        //         domDown: {
        //             domClass: 'dropload-down',
        //             // 滑动到底部显示内容
        //             domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
        //             // 内容加载过程中显示内容
        //             domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
        //             // 没有更多内容-显示提示
        //             domNoData: '<div class="dropload-noData">暂无数据</div>'
        //         },
        //         loadUpFn: function(me) {
        //             _self.page = 1;
        //             _self.getShowProductList(me);
        //         },
        //         loadDownFn: function(me) {
        //             _self.page++;
        //             _self.getShowProductList(me);
        //         }
        //     });
        // },
        // destroyed() {}
    }
}
</script>
