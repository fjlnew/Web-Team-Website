<template>
  <div class="notice">
       <div class="card">
            <div class="card-header">
                <span class="iconfont">&#xe628;</span>站内公告     
            </div>   
            <div class="card-block">
                <ul class="list-group">                  
                    <li v-for="(item,index) in newsTop" @click="detail(item.id)" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                        <span class="title col-md-8"> {{item.title}}</span>
                        <span>{{item.post_time | timeFormat}}</span>
                    </li>                   
                </ul>    
            </div>            
        </div>
  </div>
</template>

<script>
export default {
    name: 'notice',
    data () {
        return {
            newsTop: []
        }
    },
    created(){
        this.getNewsTop()          
    },
    methods: {
        getNewsTop () {
            this.$http.get('/news/selectTop').then(res => {
                this.newsTop = res.data.msg;
            }).catch(err => {
                
            })
        },
        detail (id) {
            console.log(id)
            this.$http.get('/news/selectDetail',{
                params: {
                    "newsId": id
                }
            }).then(res => {
                this.$store.dispatch("newsDetail",res.data.msg)
                this.$router.push('/detail');
            }).catch(err =>{

            })               
        }
    }
}
</script>
<style lang="scss" scoped>
.notice{
    .card{
        .card-header{
            font-size: 20px;
            font-weight: 400;
            .iconfont{
                position: relative;
                right: 8px;
                font-size: 20px;
                color: rgb(235, 50, 50);
            }
        }
        .card-block{
            .list-group{                      
                .list-group-item{
                    color: #555;
                    border: none;
                    .title{
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    &:first-child{
                        font-weight: bold;
                        color: black;
                    }
                    &:hover{
                        cursor: pointer;
                        color: #8AC78F;
                    }
                }
            }            
        }
    }
}
</style>

