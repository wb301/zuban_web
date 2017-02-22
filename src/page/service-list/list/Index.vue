<template>
    <div>
        <div class="container-body">
            <div class="weui-tab">
                <div class="weui-navbar">
                    <div class="weui-navbar__item">
                        静安寺
                        <img :src="image" />
                    </div>
                    <div class="weui-navbar__item">
                        分类
                        <img :src="image" /> </div>
                    <div class="weui-navbar__item">
                        排序
                        <img :src="image" /> </div>
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>
<script>
import xiala from './image/xiala.png'
export default {
    components: {},
    data() {
        return {
            image: xiala
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
.weui-tab {
    background: #FFFFFF;
}

img {
    width: 12px;
    height: 12px;
}
</style>
