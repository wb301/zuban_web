<template>
    <div style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
            </div>
            <div class="weui-tabbar">
                <div active-class='weui-bar__item_on' class="weui-tabbar__item" tag="a" @click="toPath(item)" v-for="(item,index) in sideList">
                    <img :src="item.img" alt="" class="weui-tabbar__icon">
                    <p class="weui-tabbar__label">{{item.title}}</p>
                </div>
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
    methods: {
        toPath(item) {

            if(item.check){
                var userInfo = NormalHelper.userInfo();
                if(userInfo.is_complete <= 0){
                    weui.alert("完善信息后可发布");
                    item.path = "my";
                }
            }

            this.$router.push({
                path: '/' + item.path
            });
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
