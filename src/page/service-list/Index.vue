<template>
    <div>
        <div class="page__bd">
            <router-view class="wapper"></router-view>
            <tabbar :side-list="tabbarList"></tabbar>
        </div>
    </div>
</template>
<script>
import Tabbar from 'components/common/Tabbar'
import fabu from 'components/common/images/fabu.png'
import fuwu from 'components/common/images/fuwu.png'
import wode from 'components/common/images/wode.png'

export default {
    name: 'app',
    components: {
        Tabbar
    },
    data() {
        return {
            tabbarList: [{
                title: '服务',
                path: 'list',
                img: fuwu
            }, {
                title: '发布',
                path: 'release',
                img: fabu
            }, {
                title: '我的',
                path: 'my',
                img: wode
            }]
        }
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
.page__bd {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    .wapper {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 50px;
    }
}
</style>
