<template>
  <div class="message">
      <div class="card">
          <div class="card-body bt-0">
                <form class="mt-3" onsubmit="return false">                    
                    <div class="form-group"> 
                        <label for="depart" class="text-danger">学院</label>
                        <select v-model="insertInfo.depart_num" class="custom-select mt-2 form-control-lg" required id="depart">
                            <option v-for="(item,index) in deptData" :key="index" :value="item.depart_num">
                                {{item.depart_name}}
                            </option>
                        </select>              
                    </div>
                    <div class="form-group"> 
                        <label for="major" class="text-danger">专业</label>
                        <select v-model="insertInfo.major_num" class="custom-select mt-2 form-control-lg" required id="major">
                            <option v-for="(item,index) in major" :key="index" :value="item.major_num">
                                {{item.major_name}}
                            </option>
                        </select>              
                    </div>   
                     <div class="form-group has-error">
                        <label for="email" class="text-danger">电子邮箱</label>
                        <input v-model="insertInfo.email" type="email" class="form-control form-control-lg mt-2" id="email" aria-describedby="emailHelp" placeholder="请输入您的电子邮箱" required>
                    </div>
                    <div class="form-group has-error">
                        <label for="inputTel" class="control-label text-danger">电话号码</label>                      
                        <input v-model="insertInfo.phone_num" type="text" class="form-control form-control-lg mt-2" id="inputTel" placeholder="手机号码" aria-describedby="telHelp">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your telephoneNum with anyone else.</small>
                    </div>    
                    <div class="form-group">                        
                        <label class="control-label text-danger mb-2">研究方向</label><br> 
                        <div v-for="(item,index) in reserch" :key="index" class="custom-control custom-checkbox">
                            <input class="custom-control-input" :id="index+1" type="checkbox" :value="item.reserch_num" v-model="insertInfo.checkReserch">
                            <label class="custom-control-label" :for="index+1">{{item.reserch_name}}</label>
                        </div>                        
                    </div>               
                    <div class="form-group">
                        <vue-cropper ref="cropper" :width="200" :height="200"></vue-cropper>
                    </div>
                    <div class="form-group">                        
                        <label for="description" class="text-success">个人简介(可选项)</label>
                        <textarea v-model="insertInfo.description" class="form-control mt-2" id="description" rows="3"></textarea>
                    </div>      
                    <div class="text-center text-danger mb-3">
                        {{warnText}}                       
                    </div>             
                    <div class="form-group text-center">
                        <button type="submit" class="btn btn-primary" @click="insertUserInfo">完善</button>
                    </div>
                </form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "message",
    data(){
        return {
            deptData: [],
            majorData: [],
            insertInfo:{
                depart_num: "",
                major_num: "",
                email: "",
                phone_num: "",
                image: "",
                checkReserch:[],
                description: ""
            },
            reserch:[],
            warnText:""
        }
    },
    props:{
        width:{
            type: Number,
            default: 330
        },
        height:{
            type: Number,
            default: 220
        }
    },
    computed:{
        major(){
            return this.majorData.filter((item)=>{
                return item.depart_num == this.insertInfo.depart_num;
            })
        }
    },
    created(){
        this.$http.get('/members/selectAllSearch')
            .then((res)=>{
                this.reserch = res.data.msg;
            })
        this.$http.get('/department/selectAlldata')   
            .then((res)=>{
                this.deptData = res.data.msg;
            }) 
        this.$http.get('/major/selectAlldata')
            .then((res)=>{
                this.majorData = res.data.msg;
            })
        this.$http.get('/user/userInfo')
            .then((res)=>{
                const infoData = res.data.msg;
                const reserch = res.data.reserch;
                console.log(infoData)
                this.insertInfo.depart_num = infoData[0].depart_num;
                this.insertInfo.major_num = infoData[0].major_num;
                this.insertInfo.phone_num = infoData[0].phone_num;
                this.insertInfo.image = infoData[0].image;
                this.insertInfo.description = infoData[0].description;
                this.insertInfo.email = infoData[0].email;              
                this.insertInfo.checkReserch = reserch.map(item =>{
                    return item.type_num;
                });                               
            })    
    },  
    methods:{
        insertUserInfo(){
            this.warnText = "";        
            let email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
            let telephone = /^1\d{10}$/;
            if(this.insertInfo.email == "" || this.insertInfo.telephone == "" || this.insertInfo.checkReserch.length == 0 ){
                this.warnText = "邮箱、电话号码、研究方向不能为空！"
            }else{
                if(!email.test(this.insertInfo.email)){
                    this.warnText = "邮箱格式不正确！"
                }else if(!telephone.test(this.insertInfo.phone_num)){
                    this.warnText = "电话号码格式不正确！"
                }else if(!this.$refs.cropper.getHref() && this.insertInfo.image == ""){
                    this.warnText = "请上传照片！"
                }else{
                    if(this.insertInfo.image){           
                        this.$http.post('/user/completeusr',this.insertInfo)
                            .then(res=>{
                                this.$router.push('/members');
                            }).catch(err=>{
                                this.warnText = "出错了";
                            })
                    }else{
                        this.$refs.cropper.getHref().then((data)=>{                       
                            this.insertInfo.image = data;       
                            this.$http.post('/user/completeusr',this.insertInfo)
                                .then(res=>{
                                    this.$router.push('/members');
                                }).catch(err=>{
                                    this.warnText = "出错了";
                                })
                        })
                    }
                }
            }            
          
        }
    },   
    components:{
        vueCropper:(resolve)=>{
            require(['./imgCroppper'],resolve)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

