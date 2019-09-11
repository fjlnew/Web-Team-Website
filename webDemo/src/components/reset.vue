<template>
  <div id="reset">
    <div class="form row my-5">
        <div class="col-lg-3">

        </div>
        <div class="col-lg-6">
            <div class="form-group my-4">
                <label class="mb-2 font-weight-bold text-info">学号</label>
                <input type="text" v-model="resetInfo.studentNum" class="form-control form-control-lg" placeholder="请输入学号">
            </div>
            <div class="form-group my-4">
                <label class="mb-2 font-weight-bold text-info">密码</label>
                <input type="password" v-model="resetInfo.oldPassword" class="form-control form-control-lg" placeholder="请输入密码">
            </div>    
            <div class="form-group my-4">
                <label class="mb-2 font-weight-bold text-info">新密码</label>
                <input type="password" v-model="resetInfo.newPassword" class="form-control form-control-lg" placeholder="请输入新密码">
            </div>         
            <div class="form-group my-4">        
                <label class="mb-2 font-weight-bold text-info">确认密码</label>                    
                <input type="password" class="form-control form-control-lg" v-model="verify" placeholder="请确认密码">
            </div>            
            <div class="text-center text-danger">
                {{warnText}}                       
            </div>
            <div class="form-group my-5">                            
                <input type="submit" @click="reset" class="form-control btn btn-lg btn-primary" value="重置">
            </div>
        </div>
        <div class="col-lg-3 ">

        </div>
    </div> 
  </div>
</template>

<script>
export default {
    name: 'reset',
    data () {
        return {
            verify:"",
            warnText:"", 
            resetInfo: {
                studentNum: "",
                oldPassword: "",
                newPassword: "",
            }
        }
    },
    methods: {
        reset () {
            if(this.resetInfo.studentNum == "" || this.resetInfo.oldPassword == "" || this.resetInfo.newPassword == "" || this.verify == ""){
                this.warnText = "所填信息不能为空";
            }else if(!/^\d{12}$/.test(this.resetInfo.studentNum)){
                this.warnText = "账号不正确！";
            }else if(this.resetInfo.newPassword !== this.verify){
                this.warnText = "两次密码不一致！";
            }else{
                this.$http.post('/user/resetPassword',this.resetInfo)
                    .then(res => {
                        if(res.status){
                            this.$router.push("/login");
                        }else{
                            this.warnText = res.msg;
                        }
                    }).catch(err => {

                    })
            }   
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
