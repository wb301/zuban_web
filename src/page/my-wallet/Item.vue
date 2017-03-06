<template>
    <div>
        <div class="item-entry">
            <div class="wapper">
                <div class="info-wapper">
                    <div><span class="title">{{item.remark}}</sapn></div>
                    <span class="time">{{item.create_time}}</span>
                <span v-if="item.price_type == 1 || item.price_type == 3 || item.price_type == 4" class="price">{{item.price}}元</span>
                <span v-if="item.price_type == 2 || item.price_type == 5 || item.price_type == 6" class="price2">{{item.price}}元</span>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {},
    },
    data() {
        return {}
    },
    methods: {
        // if(item.type !=2){
        //     this
        // }else{

        // }
    },
    // destroyed() {}
}
</script>
<style lang="less" scoped>
.item-entry {
    height: 60px;
    position: relative;
    .wapper {
        border-bottom: 1px solid #e2e2e2;
        position: absolute;
        right: 0;
        left: 0px;
        top: 0;
        bottom: 0;
        padding-top: 0px;
        .info-wapper {
            position: absolute;
            left: 15px;
            right: 15px;
            top: 12.5px;
            bottom: 15px;
            line-height: 15px;
            .title {
                font-size: 14px;
                color: #333;
            }
            .time {
                font-size: 10px;
                color: #999;
                margin-top: 5px;
            }
            .price {
                font-size: 14px;
                color: #E35257;
                position: absolute;
                right: 10px;
            }
            .price2{
                font-size: 14px;
                color: #1CAC1B;
                position: absolute;
                right: 10px;
            }
        }
    }
}
</style>
