<template>
  <div class="tag">
      <div class="row">
            <div class="col-md">              
                <article-list :articleData="tagData"></article-list>
             </div>          
            <div class="col-md-4 d-lg-block">           
                <latest-article-view></latest-article-view>
                <classfiy-view></classfiy-view>               
            </div>
        </div><!-- row -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'tag',   
    data () {
        return {
            tagData: []
        }
    },
    computed:mapGetters(['getTagType','getPage']),
    created(){
        this.getTagArticle(1)
    },
    watch:{
        getTagType () {
            this.getTagArticle(1)
        },
        getPage () {
            this.loadMore(this.getPage)
        }
    },
    methods: {
        getTagArticle (page) {
            this.$http.get('/article/tagArticle',{
                params: {
                    "labelNum": this.getTagType,
                    "page": page
                }
            }).then(res => {
                this.tagData = res.data.msg;
            })

        },
        loadMore () {
            this.$http.get('/article/tagArticle',{
                params: {
                    "labelNum": this.getTagType,
                    "page": page
                }
            }).then(res => {
                if(res.data.msg.length == 0){
                    this.$store.dispatch("critical");
                }else{
                    this.tagData = this.tagData.concat(res.data.msg);
                }
            })
        }
    },
    components:{
        ArticleList:(resolve)=>{
            require(['./common/articleList'],resolve)
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
<style lang="scss" scoped>

</style>

