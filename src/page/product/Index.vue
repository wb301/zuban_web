<template>
    <div class="container-body">
        <!-- <swiper v-ref:swiper direction="horizontal" :mousewheel-control="true" :performance-mode="false" :pagination-visible="true" :pagination-clickable="true" :loop=“true” @slide-change-start="onSlideChangeStart" @slide-change-end="onSlideChangeEnd">
            <div>Page 1</div>
            <div>Page 2</div>
            <div>Page 3</div>
        </swiper> -->
    </div>
</template>
<script>
import 'src/lib/js/dropload.min.js'
import 'src/lib/css/dropload.css'
import ListItem from './item'
import Swiper from 'vue-swiper'
export default {
    components: {
        ListItem,
        Swiper
    },
    data() {
        return {
            productList: [],
            page: 1,
            type: 0,
            status: 'ALL',

        }
    },
    mounted() {
        this.type = this.$route.params.type
        this.getOrderList();
    },
    methods: {
        onSlideChangeStart(currentPage) {
            console.log('onSlideChangeStart', currentPage);
        },
        onSlideChangeEnd(currentPage) {
            console.log('onSlideChangeEnd', currentPage);
        },
        changeStatus(type) {
            this.status = type;
            //$(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
            this.getOrderList();
        },

        getOrderList() {
            var param = {
                c: 'Zb',
                m: 'Order',
                a: 'orderCommonFilter',
                status: this.status,
                type: this.type,
                page: this.page,
                row: 5
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    if (this.page == 1) {
                        this.productList = response.list;
                        if (response.list.length <= 0) {

                        }
                    } else {
                        if (response.list.length > 0) {
                            for (var i = 0; i < response.list.length; i++) {
                                this.productList.push(response.list[i]);
                            }
                        }
                    }
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },

    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
