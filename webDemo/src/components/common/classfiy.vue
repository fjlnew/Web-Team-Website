<template>
  <div class="classfiy">
      <div class="card">
          <div class="card-header">
              <span class="iconfont">&#xe61a;</span>标签
          </div>
          <div class="card-block d-flex flex-wrap justify-content-between">
              <div v-for="(item,index) in tagData" :key="index" @click="articleTag(item.type)" class="pl-1 py-2 mb-3">
                {{item.name}}
              </div>   
          </div>
      </div>

  </div>
</template>

<script>
export default {
    name: 'classfiy',
    data () {
        return {
            tagData: []
        }
    } ,
    created () {
        this.getTagData()
    },
    methods:{
        getTagData () {
            this.$http.get('/tag/sellectAllTag')
                .then(res => {
                    this.tagData = res.data.msg;
                }).catch(err => {

                })
        },
        articleTag(type){           
            this.$store.dispatch('changeTagType',type);
            this.$router.push('/tag');
        }
    }
}
</script>

<style lang="scss" scoped>
.classfiy{
    margin-top: 30px;
    .card-header{
        font-size: 20px;
        .iconfont{
            position: relative;
            right: 10px;
            font-size: 20px;
            font-weight: bold;
        }
    }
    .card-block{     
        padding: 20px;   
        color: #555;     
        div{
            background: rgba(0,0,0,.03);
            width: 31%;
            transition: all .5s;
            &:hover{
                cursor: pointer;
                color: white;
                background: #8AC78F;
            }
        }
    }
}
</style>

