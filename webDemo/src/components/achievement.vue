

<template>
    <div class="achievement">
        <div class="row">
            <div class="col-lg-3">
                <div class="card">
                    <div class="card-header px-2 py-1 side-title" style="line-height:38px;">
                        <span class="iconfont text-warning mr-2">&#xe627;</span>成果展示
                        <button class="iconfont float-right btn btn-info  d-lg-none px-2 py-1" data-toggle="collapse" data-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">&#xe699;</button>
                    </div>
                    <div class="collapse show card-block side-collapse" id="collapseExample">
                        <ul class="list-group">    
                            <li class="list-group-item text-center" @click="changeType(false)">全部</li>                      
                            <li v-for="(item,index) in achievementType" :key="index" @click="changeType(item.achievement_num)" class="list-group-item text-center">
                                {{item.name}}
                            </li>                          
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg content">
                <div class="jumbotron jumbotron-fluid py-3">
                    <div class="container">
                        <h1 class="display-4">Live and learn</h1>
                        <p class="lead">We are striving for more.</p>
                    </div>
                </div>                
                <div data-spy="scroll" data-target="#collapseExample" data-offset="0">
                    <div class="card">                        
                        <div class="card-block py-5 px-4">
                            <div v-if="achInfo.length == 0" class="text-center text-warning">
                                暂无数据
                            </div>
                            <div class="row">       
                                <div class="col-lg-4 col-md-6 mb-4" v-for="(item,index) in achInfo" :key="index">
                                    <div class="card item">
                                        <img  class="card-img-top img-fliud" :src="item.img">
                                        <div class="card-body pt-1 pt-1">
                                            <div class="my-2 name">
                                                <span class="iconfont text-info">&#xe732;</span> {{item.username}} 
                                                <span class="iconfont text-info">&#xe610;</span> {{item.post_time | timeFormat}}
                                            </div>
                                            <div class="card-text text-indent mb-2 description">{{item.description}}</div>
                                            <a v-if="item.href" :href="item.href" class="btn btn-info btn-sm ">查看</a>
                                        </div>
                                    </div>
                                </div>             
                            </div>
                        </div>                        
                        <div class="card-block text-center py-5 px-4 text-danger d-none">
                            
                        </div>
                    </div>                              
                </div>        
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "achievement",
  data() {
    return {
      achInfo: [],
      achievementType: []
    };
  },
  created() {
    this.getAchievementType();
    this.getAllAChievementData();
  },
  methods: {
    changeType(type) {
      if (type) {
        this.$http
          .get("/achievement/achievementTag", {
            params: {
              typeNum: type
            }
          })
          .then(res => {
            this.achInfo = res.data.msg;
          })
          .catch(err => {});
      } else {
        this.getAllAChievementData();
      }
    },
    getAchievementType() {
      this.$http("/achievement/selectAllTag").then(res => {
        this.achievementType = res.data.msg;
      });
    },
    getAllAChievementData() {
      this.$http("/achievement/achievementInfo").then(res => {
        this.achInfo = res.data.msg;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.achievement {
  .side-title {
    font-size: 20px;
    font-weight: 600;
    .iconfont {
      font-size: 24px;
    }
  }
  .side-collapse {
    li {
      font-size: 16px;
      line-height: 30px;
      transition: all 0.4s;
      &:hover {
        cursor: pointer;
        background: #8ac78f;
        color: white;
      }
    }
  }
  .content {
    .jumbotron {
      h1 {
        font-size: 30px;
      }
    }
    .item {
      transition: all 1s;
      &:hover {
        box-shadow: 10px 10px 6px rgba($color: #000000, $alpha: 0.03);
        transform: translateY(-10px);
        border: 1px solid #8ac78f;
      }
      .name {
        font-size: 14px;
        font-weight: bold;
      }
      .description {
        text-indent: 2em;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
}
</style>

