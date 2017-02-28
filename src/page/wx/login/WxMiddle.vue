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
            userInfo:this.$route.params.user
        }
    },
    mounted() {
        alert(this.userInfo);
        //如果account存在 则 获取用户信息并提供经纬度  跳转 找服务列表

        //如果account存在 则 跳转注册/登录 页面并传递open_id,注册或登录时 绑定open_id


        //todo:服务修改:  1.登录注册 兼容open_id传入 如果open_id长度>0 则 最后 user=xx(open_id,user)return 新user 合并帐号 删除open_id信息  并更新open_id到account有值的帐号信息下  2.获取用户信息兼容 pos 经纬度传入  如果存在 则刷新 user_info中的经纬度
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
