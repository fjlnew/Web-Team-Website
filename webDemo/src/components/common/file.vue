<template>
    <div class="file">
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-share" role="tab" aria-controls="nav-share" aria-selected="true">文件上传</a>
                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-achievement" role="tab" aria-controls="nav-achievement" aria-selected="false">成果上传</a>
            </div>
        </nav>
         <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-share" role="tabpanel" aria-labelledby="nav-share">  
                 <form class="card-body" onsubmit="return false">               
                    <div class="form-group"> 
                        <label for="title" class="text-danger">文件标题</label>               
                        <input v-model="fileInfo.title" type="text" class="form-control mt-2" id="title" placeholder="请输入文章标题" required>            
                    </div>
                    <div class="form-group">                        
                        <label for="description" class="text-danger">文件描述</label>
                        <textarea v-model="fileInfo.description" class="form-control mt-2" id="description" rows="3" required></textarea>
                    </div>  
                    <div class="form-group"> 
                        <label for="href" class="text-success">文件链接(可选项)</label>               
                        <input v-model="fileInfo.href"  type="text" class="form-control mt-2" id="href" placeholder="请输入链接">            
                    </div>  
                    <div class="form-group">
                        <label class="text-danger">附件</label>
                        <input type="file" @change="getFile($event)" class="form-control-file form-control-lg mt-2">
                    </div>   
                    <div class="text-center text-danger my-3">
                        {{fileWarn}}                       
                    </div> 
                    <div class="form-group text-center mt-3">
                        <button @click="insertFile" type="submit" class="btn btn-primary py-2 px-4">上传</button>
                    </div>          
                </form> 
            </div>
            <div class="tab-pane fade" id="nav-achievement" role="tabpanel" aria-labelledby="nav-achievement">
                <form class="card-body" onsubmit="return false">              
                    <div class="form-group">                        
                        <label for="description" class="text-danger">成果描述</label>
                        <textarea v-model="achievementInfo.description" class="form-control mt-2" id="description" rows="3" required></textarea>
                    </div>  
                    <div class="form-group my-4">
                        <label for="achievement" class="text-danger">成果类型</label>
                        <select  v-model="achievementInfo.achievement_num" id="achievement" class="custom-select form-control mt-2" required>                        
                            <option v-for="(item,index) in achievementTag" :key="index" :value="item.achievement_num">
                                {{item.name}}
                            </option>                        
                        </select>
                    </div>
                    <div class="form-group"> 
                        <label class="text-success">成果链接(可选项)</label>               
                        <input v-model="achievementInfo.href" type="text" class="form-control mt-2" id="phone" placeholder="请输入成果链接">            
                    </div>  
                    <div class="form-group">
                        <vue-cropper ref="cropper" :width="220" :height="220"></vue-cropper>
                    </div>    
                    <div class="text-center text-danger my-3">
                        {{warnText}}                       
                    </div>  
                    <div class="form-group text-center mt-3">
                        <button @click="insertAchievement" type="submit" class="btn btn-primary py-2 px-4">上传</button>
                    </div>         
                </form>
            </div>           
         </div>
    </div> 
</template>

<script>
export default {
    name: "file",    
    data(){
        return {
            warnText: "",
            fileWarn: "",
            achievementTag: [],
            achievementInfo:{
                description: "",
                achievement_num: "",
                href: "",
                img: ""
            },
            fileInfo:{
                file: "",
                title: "",
                description: "",
                href: "",
                file_href: ""
            }
        }
    },
    components:{
        vueCropper:(resolve)=>{
            require(['./imgCroppper'],resolve)
        }
    },
    mounted(){
        this.$http.get('/achievement/selectAllTag')
            .then((res)=>{
                this.achievementTag = res.data.msg;
            })
    },
    methods: {
        insertAchievement(){
            if(this.insertAchievement.description == ""){
                this.warnText = "成果描述不能为空！"
            }else if(this.insertAchievement.achievement_num == ""){
                this.warnText = "成果类型不能为空！"
            }else{
                if(this.$refs.cropper.getHref()){
                    this.$refs.cropper.getHref().then((data)=>{
                        this.achievementInfo.img = data;                        
                        this.$http.post('/achievement/insertAchievement',this.achievementInfo)
                            .then((res)=>{
                                this.$router.push('/achievement');
                            }).catch(err=>{
                                this.warnText = "出错啦！"
                            })
                    })              
                }else{
                    this.warnText = "图片不能为空！"
                }
            }
        },
        insertFile(){            
            if(this.fileInfo.title == ""){
                this.fileWarn = "文件标题不能为空！"
            }else if(this.fileInfo.description == ""){
                this.fileWarn = "文件描述不能为空！"
            }else if(this.fileInfo.file == ''){
                this.fileWarn = "文件不能为空！"
            }else{
                let formData = new FormData();            
                formData.append('file', this.fileInfo.file);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                this.$http({
                    url: '/file/dealPic',
                    method: 'post',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((res)=>{
                    this.fileInfo.file_href = res.data.data;
                    this.$http.post('/file/insertFile',{
                        "title": this.fileInfo.title,
                        "href": this.fileInfo.href,
                        "file_href": this.fileInfo.file_href,
                        "description": this.fileInfo.description
                    }).then((res)=>{
                        this.$router.push('/self/share');
                    })
                }).catch(err=>{
                    this.fileWarn = "文件上传失败！"
                })
            }   
        },
        getFile(e){
            this.fileInfo.file = e.target.files[0];            
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

