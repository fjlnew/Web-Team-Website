<template>
  <div class="essays">
      <div class="row">
            <div class="col-md">              
                <article-list :articleData="essaysData"></article-list>
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
    name: 'essays',
    data () {
        return {
            essaysData: []
        }
    },
    computed: mapGetters(['getPage']),
    watch: {
        getPage () {
            this.getEssaysData(this.getPage);
        }
    },
    created(){
        this.getEssaysData(1)
    },
    methods: {
        getEssaysData (page) {
            this.$http.get("/article/selectType",{
                params: {
                    "typeNum": 12,
                    "page": page
                }
            }).then(res => {
                if(res.data.msg == 0){
                    this.$store.dispatch('critical');
                }else{
                    this.essaysData = this.essaysData.concat(res.data.msg);
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

