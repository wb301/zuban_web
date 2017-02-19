<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'app',
    components: {

    },
    data() {
        return {}
    },
    created: function() {
        GlobalModel.RootVue = this;
    },
    mounted() {

    },
    methods: {},
    destroyed() {}
}
</script>
<style lang="less">
body {
    padding: 0;
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 14px;
    color: rgb(51, 51, 51);
    overflow: hidden;
}

.font-bold {
    font-weight: bold;
}
</style>
