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
            next: 'list'
        }
    },
    mounted() {
        this.next = this.$route.params.next;
        NormalHelper.setCookie(GlobalModel.COOKIE_USER_INFO, '');
        NormalHelper.wxLogin(GlobalModel.LOCAL_URL+"/console/#/wx-middle/"+this.next);
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
