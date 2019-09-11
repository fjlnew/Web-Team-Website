<template>
    <div class="members">
        <div class="row">
            <div class="col-lg-2">
                <div class="card">
                    <div class="card-header px-2 py-1 side-title" style="line-height:38px;">
                        <span class="iconfont text-warning mr-2">&#xe629;</span>成员分类
                        <button class="iconfont float-right btn btn-info  d-lg-none px-2 py-1" data-toggle="collapse" data-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">&#xe699;</button>
                    </div>
                    <div class="collapse show card-block side-collapse" id="collapseExample">
                        <ul class="list-group">
                            <li class="list-group-item text-center" @click="checkType(false)">全部</li>
                            <li v-for="(item,index) in reserchType" :key="index" @click="checkType(item.reserch_num)" class="list-group-item text-center">
                                {{item.reserch_name}}
                            </li>                                                      
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg" style="background:white;">
                    <div v-show="membersInfo.length == 0" class="mt-4 text-center text-warning">
                        暂无数据！
                    </div>
                    <div class="row mb-4 no-gutters"> 
                        <div class="col-lg-4" v-for="(item,index) in membersInfo" :key="index">                            
                            <div class="card-body text-center">       
                                <div class="box">
                                    <div class="box-img">
                                        <img :src="item.image==null? 'http://www.pzhuweb.cn/upload/logo.png':item.image" class="img-fluid">
                                    </div>
                                    <div class="box-content">
                                        <h4 class="title">{{item.username}}</h4>
                                        <div class="description">
                                            <p>专业: {{item.major_name}}</p>
                                            <p>学号: {{item.student_num}}</p>
                                            <p>学院：{{item.depart_name}}</p>
                                            <p>email: {{item.email}}</p>                                            
                                        </div>
                                    </div>
                                </div>        
                                 <div class="username">
                                    {{item.username}}
                                </div>  
                                <div class="description">
                                    {{item.description}}
                                </div>                                                     
                            </div>
                        </div>                           
                    </div>                 
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    name: 'members',  
    data(){
        return {
            reserchType: [],
            membersInfo: []
        }
    },  
    created(){        
        this.getReserchType();
        this.getMembersInfo();
    },  
    methods:{
        checkType(type){              
            if(type){
                this.$http.get('/members/selectByTag',{
                    params: {
                        "reserchNum": type
                    }
                }).then(res => {
                    this.membersInfo = res.data.msg;
                }).catch(err => {

                })
            }else{
                this.getMembersInfo();
            }             
        },
        getReserchType () {
            this.$http.get('/members/selectAllSearch')
                .then(res => {
                    this.reserchType = res.data.msg;
                }).catch(err => {

                })
        },
        getMembersInfo () {
            this.$http.get('/members/selectAllMembers')
                .then(res => {
                    this.membersInfo = res.data.msg;
                }).catch(err => {

                })
        }
    }
}
</script>
<style lang="scss" scoped>
.members{
    .side-title{        
        font-size: 16px;
        font-weight: 600;
        .iconfont{
            font-size: 18px;
        }
    }
    .side-collapse{
        li{
            font-size: 16px;
            line-height: 30px;
            transition:  all .4s;
            &:hover{
                cursor: pointer;
                background: #8AC78F;
                color: white;
            }
        }
    }
    .description{
        font-size: 12px;        
        color: #666;
    }
    .username{
        margin-top: 10px;
        font-weight: 600;
        color: #333;
    }
    .box{
        position: relative;
        perspective: 1000px;
    }
    .box .box-img{
        transform: rotateY(0);
        transition: all 0.50s ease-in-out 0s;
    }
    .box:hover .box-img{
        transform: rotateY(-90deg);
    }
    .box .box-img img{
        width: 100%;
        border-radius: 50%;
        height: auto;
    }
    .box .box-content{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        padding: 30px 40px;
        text-align: center;
        background: rgba(0,0,0,0.7);
        transform: rotateY(90deg);
        transition: all 0.50s ease-in-out 0s;
    }
    .box:hover .box-content{
        transform: rotateY(0);
    }
    .box .title{
        font-size: 20px;
        color: #fff;
        text-transform: uppercase;
    }
    .box .description{
        font-size: 12px;
        line-height: 24px;
        color: #fff;
        text-align: left;
        margin-left: 10px;
    }
    .box .title:after,
    .box .description:after{
        content: "";
        width: 80%;
        display: block;
        border-bottom: 1px solid #fff;
        margin: 15px auto;
    }
    
}
</style>

