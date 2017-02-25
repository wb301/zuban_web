<template>
    <div style = "background: #F5F5F5;">

        <div class="weui-cells" style = "margin-top:0px;">
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <img :src="userInfo.head_img" style="width: 75px;height:75px;"/>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
        </div>

        <!-- 昵称 性别 -->
        <div class="content-manipulation" style = "margin-top:2.5px;">
            <div class="weui-cells">
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">昵称</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="test" placeholder="未设置" v-model="nick_name" />
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">性别</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input disabled-input" type="text" v-model="sex" @click="selectSex" />
                    </div>
                    <div><img :src="image"></div>
                </div>
            </div>
        </div>

        <div class="weui-cells" style = "margin-top:7.5px;">
            <a class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>所在地</p>
                </div>
                <div class="weui-cell__ft">
                    {{userInfo.region_name}}
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>绑定手机</p>
                </div>
                <div class="weui-cell__ft">
                    {{userInfo.account}}
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>微信号</p>
                </div>
                <div class="weui-cell__ft">
                    {{userInfo.wx_account ? userInfo.wx_account : '未设置'}}
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>年龄</p>
                </div>
                <div class="weui-cell__ft">
                    {{userInfo.age > 0 ? userInfo.age : '未设置'}}
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>身高</p>
                </div>
                <div class="weui-cell__ft">
                    {{userInfo.height > 0 ? userInfo.height : '未设置'}}
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>体重</p>
                </div>
                <div class="weui-cell__ft">
                    {{userInfo.weight > 0 ? userInfo.weight : '未设置'}}
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>学历</p>
                </div>
                <div class="weui-cell__ft">
                    {{userInfo.qualifications ? userInfo.qualifications : '未设置'}}
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>职业</p>
                </div>
                <div class="weui-cell__ft">
                    {{userInfo.professional ? userInfo.professional : '未设置'}}
                </div>
            </a>
        </div>


    </div>
</template>
<script>
import xiala from '../service-list/list/image/xiala.png'
import shouji from '../service-list/list/image/shouji.png'

var sexArr = [{
    label: "男",
    value: 'M'
}, {
    label: "女",
    value: 'W'
}];
export default {
    components: {
        
    },
    data() {
        return {
            image : xiala,
            userInfo: NormalHelper.userInfo()
        }
    },
    mounted() {
        this.getUserInfo()
        this.nick_name = this.userInfo.nick_name
        this.sex = this.userInfo.sex == 'W' ? '女' : '男'
    },
    methods: {
        selectSex() {
            var _self = this;
            weui.picker(sexArr, {
                defaultValue: ['W'],
                className: 'custom-classname',
                onConfirm: function(result) {
                    _self.danweiValue = result[0].value;
                    _self.danweiName = result[0].label;
                },
                id: 'unitPricePicker'
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
        }
    },
    destroyed() {}
}
</script>
<style lang="less" scoped>
</style>