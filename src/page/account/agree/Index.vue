<template>
    <div>
        <div class="container-body">
            <div>
               <img :src="this.agreeImg">
            </div>
            <div class="button-release" @click="agree">同意</div>
        </div>
    </div>
</template>
<script>
import agreeImg from './image/agree.jpeg'
export default {
    components: {},
    data() {
        return {
            agreeImg:agreeImg
        }
    },
    mounted() {
    },
    methods: {
        agree() {
            this.$router.push({
                path: '/registered'
            });
        }
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
    .button-release {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background-color: #A877E6;
        line-height: 50px;
        text-align: center;
        color: #FFFFFF;
    }
}
</style>
