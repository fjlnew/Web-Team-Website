<template>    
    <div class="login form row my-5">   
        <div class="col-lg-3">

        </div>
        <div class="col-lg-6">
                <div class="form-group my-5">
                    <label class="mb-2 font-weight-bold text-info">学号</label>
                    <input type="text" class="form-control form-control-lg" v-model="registInfo.studentNum" placeholder="请输入学号">
                </div>
                <div class="form-group my-5">
                    <label class="mb-2 font-weight-bold text-info">姓名</label>
                    <input type="text" class="form-control form-control-lg" v-model="registInfo.username" placeholder="请输入姓名">
                </div>
                <div class="form-group my-5">
                    <label class="mb-2 font-weight-bold text-info">密码</label>
                    <input type="password" class="form-control form-control-lg" v-model="registInfo.password" placeholder="请输入密码">
                </div>
                <div class="form-group my-5">
                    <label class="mb-2 font-weight-bold text-info">确定密码</label>
                    <input type="password" class="form-control form-control-lg" v-model="registInfo.repPassword" placeholder="请确定密码">
                </div>
                <div class="form-group my-5">                            
                    <input type="text" class="form-control form-control-lg" v-model="verify" :placeholder="hideText">
                </div>
                <div class="text-center text-danger">
                    {{warnText}}                       
                </div>
                <div class="form-group my-5">                            
                    <input type="submit" class="form-control btn btn-lg btn-primary" value="注册" @click="_regist">
                </div>
        </div>
        <div class="col-lg-3">

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
            registInfo:{
                studentNum:"",
                username: "",
                password: "",
                repPassword: ""              
            }  
        }
    },
    computed:mapGetters(['registText']),  
    watch:{
        registText(){
            if(this.registText.status == 200){
                alert("注册成功！请联系管理员进行审核");
                this.$router.push({
                    path: '/index'
                })
            }else{
                this.warnText = "该用户名已存在！"
            }
        }
    },
    mounted(){
        this._numRandom()
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
        _regist(){
            if(this.registInfo.studentNum == "" || this.registInfo.username == "" || this.registInfo.password == ""){
                this.warnText = "所填信息不能为空！";
            }else{
                if(!/^\d{12}$/.test(this.registInfo.studentNum)){
                    this.warnText = "用户账号不符合规范！";
                }else if(this.registInfo.password !== this.registInfo.repPassword){
                    this.warnText = "两次密码不一致！"
                }else if(this.verify == ""){
                    this.warnText = "验证码不能为空！"
                }else if(this.result !== this.verify){                    
                    this.warnText = "傻蛋 你算错了！"                      
                    this._numRandom();                 
                }else{             
                    this.warnText = "";
                    this._numRandom();
                    this.$store.dispatch("regist",this.registInfo);
                }
            }
        }  
    }
}
</script>
<style lang="scss" scoped>

</style>

