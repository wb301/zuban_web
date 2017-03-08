<template>
    <div style="height: 100%;">
        <div class="weui-tab">
            <div class="weui-tab__panel">
            </div>
            <div class="weui-tabbar">
                <div class="weui-tabbar__item" :class="item.check?'weui-bar__item_on':''" v-for="(item,index) in sideList" @click="toPath(item)">
                    <img :src="item.img2" alt="" class="weui-tabbar__icon" v-if="item.check">
                    <img :src="item.img" alt="" class="weui-tabbar__icon" v-else>
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
    created: function() {},
    mounted() {},
    methods: {
        toPath(item) {
            for (var i = 0; i < this.sideList.length; i++) {
                this.sideList[i].check = false;
            }
            item.check = true;
            this.$router.push({
                path: '/' + item.path
            });

        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.weui-bar__item_on .weui-tabbar__label {
    color: #8760BA;
}
</style>
