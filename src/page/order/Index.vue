<template>
    <div class="container-body">
    <div class="weui-tab">
        <div class="weui-navbar">
            <div class="weui-navbar__item weui-bar__item_on" @click="changeStatus('ALL')">
                全部
            </div>
            <div class="weui-navbar__item" @click="changeStatus('WaitingPay')">
                代付款
            </div>
            <div class="weui-navbar__item" @click="changeStatus('WaitingPay')">
                待确认
            </div>
              <div class="weui-navbar__item" @click="changeStatus('WaitingPay')">
                            进行中
                        </div>
                          <div class="weui-navbar__item" @click="changeStatus('End')">
                                        已完成
                                    </div>
        </div>
    </div>
        <div >
            <div class="dropload-wapper">
                <div>
                    <list-item v-for="(item,index) in productList" :item="item"></list-item>
                </div>
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
            type: 0,
            status: 'ALL',

        }
    },
    mounted() {
        this.type = this.$route.params.type
        this.getOrderList();
    },
    methods: {
    changeStatus(type){
    this.status=type;
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
