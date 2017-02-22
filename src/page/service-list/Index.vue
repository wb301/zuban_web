<template>
    <div>
        <div class="page__bd">
            <navbar :side-list="navbarList"></navbar>
            <router-view></router-view>
            <tabbar :side-list="tabbarList"></tabbar>
        </div>
    </div>
</template>
<script>
import Tabbar from 'components/common/Tabbar'
import Navbar from 'components/common/Navbar'
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
            navbarList:[{
                title: '服务',
                path: 'list',
                img: fuwu
            }, {
                title: '发布',
                path: 'list',
                img: fabu
            }, {
                title: '我的',
                path: 'list',
                img: wode
            }],
            tabbarList: [{
                title: '服务',
                path: 'list',
                img: fuwu
            }, {
                title: '发布',
                path: 'list',
                img: fabu
            }, {
                title: '我的',
                path: 'list',
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
}
</style>
