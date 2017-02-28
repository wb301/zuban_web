<template>
    <div>
        <div class="container-body">
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            redirect_url:"https://test.guleshop.com/youfan/web/console/#/wx-middle"
        }
    },
    mounted() {
        NormalHelper.wxLogin(this.redirect_url);
    },
    methods: {
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    margin-top: 20px;
    .a_default {
        color: #e2e2e2;
    }
}
</style>
