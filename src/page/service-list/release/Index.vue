<template>
    <div>
        <div class="container-body">
            <div class="release-wapper">
                <div class="image-manipulation"></div>
                <div class="segmentation"></div>
                <div class="content-manipulation">
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">qq</label>
                            </div>
                            <div class="weui-cell__bd">
                                <input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入qq号" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    .release-wapper {
        .image-manipulation {}
        .segmentation {
            height: 8px;
            background: #F5F5F5;
        }
        .content-manipulation {}
    }
}
</style>
