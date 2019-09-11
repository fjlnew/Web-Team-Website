<template>
    <div class="index">
        <div class="row">
            <div class="col-md-8">              
                <banner-view></banner-view>
                <article-list :articleData="allArticleData"></article-list>
             </div>          
            <div class="col-md-4 d-none d-lg-block"> 
                <notice-view></notice-view>             
                <latest-article-view></latest-article-view>
                <classfiy-view></classfiy-view>               
            </div>
        </div><!-- row -->
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            allArticleData: []
        }
    },
    computed: mapGetters(['getPage']),
    watch: {
        getPage () {
            this.getAllArticle(this.getPage)    
        }
    },
    created(){
        this.getAllArticle(1)
    },
    methods: {
        getAllArticle (page) {
            this.$http.get('/article/allArticle',{
                params: {
                    "page": page
                }
            }).then(res => {                   
                if(res.data.msg.length == 0){
                    this.$store.dispatch('critical');
                }else{
                    this.allArticleData = this.allArticleData.concat(res.data.msg)
                }
            }).catch(err => {

            })
        }
    },
    components:{     
        BannerView: (resolve)=>{
            require(['./common/banner'],resolve)
        },   
        ArticleList:(resolve)=>{
            require(['./common/articleList'],resolve)
        },
        BottomView:(resolve)=>{
            require(['./common/bottom'],resolve)
        },
        NoticeView:(resolve)=>{
            require(['./common/notice'],resolve)
        },      
        LatestArticleView:(resolve)=>{
          require(['./common/latestArticle'],resolve)
        },
        ClassfiyView:(resolve)=>{
          require(['./common/classfiy'],resolve)
        }
    }
}
</script>
<style lang="scss">

</style>

