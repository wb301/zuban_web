<template>
    <div>
        <div class="container-body">
            <div><span>扫描下方二维码，关注租伴网公众号</span></div>
            <img :src="xiala" />
        </div>
    </div>
</template>
<script>
import xiala from '../service-list/list/image/xiala.png'
export default {
    components: {

    },
    data() {
        return {}
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
