<template>
  <div id="share">
      <div class="wrapper"> 
        <div class="card text-center text-danger py-5" v-show="file.length == 0">
          暂无数据
        </div>
        <div class="card" v-for="(item,index) in file" :key="index">          
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text" v-if="item.href"><a :href="item.href">{{item.description}}</a></p>
            <p class="card-text" v-else>{{item.description}}</p>
            <ul class="d-flex mt-3">
              <li class="mr-3"><span class="iconfont">&#xe610;</span> {{item.username}}</li>
              <li><span class="iconfont">&#xe732;</span> {{item.post_time | timeFormat}}</li>
              <li class="ml-auto" v-show="item.file_href"><a :href="'http://www.pzhuweb.cn'+item.file_href" class="btn btn-primary btn-sm">下载文件</a></li>
            </ul>
          </div>  
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "share",
  data(){
    return {
      file: []
    }
  },
  created(){
      this.getFile()
  },
  methods: {
    getFile () {
      this.$http.get("/file/shareFile")
        .then((res)=>{
            this.file = res.data.msg;
        }).catch(err => {
          
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  background: white; 
  .card{
    .card-text{
      text-indent: 2em;
      a{
        color: black;
        
      }
    }
    .card-title{  
      font-size: 20px;
    }
    .card-text{
      font-size: 12px;
      color: #333;
    }
  }
}
</style>
