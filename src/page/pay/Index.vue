<template>
    <div>
        <div class="container-body">
            <div>
                <span>暂不支持浏览器付款</span>
                <span>扫描下方二维码，关注租伴网公众号</span>
            </div>
            <img :src="qrcode" />
        </div>
    </div>
</template>
<script>
import qrcode from '../my-info/image/qrcode.jpg'
export default {
    components: {

    },
    data() {
        return {
            qrcode: qrcode
        }
    },
    mounted() {

    },
    methods: {},
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    width: 100%;
    text-align: center;
    position: fixed;
    top: 200px;
    bottom: 300px;
    span {
        font-size: 14px;
        color: #333;
    }
    img {
        margin-top: 20px;
        width: 150px;
        height: 150px;
    }
}
</style>
