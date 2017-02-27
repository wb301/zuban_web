<template>
    <div class="container-body">
        <div class="dropload-wapper">
            <div>
                <list-item v-for="(item,index) in orderList" :item="item"></list-item>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
</style>
<script>
import orderList from './item.vue'
import image from './image/1.jpg'
import 'src/lib/js/dropload.min.js'
import 'src/lib/css/dropload.css'
export default {
    components: {
        orderList,
        meinv
    },
    data() {
    	return{

    	}
    },
    mounted(){
    	this.createDropload();
    },
    methods:{
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
        },
    destroyed() {}
    }
}
</script>
