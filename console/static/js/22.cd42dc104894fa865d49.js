webpackJsonp([22,26],{76:function(e,t,a){(function(e,a,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={components:{},data:function(){return{mobile_readonly:!1,mobile:"",password:"",code:"",codeBtn:{prompt:"获取验证码",disabled:""},mobileCode:"",next:"list",pos:e.getPostion(),openid:e.getOpenId()}},mounted:function(){this.next=this.$route.params.next,"my"==this.next&&e.userInfo().account&&(this.mobile=e.userInfo().account,this.mobile_readonly=!0)},methods:{getCode:function(){var e=this;if(""==this.codeBtn.disabled){var t={mobile:this.mobile,from:2};if(!/^1(3|4|5|7|8)\d{9}$/.test(t.mobile))return a.alert("手机号码有误，请重填"),!1;var o={action:"c=Zb&m=User&a=sendMobileCode",param:t,success:function(t){e.codeBtn={prompt:"重新发送(60)",disabled:"a_default"};var a=e,i=60,o=setInterval(function(){i--,a.codeBtn.prompt="重新发送("+i+")",1===i&&(clearInterval(o),a.codeBtn={prompt:"重新发送",disabled:""})},1e3)},fail:function(e){a.alert(e.msg)}};i.PostRequest(o)}},registered:function(){var e=this,t={account:this.mobile,password:this.password,code:this.code},o=/^(\w){6,20}$/;if(!o.exec(this.password))return void a.alert("密码格式错误！");var n={action:"c=Zb&m=User&a=changePassword",param:t,success:function(t){alert("新密码已设置成功！"),e.login()},fail:function(e){a.alert(e.msg)}};i.PostRequest(n)},login:function(){var t=this,o={account:this.mobile,password:this.password,latitude:this.pos.latitude,logitude:this.pos.logitude};""!=this.openid&&(o.openId=this.openid);var n=this,s={action:"c=Zb&m=Login&a=login",param:o,success:function(a){e.setUserInfo(a),t.$router.push({path:"/"+n.next})},fail:function(e){a.alert(e.msg)}};i.PostRequest(s)}},destroyed:function(){}}}).call(t,a(8),a(4),a(7))},178:function(e,t,a){t=e.exports=a(1)(),t.push([e.id,".container-body[data-v-cfb7b338]{margin-top:20px}.container-body .weui-cell__ft a[data-v-cfb7b338]:link,.container-body .weui-cell__ft a[data-v-cfb7b338]:visited{font-size:16px;color:#4990e2}.container-body .a_default[data-v-cfb7b338]{color:#e2e2e2}.container-body .weui-btn[data-v-cfb7b338],.container-body .weui-flex[data-v-cfb7b338]{margin:0 15px}.container-body .weui-btn[data-v-cfb7b338]{height:45px;background:#a877e6;box-shadow:0 4px 9px 0 rgba(178,125,227,.8);border-radius:4px}.container-body .flex-item[data-v-cfb7b338]{font-size:14px;color:#4990e2}.container-body .weui-agree__checkbox[data-v-cfb7b338]{width:16px;height:16px}.container-body .weui-agree[data-v-cfb7b338],.container-body .weui-agree a[data-v-cfb7b338]:link,.container-body .weui-agree a[data-v-cfb7b338]:visited{font-size:14px;color:#4990e2}.container-body .weui-agree>.weui-agree__item[data-v-cfb7b338]:first-child{text-align:left;float:left}.container-body .weui-agree>.weui-agree__item[data-v-cfb7b338]:nth-child(2){text-align:right}","",{version:3,sources:["/./src/page/account/password/Index.vue"],names:[],mappings:"AACA,iCAAiC,eAAe,CAC/C,AACD,iHAAiH,eAAe,aAAa,CAC5I,AACD,4CAA4C,aAAa,CACxD,AACD,uFAAuF,aAAa,CACnG,AACD,2CAA2C,YAAY,mBAAmB,4CAA6C,iBAAiB,CACvI,AACD,4CAA4C,eAAe,aAAa,CACvE,AACD,uDAAuD,WAAW,WAAW,CAC5E,AAGD,wJAA2G,eAAe,aAAa,CACtI,AACD,2EAA4E,gBAAgB,UAAU,CACrG,AACD,4EAA4E,gBAAgB,CAC3F",file:"Index.vue",sourcesContent:["\n.container-body[data-v-cfb7b338]{margin-top:20px\n}\n.container-body .weui-cell__ft a[data-v-cfb7b338]:link,.container-body .weui-cell__ft a[data-v-cfb7b338]:visited{font-size:16px;color:#4990E2\n}\n.container-body .a_default[data-v-cfb7b338]{color:#e2e2e2\n}\n.container-body .weui-flex[data-v-cfb7b338],.container-body .weui-btn[data-v-cfb7b338]{margin:0 15px\n}\n.container-body .weui-btn[data-v-cfb7b338]{height:45px;background:#A877E6;box-shadow:0 4px 9px 0 rgba(178,125,227,0.8);border-radius:4px\n}\n.container-body .flex-item[data-v-cfb7b338]{font-size:14px;color:#4990E2\n}\n.container-body .weui-agree__checkbox[data-v-cfb7b338]{width:16px;height:16px\n}\n.container-body .weui-agree[data-v-cfb7b338]{font-size:14px;color:#4990E2\n}\n.container-body .weui-agree a[data-v-cfb7b338]:link,.container-body .weui-agree a[data-v-cfb7b338]:visited{font-size:14px;color:#4990E2\n}\n.container-body .weui-agree>.weui-agree__item[data-v-cfb7b338]:nth-child(1){text-align:left;float:left\n}\n.container-body .weui-agree>.weui-agree__item[data-v-cfb7b338]:nth-child(2){text-align:right\n}"],sourceRoot:"webpack://"}])},212:function(e,t,a){var i=a(178);"string"==typeof i&&(i=[[e.id,i,""]]);a(2)(i,{});i.locals&&(e.exports=i.locals)},250:function(e,t,a){var i,o;a(212),i=a(76);var n=a(306);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=n.render,o.staticRenderFns=n.staticRenderFns,o._scopeId="data-v-cfb7b338",e.exports=i},306:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"container-body"},[a("div",[a("div",{staticClass:"weui-cell"},[a("div",{staticClass:"weui-cell__bd"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"}],staticClass:"weui-input",attrs:{readonly:e.mobile_readonly,type:"text",placeholder:"请输入您的手机号"},domProps:{value:e._s(e.mobile)},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}})])]),e._v(" "),a("div",{staticClass:"weui-cell"},[a("div",{staticClass:"weui-cell__bd"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"weui-input",attrs:{type:"password",placeholder:"设置6-20位由字母、数字、下划线组成的密码"},domProps:{value:e._s(e.password)},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})])]),e._v(" "),a("div",{staticClass:"weui-cell weui-cell_vcode"},[a("div",{staticClass:"weui-cell__bd"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],staticClass:"weui-input",attrs:{type:"text",maxlength:"6",placeholder:"输入验证码"},domProps:{value:e._s(e.code)},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"weui-cell__ft"},[a("a",{staticClass:"weui-vcode-btn",class:e.codeBtn.disabled,attrs:{href:"javascript:void(0);"},on:{click:e.getCode}},[e._v(e._s(e.codeBtn.prompt))])])]),e._v(" "),a("div",{staticClass:"weui-cell"}),e._v(" "),a("a",{staticClass:"weui-btn weui-btn_primary",attrs:{href:"javascript:;"},on:{click:e.registered}},[e._v("提交")]),e._v(" "),"list"==this.next?a("div",{staticClass:"weui-agree",attrs:{for:"weuiAgree"}},[a("div",{staticClass:"weui-agree__item"}),e._v(" "),a("div",{staticClass:"weui-agree__item"},[a("router-link",{attrs:{to:{path:"/login"}}},[e._v("已有帐号,去登录")])],1)]):e._e()])])])},staticRenderFns:[]}}});
//# sourceMappingURL=22.cd42dc104894fa865d49.js.map