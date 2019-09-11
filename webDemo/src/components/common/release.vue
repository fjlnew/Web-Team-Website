<template>
    <div class="release">
        <form class="form mt-4" onsubmit="return false">
            <div class="form-group my-4"> 
                <label for="title" class="text-danger">文章标题</label>               
                <input v-model="articleInfo.title" type="text" class="form-control mt-2" id="phone" placeholder="请输入文章标题" required>            
            </div>
            <div class="form-group my-4">
                <label for="type" class="text-danger">所属分类</label>
                <select id="type" v-model="articleInfo.type_num" class="custom-select form-control mt-2" required>                   
                    <option v-for="(item,index) in articleType" :key="index" :value="item.type_num">
                        {{item.type_name}}
                    </option>                    
                </select>
            </div>
            <div class="form-group my-4">
                <label for="tag" class="text-success">所属标签(可选项)</label>
                <select id="tag" v-model="articleInfo.label_num" class="custom-select form-control mt-2">                    
                    <option v-for="(item,index) in tagType" :key="index" :value="item.type">
                         {{item.name}}   
                    </option>                   
                </select>
            </div>
            <div class="form-group my-4">                        
                <label for="description" class="text-danger">文章描述</label>
                <textarea v-model="articleInfo.description" class="form-control mt-2" id="description" rows="3" required></textarea>
            </div> 
            <div class="form-group my-4">               
                <vue-cropper ref="cropper" :width="200" :height="200"></vue-cropper>         
            </div>
            <div>
                <mavon-editor :ishljs="true" ref=md @imgAdd="$imgAdd" v-model="articleInfo.body"></mavon-editor>
            </div>        
            <div class="text-center text-danger my-3">
                {{warnText}}                       
            </div>  
            <div class="form-group text-center mt-4">
                <div v-if="! $store.state.articleModifyStatus">
                    <button type="submit" class="btn btn-primary px-5 py-2" @click="insertArticle">发布</button>
                </div>
                <div v-else>
                    <button type="submit" class="btn btn-success px-5 py-2" @click="cancel">取消</button>
                    <button type="submit" class="btn btn-danger px-5 py-2" @click="updateArticle">修改</button>
                </div>                      
            </div>        
        </form>        
    </div> 
</template>

<script>
import {mapGetters} from 'vuex'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
export default {
    name:'release',
    data(){
        return {          
            articleType: [],
            tagType: [],  
            id: '',
            warnText: "",
            articleInfo:{
                title: '',
                body: '',
                img: '',               
                type_num: null,
                label_num: null,
                description: ''
            }                       
        }
    },  
    created(){
        this.$http.get('/article/selectAllType')
            .then((res)=>{
                this.articleType = res.data.msg
            })
        this.$http.get('/tag/sellectAllTag')
            .then((res)=>{
                this.tagType = res.data.msg;
            })          
    },   
    mounted(){
        if(this.$store.state.articleModifyStatus){
            var articleDetail = this.getDetail;
            this.articleInfo = articleDetail[0];
            this.id = articleDetail[0].id;
        }
    },  
    computed: mapGetters(['getModifyStatus','getDetail']),     
    methods:{       
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           this.$http({
               url: '/file/dealPic',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((res) => {
               // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
               /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */            
               this.$refs.md.$img2Url(pos, res.data.data);
           })
        },
        insertArticle(){
            if(this.articleInfo.title == ""){
                this.warnText = "标题不能为空！"
            }else if(this.articleInfo.type_num == ""){
                this.warnText = "文章类型不能为空！"
            }else if(this.articleInfo.description == ""){
                this.warnText = "文章描述不能为空！"
            }else if(this.articleInfo.body == ""){
                this.warnText = "文章内容不能为空"
            }else{
                if(this.$refs.cropper.getHref()){
                    this.$refs.cropper.getHref().then((data)=>{
                        this.articleInfo.img = data;
                        this.$http.post('/article/insertArticle',this.articleInfo)
                            .then(res=>{
                                this.$router.push('/index');
                            }).catch(err=>{
                                this.warnText = "出错啦！！！！！"
                            })
                    })              
                }else{
                    this.$http.post('/article/insertArticle',{             
                        ...this.articleInfo
                    }).then(res=>{
                            this.$router.push('/index');
                        }).catch(err=>{
                            this.warnText = "出错啦！！！！！"
                        })
                }
            }
        },
        cancel () {
            this.$store.dispatch('changeModifyFalse');
            this.articleInfo = {
                title: '',
                body: '',
                img: '',               
                type_num: null,
                label_num: null,
                description: ''
            }         
        },
        updateArticle () {
            if(this.$refs.cropper.getHref()){
                this.$refs.cropper.getHref().then((data)=>{
                    this.articleInfo.img = data;
                    this.$http.post('/article/updateArticle',{
                        'id': this.id,
                        ...this.articleInfo
                    }).then(res=>{
                        this.$store.dispatch('changeModifyFalse');
                        this.articleInfo = {
                            title: '',
                            body: '',
                            img: '',               
                            type_num: null,
                            label_num: null,
                            description: ''
                        }  
                        this.$router.push('/index');
                    }).catch(err=>{
                        this.warnText = "出错啦！！！！！"
                    })
                })              
            }else{
                this.$http.post('/article/updateArticle',{
                        'id': this.id,
                        ...this.articleInfo
                    }).then(res=>{
                            this.$store.dispatch('changeModifyFalse');
                            this.articleInfo = {
                                title: '',
                                body: '',
                                img: '',               
                                type_num: null,
                                label_num: null,
                                description: ''
                            }  
                            this.$router.push('/index');
                        }).catch(err=>{
                            this.warnText = "出错啦！！！！！"
                        })
            }
        }                      
    },   
    components:{      
        mavonEditor,
        vueCropper: (resolve)=>{
            require(['./imgCroppper'],resolve)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

