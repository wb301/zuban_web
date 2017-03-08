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
import fuwu from 'components/common/images/fuwu.png'
import fuwu2 from 'components/common/images/fuwu2.png'
import fabu from 'components/common/images/fabu.png'
import fabu2 from 'components/common/images/fabu2.png'
import wode from 'components/common/images/wode.png'
import wode2 from 'components/common/images/wode2.png'

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
                img: fuwu,
                img2: fuwu2,
                check: true
            }, {
                title: '发布',
                path: 'release',
                img: fabu,
                img2: fabu2,
                check: false
            }, {
                title: '我的',
                path: 'my',
                img: wode,
                img2: wode2,
                check: false
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
        z-index: 999;
    }
}
</style>
