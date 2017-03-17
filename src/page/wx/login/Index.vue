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
            next: 'list'
        }
    },
    mounted() {
        this.next = this.$route.params.next;
        if(SaveDataHelper.getLocalStorage(GlobalModel.COOKIE_USER_INFO)){
            var userInfo = JSON.parse(SaveDataHelper.getLocalStorage(GlobalModel.COOKIE_USER_INFO));
            var that = this;
            NormalHelper.getPostion(function(pos) {
                that.getUserInfo(userInfo,pos);
            });
        }else{
            NormalHelper.setCookie(GlobalModel.COOKIE_USER_INFO, '');
            NormalHelper.wxLogin(GlobalModel.LOCAL_URL+"/console/#/wx-middle/"+this.next);
        }
    },
    methods: {
        getUserInfo(userInfo,pos){
            var param = {
                token: userInfo.token,
                logitude: pos.logitude,
                latitude: pos.latitude
            };
            var p_obj = {
                action: 'c=Zb&m=User&a=getUserInfo',
                param: param,
                success: (response) => {
                    response["token"] = userInfo.token;
                    NormalHelper.setUserInfo(response);
                    userInfo = response;
                    this.$router.replace({
                        path: '/'+this.next
                    });
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
.container-body {
    margin-top: 20px;
    .a_default {
        color: #e2e2e2;
    }
}
</style>
