<template>
   <div class="latest-article">
       <div class="card">
            <div class="card-header">
                <span class="iconfont">&#xe634;</span>近期文章     
            </div>  
            <ul class="list-group">                
                <li v-for="(item,index) in articleTop" :key="index" @click="detail(item.id)" class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="title col-md-8">{{item.title}}</span>
                    <span>{{item.post_time | timeFormat}}</span>
                </li>                
            </ul>                     
        </div>
   </div> 
</template>

<script>
export default {
    name: 'latest-article',
    created () {
        this.getArticleTop()
    },
    data () {
        return {
            articleTop : []
        }
    },
    methods:{
        getArticleTop () {
            this.$http.get('/article/selectTop5')
                .then(res => {
                    this.articleTop = res.data.msg;
                }).catch(err => {

                })
        },
        detail(id){
            this.$store.dispatch('detail',id);
            this.$router.push('/detail');
        }
    }
}
</script>
<style lang="scss" scoped>
.latest-article{
    margin-top: 30px;
    .card-header{
        font-size: 20px;
        .iconfont{
            position: relative;
            right: 10px;
            font-size: 20px;
        }
    }
    .list-group{
        color: #555;     
        font-size: 26px; 
        .title{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .list-group-item:hover{
            color: #8AC78F;
            cursor: pointer;
        }          
    }
}
</style>

