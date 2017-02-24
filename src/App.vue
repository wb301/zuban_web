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
}

a:link,
a:visited {
    font-size: 14px;
    color: #4990E2;
}
</style>
