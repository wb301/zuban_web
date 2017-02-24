<template>

       <div class="weui-form-preview">
           <div class="weui-form-preview__hd">
               <label class="weui-form-preview__label">付款金额</label>
               <em class="weui-form-preview__value">¥{{item.total_price}}</em>
           </div>
           <div class="weui-form-preview__bd">
               <p>
                   <label class="weui-form-preview__label">商品</label>
                   <span class="weui-form-preview__value">{{item.productList[0].product.product_info}}</span>
               </p>
                <p>
                     <label class="weui-form-preview__label">状态</label>
                      <span class="weui-form-preview__value">{{item.status_name}}</span>
                 </p>
           </div>
           <div class="weui-form-preview__ft">
               <a class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:">操作</a>
           </div>
       </div>

</template>
<script>
export default {
    props: {
        item: {}
    },
    data() {
        return {}
    },
    created: function() {

    },
    mounted() {

    },
    methods: {},
    destroyed() {}
}
</script>
<style lang="less" scoped>
.item-entry {

}
</style>
