<template>
    <div>
        <div style="background: #F5F5F5;">
            <div class="weui-cells" style="margin-top:0px;height: 75px">
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="setUpload">
                    <div class="weui-cell__bd">
                        <label class="weui-label class_font_size_hd">头像</label>
                    </div>
                    <div class="weui-cell__ft">
                        <div class="image-manipulation">
                            <div v-for="(item,index) in img_list">
                                <div class="user-portrait">
                                    <img :src="item" style="height: 50px;width: 50px">
                                </div>
                                <input type="file" class="imgupload" accept="image/gif, image/jpeg, image/png" @click="setUpload ">
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <!-- 昵称 性别 -->
            <div class="content-manipulation ">
                <div class="weui-cells " style="margin-top: 8px ">
                    <div class="weui-cell">
                        <div class="weui-cell__hd ">
                            <label class="weui-label class_font_size_hd">昵称</label>
                        </div>
                        <div class="weui-cell__bd ">
                            <input class="weui-input class_font_size_bd" type="test " placeholder="未设置" v-model="nick_name_model " />
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd ">
                            <label class="weui-label class_font_size_hd">性别</label>
                        </div>
                        <div class="weui-cell__bd ">
                            <input class="weui-input disabled-input class_font_size_bd" type="text " v-model="sex_model " @click="selectSex " />
                        </div>
                        <div><img :src="image "></div>
                    </div>
                </div>
            </div>
            <div class="content-manipulation ">
                <div class="weui-cells " style="margin-top: 8px ">
                    <div class="weui-cell">
                        <div class="weui-cell__hd ">
                            <label class="weui-label class_font_size_hd">所在地</label>
                        </div>
                        <div class="weui-cell__bd ">
                            <label class="weui-label class_font_size_bd">{{userInfo.region_name}}</label>
                        </div>
                    </div>
                    <a class="weui-cell weui-cell_access" href="javascript:; ">
                        <div class="weui-cell__hd">
                            <label class="weui-label class_font_size_hd">绑定手机</label>
                        </div>
                        <div class="weui-cell__bd ">
                            <label class="weui-label class_font_size_bd">{{userInfo.account}}</label>
                        </div>
                        <div class="weui-cell__ft ">
                        </div>
                    </a>
                    <div class="weui-cell">
                        <div class="weui-cell__hd ">
                            <label class="weui-label class_font_size_hd">微信号</label>
                        </div>
                        <div class="weui-cell__bd ">
                            <input class="weui-input class_font_size_bd" type="test " placeholder="未设置" v-model="wx_account_model " />
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd ">
                            <label class="weui-label class_font_size_hd">年龄</label>
                        </div>
                        <div class="weui-cell__bd ">
                            <input class="weui-input disabled-input class_font_size_bd" placeholder="未设置" type="text " v-model="age_model " />
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd ">
                            <label class="weui-label class_font_size_hd">身高</label>
                        </div>
                        <div class="weui-cell__bd ">
                            <input class="weui-input class_font_size_bd" type="test " placeholder="未设置" v-model="height_model " />
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd ">
                            <label class="weui-label class_font_size_hd">体重</label>
                        </div>
                        <div class="weui-cell__bd ">
                            <input class="weui-input class_font_size_bd" type="test " placeholder="未设置" v-model="weight_model " />
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd ">
                            <label class="weui-label class_font_size_hd">学历</label>
                        </div>
                        <div class="weui-cell__bd ">
                            <input class="weui-input class_font_size_bd" type="test " placeholder="未设置" v-model="qualifications_model " />
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd ">
                            <label class="weui-label class_font_size_hd">职业</label>
                        </div>
                        <div class="weui-cell__bd ">
                            <input class="weui-input class_font_size_bd" type="test " placeholder="未设置" v-model="professional_model " />
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 8px">
                <div class="button-release" @click="updUserInfo">修改</div>
            </div>
        </div>
    </div>
</template>
<script>
import xiala from '../service-list/list/image/xiala.png'

var sexArr = [{
    label: "男 ",
    value: 'M'
}, {
    label: "女 ",
    value: 'W'
}];
export default {
    components: {

    },
    data() {
        return {
            image: xiala,
            nick_name_model: '',
            sex: '',
            sex_model: '',
            wx_account_model: '',
            qualifications_model: '',
            professional_model: '',
            age_model: '',
            height_model: '',
            weight_model: '',
            userInfo: NormalHelper.userInfo(),
            img_list: []
        }
    },
    mounted() {
        this.getUserInfo()
        this.img_list = [this.userInfo.head_img]
        this.nick_name_model = this.userInfo.nick_name
        this.sex = this.userInfo.sex
        this.sex_model = this.sex == 'W' ? '女' : '男'
        this.wx_account_model = this.userInfo.wx_account
        this.qualifications_model = this.userInfo.qualifications
        this.professional_model = this.userInfo.professional
        if (this.userInfo.age > 0) {
            this.age_model = this.userInfo.age
        }
        if (this.userInfo.height > 0) {
            this.height_model = this.userInfo.height
        }
        if (this.userInfo.weight > 0) {
            this.weight_model = this.userInfo.weight
        }
    },
    methods: {
        selectSex() {
            var _self = this;
            weui.picker(sexArr, {
                defaultValue: ['1'],
                className: 'custom-classname',
                onConfirm: function(result) {
                    _self.sex = result[0].value;
                    _self.sex_model = result[0].label;
                },
                id: 'unitPricePicker'
            });
        },
        setUpload() {
            var _self = this;
            $(".imgupload ").off('change');
            NormalHelper.uploadBase64($(".imgupload "), function(img) {
                _self.img_list = [img]
                $(".imgupload ").val('');
            });
        },
        getUserInfo() {

            var param = {
                token: this.userInfo.token
            };
            var p_obj = {
                action: 'c=Zb&m=User&a=getUserInfo',
                param: param,
                success: (response) => {
                    response["token"] = this.userInfo.token;
                    NormalHelper.setUserInfo(response);
                    this.userInfo = response;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        updUserInfo() {

            var param = {
                "sex": this.sex
            };
            if (this.img_list) {
                param["head_img"] = this.img_list[0];
            }
            if (this.nick_name_model) {
                param["nick_name"] = this.nick_name_model;
            }
            if (this.wx_account_model) {
                param["wx_account"] = this.wx_account_model;
            }
            if (this.qualifications_model) {
                param["qualifications"] = this.qualifications_model;
            }
            if (this.professional_model) {
                param["professional"] = this.professional_model;
            }
            if (this.age_model) {
                this.age_model = parseInt(this.age_model);
                if (this.age_model < 18 || this.age_model > 100) {
                    weui.alert("年龄在1~100之间 ");
                    return false;
                }
                param["age"] = this.age_model;
            }
            if (this.height_model) {
                this.height_model = parseInt(this.height_model);
                if (this.height_model <= 0 || this.height_model > 260) {
                    weui.alert("身高在1cm~260cm之间 ");
                    return false;
                }
                param["height"] = this.height_model;
            }
            if (this.weight_model) {
                this.weight_model = parseInt(this.weight_model);
                if (this.weight_model < 50 || this.weight_model > 500) {
                    weui.alert("体重在0~260之间 ");
                    return false;
                }
                param["weight"] = this.weight_model;
            }

            var p_obj = {
                action: 'c=Zb&m=User&a=updUserInfo',
                param: param,
                success: (response) => {
                    weui.alert("修改成功");
                    response["token"] = this.userInfo.token;
                    JSON.stringify(response);
                    NormalHelper.setUserInfo(response);
                    this.userInfo = response;
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
.class_font_size_hd {
    font-size: 14px;
    color: #666666;
}

.class_height {
    height: 25px
}

.class_font_size_bd {
    font-size: 14px;
    color: #333333;
}

.image-manipulation {
    margin-top: 3px;
    >div {
        display: inline-block;
        margin-left: 7.5px;
        position: relative;
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

.user-portrait {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 3px 0;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
