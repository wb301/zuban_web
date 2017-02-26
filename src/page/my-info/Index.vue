<template>
    <div style="background: #F5F5F5;">
        <div class="weui-cells" style="margin-top:0px;height: 75px">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="setUpload">
                <div class="weui-cell__bd">
                    <label class="weui-label">头像</label>
                </div>
                <div class="weui-cell__ft">
                    <div class="image-manipulation">
                        <div v-for="(item,index) in img_list">
                            <img :src="item" style="height: 50px;width: 50px">
                            <input type="file" class="imgupload" accept="image/gif, image/jpeg, image/png" @click="setUpload ">
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <!-- 昵称 性别 -->
        <div class="content-manipulation ">
            <div class="weui-cells " style="margin-top: 8px ">
                <div class="weui-cell class_height ">
                    <div class="weui-cell__hd ">
                        <label class="weui-label ">昵称</label>
                    </div>
                    <div class="weui-cell__bd ">
                        <input class="weui-input " type="test " placeholder="未设置 " v-model="nick_name_model " />
                    </div>
                </div>
                <div class="weui-cell class_height ">
                    <div class="weui-cell__hd ">
                        <label class="weui-label ">性别</label>
                    </div>
                    <div class="weui-cell__bd ">
                        <input class="weui-input disabled-input " type="text " v-model="sex_model " @click="selectSex " />
                    </div>
                    <div><img :src="image "></div>
                </div>
            </div>
        </div>
        <div class="content-manipulation ">
            <div class="weui-cells " style="margin-top: 8px ">
                <div class="weui-cell class_height ">
                    <div class="weui-cell__hd ">
                        <label class="weui-label ">所在地</label>
                    </div>
                    <div class="weui-cell__bd ">
                        {{userInfo.region_name}}
                    </div>
                </div>
                <a class="weui-cell weui-cell_access class_height " href="javascript:; ">
                    <div class="weui-cell__hd ">
                        <label class="weui-label ">绑定手机</label>
                    </div>
                    <div class="weui-cell__bd ">
                        {{userInfo.account}}
                    </div>
                    <div class="weui-cell__ft ">
                    </div>
                </a>
                <div class="weui-cell class_height ">
                    <div class="weui-cell__hd ">
                        <label class="weui-label ">微信号</label>
                    </div>
                    <div class="weui-cell__bd ">
                        <input class="weui-input " type="test " placeholder="未设置 " v-model="wx_account_model " />
                    </div>
                </div>
                <div class="weui-cell class_height ">
                    <div class="weui-cell__hd ">
                        <label class="weui-label ">年龄</label>
                    </div>
                    <div class="weui-cell__bd ">
                        <input class="weui-input disabled-input " placeholder="未设置 " type="text " v-model="age_model " />
                    </div>
                </div>
                <div class="weui-cell class_height ">
                    <div class="weui-cell__hd ">
                        <label class="weui-label ">身高</label>
                    </div>
                    <div class="weui-cell__bd ">
                        <input class="weui-input " type="test " placeholder="未设置 " v-model="height_model " />
                    </div>
                </div>
                <div class="weui-cell class_height ">
                    <div class="weui-cell__hd ">
                        <label class="weui-label ">体重</label>
                    </div>
                    <div class="weui-cell__bd ">
                        <input class="weui-input " type="test " placeholder="未设置 " v-model="weight_model " />
                    </div>
                </div>
                <div class="weui-cell class_height ">
                    <div class="weui-cell__hd ">
                        <label class="weui-label ">学历</label>
                    </div>
                    <div class="weui-cell__bd ">
                        <input class="weui-input " type="test " placeholder="未设置 " v-model="qualifications_model " />
                    </div>
                </div>
                <div class="weui-cell class_height ">
                    <div class="weui-cell__hd ">
                        <label class="weui-label ">职业</label>
                    </div>
                    <div class="weui-cell__bd ">
                        <input class="weui-input " type="test " placeholder="未设置 " v-model="professional_model " />
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-top: 8px ">
            <a @click="updUserInfo " class="weui-btn weui-btn_primary ">修改并保存</a>
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
                    response["token "] = this.userInfo.token;
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
                "token ": this.userInfo.token,
                "sex ": this.sex
            };
            if (this.img_list) {
                param["head_img "] = this.img_list[0];
            }
            if (this.nick_name_model) {
                param["nick_name "] = this.nick_name_model;
            }
            if (this.wx_account_model) {
                param["wx_account "] = this.wx_account_model;
            }
            if (this.qualifications_model) {
                param["qualifications "] = this.qualifications_model;
            }
            if (this.professional_model) {
                param["professional "] = this.professional_model;
            }
            if (this.age_model) {
                if (!(/^[1-9]\d$/.test(this.age_model)) || this.age_model > 100) {
                    weui.alert("年龄在1~100之间 ");
                    return false;
                };
                param["age "] = this.age_model;
            }
            if (this.height_model) {
                if (!(/^[1-9]\d{2}$/.test(this.height_model)) || this.height_model > 500) {
                    weui.alert("身高在0~260之间 ");
                    return false;
                };
                param["height "] = this.height_model;
            }
            if (this.weight_model) {
                if (!(/^[1-9]\d{2}$/.test(this.weight_model)) || this.weight_model > 500) {
                    weui.alert("体重在50~500之间 ");
                    return false;
                };
                param["weight "] = this.weight_model;
            }

            var p_obj = {
                action: 'c=Zb&m=User&a=updUserInfo',
                param: param,
                success: (response) => {
                    response["token "] = this.userInfo.token;
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
.class_height {
    height: 25px
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
</style>
