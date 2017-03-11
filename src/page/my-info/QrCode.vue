<template>
    <div>
        <div class="container-body">
            <div><span>扫描下方二维码，关注租伴网公众号</span></div>
            <img :src="qrcode" />
            <div><span>歌美（上海）企业管理有限公司</span></div>
            <div @click="customer"><span style="color: blue" >客服电话:4008817673</span></div>
        </div>
    </div>
</template>
<script>
import qrcode from './image/qrcode.jpg'
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
    methods: {
        customer() { //联系客服
            window.location.href = 'tel://4008817673';
        }
    },
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
