<template>
    <div>
        <div class="container-body">
            <div class="weui-tab">
                <div class="weui-navbar">
                    <div class="weui-navbar__item">
                        静安寺
                        <img :src="image" />
                    </div>
                    <div class="weui-navbar__item">
                        分类
                        <img :src="image" /> 
                    </div>
                    <div class="weui-navbar__item" @click="sort">
                        排序
                        <img :src="image" /> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import xiala from './image/xiala.png'
export default {
    components: {},
    data() {
        return {
            image: xiala,
            area: '',
            areaList: []
        }
    },
    mounted() {

    },
    methods: {
        sort(){
            var arr = [{label:"最近时间",value:'mr'},{label:"价格低到高",value:'jg_0'},{label:"价格从低到高",value:'jg_0'},{label:"价格从高到低",value:'jg_1'},{label:"距离从近到远",value:'jl_0'},{label:"距离从远到近",value:'jl_1'},{label:"智能综合",value:'zh'}];
            weui.picker(arr, {
                className: 'custom-classname',
                onConfirm: function(result) {
                   console.log(result);
                },
                id: 'sortPicker'
            });
        }

    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
    .weui-tab{
        background: #FFFFFF;
    }
    img{
        width: 12px;
        height: 12px;
    }
</style>
