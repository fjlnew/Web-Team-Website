<template>
    <div class="survey">
        <div class="modal fade" id="delete1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">                   
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-bold py-4 text-center">
                    确定删除吗？
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deletArticle()">确定</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delete2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">                   
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-bold py-4 text-center">
                    确定修改吗？
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" @click="changeDetail()">确定</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delete3" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">                   
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-bold py-4 text-center">
                    确定删除吗？
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deletAchievement()">确定</button>
                </div>
                </div>
            </div>
        </div>
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-article-tab" data-toggle="tab" href="#nav-article" role="tab" aria-controls="nav-article" aria-selected="true">文章管理</a>
                <a class="nav-item nav-link" id="nav-file-tab" data-toggle="tab" href="#nav-file" role="tab" aria-controls="nav-file" aria-selected="false">成果管理</a>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-article" role="tabpanel" aria-labelledby="nav-article-tab">   
                <div class="card-body text-danger text-center mt-4" v-show="!selfMessage.articleData">
                    暂无数据!
                </div>        
                <div class="card-body article-item" v-for="item in selfMessage.articleData" :key="item.id">
                    <h1 class="card-title" @click="detail(item.id)">{{item.title}}</h1>
                    <p class="card-text my-3">{{item.description}}</p>
                    <div class="d-flex justify-content-between align-items-center">    
                        <div class="time">{{item.post_time | timeFormat}}</div>                   
                        <div>
                            <a href="#delete2" class="btn btn-info btn-sm" data-toggle="modal" @click="articleId = item.id">修改</a>  
                            <a href="#delete1" class="btn btn-danger btn-sm" data-toggle="modal" @click="articleId = item.id">删除</a>  
                        </div>
                    </div> 
                </div>            
            </div>
            <div class="tab-pane fade" id="nav-file" role="tabpanel" aria-labelledby="nav-file-tab">
                <div class="card-body text-danger text-center mt-4" v-show="! selfMessage.achievementData">
                    暂无数据!
                </div>   
                <div class="container">
                    <div class="row">       
                        <div class="col-lg-4 col-md-6 my-4" v-for="(item,index) in selfMessage.achievementData" :key="index">
                            <div class="card item">
                                <img  class="card-img-top img-fliud" :src="item.img">
                                <div class="card-body pt-1 pt-1">
                                    <div class="my-2 name">                        
                                        <span class="iconfont text-info">&#xe610;</span> {{item.post_time | timeFormat}}
                                    </div>
                                    <p class="card-text text-indent mb-2 text-truncate description">{{item.description}}</p>
                                    <a v-if="item.href" :href="item.href" class="btn btn-info mr-2 btn-sm">查看</a>
                                    <a href="#delete3" class="btn btn-danger btn-sm" data-toggle="modal" @click="achievementId = item.id">删除</a>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>           
        </div>       
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'survey',    
    data(){
        return {
            articleId: "",
            achievementId: ""
        }
    },
    computed:mapGetters(['selfMessage']),
    methods:{
        deletArticle(){
            this.$http.get("/article/delArticle",{               
                params: {
                    "articleId": this.articleId        
                }      
            }).then((res)=>{
                this.$store.dispatch('getSelfMessage');      
            })            
        },
        deletAchievement(){
            this.$http.post("/achievement/delAchievement",{              
                "achievementId": this.achievementId
            }).then((res)=>{                
                this.$store.dispatch('getSelfMessage');      
            })            
        },
        detail (id) {
            this.$store.dispatch('detail',id);
            this.$router.push('/detail');
        },
        changeDetail (id) {
            this.$store.dispatch('detail',this.articleId);
            this.$store.dispatch('changeModifyTrue');
            this.$router.push('/self/release');
        }
    },
    created(){
        this.$store.dispatch('getSelfMessage');       
    }  
}
</script>

<style lang="scss" scoped>
.tab-content{
    .article-item{
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.03);
        .card-title{
            font-weight: 800;
            font-size: 20px;
        }
        .card-text{
            font-size: 14px;
            text-indent: 2em;
        }
        .time{
            font-size: 14px;
        }
    }
    .article-item:hover{        
        background: rgba($color: #000000, $alpha: 0.03);
        .card-title{
            cursor: pointer;
        }
    }
}
</style>

