<template>
    <div>
        <div class="container-body">
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            next: 'list',
            userInfo: JSON.parse(this.$route.params.user)
        }
    },
    mounted() {
        this.next = this.$route.params.next
        //如果account存在 则 获取用户信息并提供经纬度  跳转 找服务列表
        if(this.userInfo.account && this.userInfo.account.length > 0 && this.userInfo.token){
            var that = this;
            NormalHelper.getPostion(function(pos) {
                that.getUserInfo(pos);
            });
        }else{
            this.bangdingIphone();
        }
    },
    methods: {
        getUserInfo(pos) {
            var param = {
                token: this.userInfo.token,
                logitude: pos.logitude,
                latitude: pos.latitude
            };
            var p_obj = {
                action: 'c=Zb&m=User&a=getUserInfo',
                param: param,
                success: (response) => {
                    response["token"] = this.userInfo.token;
                    NormalHelper.setUserInfo(response);
                    this.userInfo = response;
                    this.$router.push({
                        path: '/'+this.next
                    });
                },
                fail: (response) => {
                    weui.alert(response.msg)
                }
            };
            AjaxHelper.PostRequest(p_obj);
        },
        bangdingIphone() {
            NormalHelper.Set("wx_middle_open_id", this.userInfo.openid);
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
}
</style>
