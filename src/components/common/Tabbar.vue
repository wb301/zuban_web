<template>
    <div style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
            </div>
            <div class="weui-tabbar">
                <router-link active-class='weui-bar__item_on' class="weui-tabbar__item" tag="a" :to="{path: '/'+item.path}" v-for="(item,index) in sideList">
                    <img :src="item.img" alt="" class="weui-tabbar__icon">
                    <p class="weui-tabbar__label">{{item.title}}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        sideList: {
            type: Array,
            default: function() {
                return [];
            }
        }
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
</style>
