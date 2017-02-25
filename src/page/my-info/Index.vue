<template>
    <div style = "background: #F5F5F5;">

        <div class="weui-cells" style = "margin-top:0px;">
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>头像</p>
                </div>
                <div class="weui-cell__ft">
                    <img :src="userInfo.head_img" style="width: 75px;height:75px;"/>
                </div>
            </a>
        </div>

        <div class="weui-cells" style = "margin-top:7.5px;">
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>昵称</p>
                </div>
                <div class="weui-cell__ft">
                    {{userInfo.nick_name}}
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p>性别</p>
                </div>
                <div class="weui-cell__ft">
                    {{userInfo.sex == 'W' ? '女' : '男'}}
                </div>
            </a>
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
export default {
    components: {
        
    },
    data() {
        return {
            userInfo: NormalHelper.userInfo
        }
    },
    mounted() {
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {

            var param = {
                token: this.userInfo.token
            };
            var p_obj = {
                action: 'c=Zb&m=User&a=getUserInfo',
                param: param,
                success: (response) => {
                    response["token"] = this.userInfo.token;
                    NormalHelper.userInfo = response;
                    NormalHelper.setCookie(GlobalModel.COOKIE_USER_INFO, JSON.stringify(response));
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