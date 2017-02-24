<template>
    <div>
        <div class="container-body">
            <div class="dropload-wapper">
                <div>
                    <list-item v-for="(item,index) in productList" :item="item"></list-item>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import 'src/lib/js/dropload.min.js'
import 'src/lib/css/dropload.css'
import ListItem from './item'
export default {
    components: {
        ListItem
    },
    data() {
        return {
            productList: [],
            page: 1,
            type: 0

        }
    },
    mounted() {
        this.type = this.$route.params.type
        this.getOrderList();
    },
    methods: {
        getOrderList() {
            var param = {
                c: 'Zb',
                m: 'Order',
                a: 'orderCommonFilter',
                status: 'ALL',
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
