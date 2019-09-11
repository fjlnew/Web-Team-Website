<template>
    <div class="login form row my-5">
        <div class="col-lg-3">

        </div>
        <div class="col-lg-6">
            <div class="form-group my-4">
                <label class="mb-2 font-weight-bold text-info">学号</label>
                <input type="text" v-model="loginInfo.studentNum" class="form-control form-control-lg" placeholder="请输入学号">
            </div>
            <div class="form-group my-4">
                <label class="mb-2 font-weight-bold text-info">密码</label>
                <input type="password" v-model="loginInfo.password" class="form-control form-control-lg" placeholder="请输入密码">
            </div>            
            <div class="form-group mt-5">                            
                <input type="text" class="form-control form-control-lg" v-model="verify" :placeholder="hideText">
            </div>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="remeber" v-model="checked">
                <label class="custom-control-label" for="remeber">记住密码？</label>
                <router-link to="/reset" class="text-primary">重置密码</router-link>
            </div>
            <div class="text-center text-danger">
                {{warnText}}                       
            </div>
            <div class="form-group my-5">                            
                <input type="submit" class="form-control btn btn-lg btn-primary" value="登录" @click="_login">
            </div>
        </div>
        <div class="col-lg-3 ">

        </div>
    </div> 
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'login',
    data(){
        return {
            hideText:"",
            warnText:"",  
            result: "", 
            verify:"",
            checked: false,
            loginInfo:{
                studentNum: "",
                password: ""
            }
        }
    },
    computed:mapGetters(['loginText']),
    watch:{
        loginText(){
            if(this.loginText.have){
                if(!this.loginText.is_active){
                    this.warnText = "该账号未被激活！"
                }else{
                    if(!this.loginText.verify){
                        this.warnText = "密码不正确！"
                    }else{        
                        if(this.checked){
                            this.setCookie(this.compileStr(this.loginInfo.studentNum),this.compileStr(this.loginInfo.password),7);  
                        }      
                        sessionStorage.setItem('studentNum',this.loginText.studentNum)
                        this.$store.state.token = this.loginText.token; 
                        this.$router.replace('/self')                       
                    }
                }
            }else{
                this.warnText = "此账号不存在"
            }
        }
    },
    mounted(){
        this._numRandom();
        this.getCookie();        
    },
    methods:{
        _numRandom(){
            const num1 = Math.floor(Math.random()*100);
            const num2 = Math.floor(Math.random()*100);
            const result = num1 + num2;            
            this.verify = "";
            this.hideText = `${num1} + ${num2} = ?`           
            this.result = result.toString();
        },
        _login(){          
            if(this.loginInfo.studentNum == "" || this.loginInfo.password == ""){
                this.warnText = "账号密码不能为空！"
            }else{
                if(!/^\d{12}$/.test(this.loginInfo.studentNum)){
                    this.warnText = "用户账号不符合规范！";
                }else if(this.verify == ""){
                    this.warnText = "验证码不能为空！";
                }else if(this.result !== this.verify){                    
                    this.warnText = "傻蛋 你算错了！"                      
                    this._numRandom();                 
                }else{           
                    this.warnText = "";
                    this._numRandom();                                    
                    this.$store.dispatch("login",this.loginInfo);
                }
            }            
        },
        setCookie(c_name,c_pwd,exdays) {
            var exdate=new Date();//获取时间           
            exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
            //字符串拼接cookie
            window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
            window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
        },
        getCookie:function () {
            if (document.cookie.length>0) {
                var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
                for(var i=0;i<arr.length;i++){
                    var arr2=arr[i].split('=');//再次切割
                    //判断查找相对应的值
                    if(arr2[0]=='userName'){
                        this.loginInfo.studentNum = this.uncompileStr(arr2[1]);//保存到保存数据的地方
                    }else if(arr2[0]=='userPwd'){
                        this.loginInfo.password = this.uncompileStr(arr2[1]);
                        this.checked = true;
                    }
                }
            }
        },
        clearCookie:function () {
            this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
        },
        compileStr(code){ //对字符串进行加密         
            var c=String.fromCharCode(code.charCodeAt(0)+code.length);  
            for(var i=1;i<code.length;i++)  
            {        
                 c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));  
            }   
            return c; 
        },
        uncompileStr(code){        
            code = unescape(code);        
            var c=String.fromCharCode(code.charCodeAt(0)-code.length);        
            for(var i=1;i<code.length;i++){        
                c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));        
            }  
            return c;
        }            
    }
}
</script>
<style lang="scss" scoped>

</style>

