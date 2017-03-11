<template>
    <div>
        <div class="item-entry">
            <div class="info-wapper">
                <div class="title">{{item.remark}}</div>
                <div>
                    {{item.create_time}}
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
    }
}
</script>
<style lang="less" scoped>
.item-entry {
    border-bottom: 1px solid #e2e2e2;
    padding: 7.5px 15px;
    .info-wapper {
        position: relative;
        .title {
            word-break: break-all;
            font-size: 14px;
            color: #333;
        }
        >div:nth-child(2) {
            font-size: 10px;
            color: #999;
            height: 20px;
            line-height: 20px;
        }
        .price {
            font-size: 14px;
            color: #E35257;
            position: absolute;
            right: 0px;
        }
        .price2 {
            font-size: 14px;
            color: #1CAC1B;
            position: absolute;
            right: 0px;
        }
    }
}
</style>
