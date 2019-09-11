<template>
  <div class="back">
        <div class="row">
            <div class="col-md">              
                <article-list :articleData="backData"></article-list>
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
            backData: []
        }
    },
    computed: mapGetters(['getPage']),
    watch: {
        getPage () {
            this.getBackData(this.getPage)
        }
    },
    created(){
        this.getBackData(1)
    },
    methods: {
        getBackData (page) {
            this.$http.get("/article/selectType",{
                params: {
                    "typeNum": 11,
                    "page":page
                }
            }).then(res => {
                if(res.data.msg.length == 0){
                    this.$store.dispatch("critical");
                }else{
                    this.backData = this.backData.concat(res.data.msg);
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

