<template>
    <div>
        <div class="container-body">
            <div class="release-wapper">
                <div class="image-manipulation">
                    <div v-for="(item,index) in img_list">
                        <img :src="item.img_url">
                        <img class="quxiao" :src="quxiaoimg" @click="deleteImg(index)" v-if="item.type!='add'">
                        <input type="file" class="imgupload" accept="image/gif, image/jpeg, image/png" v-if="item.type=='add'" @click="setUpload">
                    </div>
                </div>
                <div class="segmentation"></div>
                <div class="content-manipulation">
                    <div class="weui-cells">
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">服务内容</label>
                            </div>
                            <div class="weui-cell__bd">
                                <input class="weui-input" type="test" placeholder="比如陪吃饭、陪看电影" />
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">价格</label>
                            </div>
                            <div class="weui-cell__bd">
                                <input class="weui-input" type="test" placeholder="请输入服务价格/元" />
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">价格单位</label>
                            </div>
                            <div class="weui-cell__bd">
                                <input class="weui-input disabled-input" type="text" v-model="danweiName" @click="selectUnitPrice" />
                            </div>
                            <div><img :src="image"></div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">服务地区</label>
                            </div>
                            <div class="weui-cell__bd">
                                <input class="weui-input disabled-input" v-model="region" type="text" @click="selectRegion" />
                            </div>
                            <div><img :src="image"></div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">服务类型</label>
                            </div>
                            <div class="weui-cell__bd">
                                <input class="weui-input disabled-input" v-model="categor" type="text" @click="selectCategory" />
                            </div>
                            <div><img :src="image"></div>
                        </div>
                    </div>
                    <div class="agreement">
                        <div class="agreed">
                            同意
                            <router-link :to="{path: '/registered'}">《租伴网服务者入住协议》
                            </router-link>
                        </div>
                        <div class="instructions">说明：交易成功，平台收取交易额10%的手续费</div>
                    </div>
                </div>
            </div>
            <div class="button-release">发布</div>
        </div>
    </div>
    </div>
</template>
<script>
import xiala from 'src/page/service-list/list/image/xiala.png'
import meinv from './image/Artboard6.jpg'
import addImg from './image/Artboard14.png'
import quxiao from './image/quxiao.png'

var unitPriceArr = [{
    label: "小时",
    value: '1'
}, {
    label: "天",
    value: '2'
}];
var imguploadNum = 0;
export default {
    components: {},
    data() {
        return {
            image: xiala,
            quxiaoimg: quxiao,
            danweiValue: '',
            danweiName: '',
            region: '',
            regionList: [],
            region_code: 0,
            categor: '',
            categoryList: [],
            categor_id: 0,
            img_list: [{
                img_url: addImg,
                type: 'add'
            }]
        }
    },
    mounted() {
        $(".disabled-input").focus(function() {
            document.activeElement.blur();
        });
        this.getCategoryList();
        this.getRegionList();
        this.$nextTick(function() {
            console.log($("body").width());
        });
    },
    watch: {},
    methods: {
        selectUnitPrice() {
            var _self = this;
            weui.picker(unitPriceArr, {
                defaultValue: ['1'],
                className: 'custom-classname',
                onConfirm: function(result) {
                    _self.danweiValue = result[0].value;
                    _self.danweiName = result[0].label;
                },
                id: 'unitPricePicker'
            });
        },
        getRegionList() {
            var param = {
                c: 'Zb',
                m: 'Region',
                a: 'getRegionList',
                mapping: {
                    name: 'label',
                    code: 'value'
                }
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.regionList = response;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        selectRegion() {
            var _self = this;
            weui.picker(this.regionList, {
                defaultValue: [2],
                className: 'custom-classname',
                onConfirm: function(result) {
                    _self.region_code = result[2].value;
                    _self.region = result[0].label + " " + result[1].label + " " + result[2].label;
                },
                id: 'regionPicker'
            });
        },
        getCategoryList() {
            var param = {
                c: 'Zb',
                m: 'Category',
                a: 'getCategoryList',
                mapping: {
                    category_name: 'label',
                    id: 'value'
                }
            };
            var p_obj = {
                action: '',
                param: param,
                success: (response) => {
                    this.categoryList = response;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.GetRequest(p_obj);
        },
        selectCategory() {
            var _self = this;
            weui.picker(this.categoryList, {
                defaultValue: [2],
                className: 'custom-classname',
                onConfirm: function(result) {
                    _self.categor_id = result[2].value;
                    _self.categor = result[0].label + " " + result[1].label;
                },
                id: 'categoryPicker'
            });
        },
        deleteImg(p_index) {
            this.img_list.splice(p_index, 1);
            var bool = true;
            for (var i = 0; i < this.img_list.length; i++) {
                this.img_list[i].type == "add" ? bool = false : '';
            }
            if (bool) {
                this.img_list.push({
                    img_url: addImg,
                    type: 'add'
                });
            }
        },
        setUpload() {
            var _self = this;
            $(".imgupload").off('change');
            NormalHelper.uploadBase64($(".imgupload"), function(img) {
                _self.img_list.splice(_self.img_list.length - 1, 0, {
                    img_url: img,
                    type: 'edit'
                });
                if (_self.img_list.length == 7) {
                    _self.img_list.splice(_self.img_list.length - 1, 1);
                }
                $(".imgupload").val('');
            });
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.container-body {
    a:link,
    a:visited {
        font-size: 14px;
        color: #4990E2;
    }
    .release-wapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        .image-manipulation {
            padding: 15px 15px 8px 15px;
            >div {
                display: inline-block;
                margin-left: 7.5px;
                position: relative;
                width: 110px;
                height: 110px;
                .imgupload {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    z-index: 501;
                }
                img:not(.quxiao) {
                    width: 100%;
                    height: 100%;
                }
                .quxiao {
                    position: absolute;
                    top: 5.55px;
                    right: 5.55px;
                    height: 16.95px;
                    width: 16.95px;
                }
            }
            >div:nth-child(1),
            >div:nth-child(4) {
                margin-left: 0px;
            }
            @media only screen and (min-width:320px) {
                >div {
                    width: 91.5px;
                    height: 91.5px;
                }
            }
            @media only screen and (min-width:414px) {
                >div {
                    width: 122.5px;
                    height: 122.5px;
                }
            }
        }
        .segmentation {
            height: 8px;
            background: #F5F5F5;
        }
        .content-manipulation {
            .weui-cell>div {
                img {
                    width: 12px;
                    height: 12px;
                }
            }
            .agreement {
                height: 79px;
                margin-left: 15px;
                .agreed {
                    font-size: 13px;
                    height: 39.5px;
                    display: table-cell;
                    vertical-align: bottom;
                }
                .instructions {
                    font-size: 11px;
                    color: #E35257;
                    height: 50%;
                }
            }
        }
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
