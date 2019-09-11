<template>
  <div class="front">
      <div class="row">
            <div class="col-md">              
                <article-list :articleData="frontData"></article-list>
             </div>          
            <div class="col-md-4 d-none d-lg-block">           
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
            frontData: []
        }
    },
    computed: mapGetters(['getPage']),
    watch:{
        getPage () {
            this.getFrontData(this.getPage)
        }
    },
    created(){
        this.getFrontData(1)
    },
    methods: {
        getFrontData (page) {
            this.$http.get("/article/selectType",{
                params: {
                    "typeNum": 10,
                    'page': page
                }
            }).then(res => {
                if(res.data.msg.length == 0){
                    this.$store.dispatch("critical");
                }else{
                    this.frontData = this.frontData.concat(res.data.msg);
                }
            }).catch(err => {
                
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

