<template>
    <div>
        <div class="item-entry">
            <div class="wapper">
                <div class="img-wapper"><img :src="item.product_image"></div>
                <div class="info-wapper">
                    <div>1</div>
                    <div>2</div>
                </div>
            </div>
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
    mounted() {},
    methods: {},
    destroyed() {}
}
</script>
<style lang="less" scoped>
.item-entry {
    height: 117.5px;
    position: relative;
    .wapper {
        border-bottom: 1px solid #e2e2e2;
        position: absolute;
        right: 0;
        left: 15px;
        top: 0;
        bottom: 0;
        padding-top: 12.5px;
        .img-wapper {
            width: 90px;
            height: 90px;
            img {
                width: 90px;
                height: 90px;
            }
        }
        .info-wapper {
            position: absolute;
            left: 100px;
            right: 0;
            top: 12.5px;
            bottom: 15px;
        }
    }
}
</style>
