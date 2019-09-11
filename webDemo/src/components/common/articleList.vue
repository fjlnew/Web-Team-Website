<template>
    <div class="article">   
        <split-view></split-view>    
        <div v-show="articleData.length == 0" class="card-body py-5 text-center text-warning">
                暂无数据!    
        </div>       
        <transition-group name="list" tag="div">
            <div class="row" v-for="(item,index) in articleData" :key="index" @click="detail(item.id)">    
                <div class="ribbon-zzsc-green" v-show="item.name"><div class="ribbon-green">{{item.name}}</div></div>
                <div class="col-md-4" v-show="item.img">
                    <img :src="item.img" width="100%" height="100%">
                </div>
                <div class="col-md-8">                
                    <h4 class="card-title">{{item.title}}</h4>
                    <ul class="message">
                        <li><span class="iconfont">&#xe610;</span>{{item.post_time | timeFormat}}</li>
                        <li><span class="iconfont">&#xe732;</span>{{item.username}}</li>
                        <li><span class="iconfont">&#xe613;</span>阅读({{item.read_num}})</li>
                    </ul>
                    <div class="card-text text-truncate">{{item.description}}</div>              
                </div>               
            </div>            
        </transition-group>    
        <button v-if="articleData.length%5 == 0 && articleData.length!==0 && !getCritical" class="btn btn-info btn-block" @click="addMore()">{{loadMore}}</button> 
        <div v-else-if="articleData.length!==0" class="text-center py-4">
            我是有底线的...
        </div>
    </div>    
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name:'articleList',  
    data () {
        return {
            loadMore: "加载更多",         
        }
    },
    props: {
        articleData: {
            type: Array
        }
    },
    computed: mapGetters(["getCritical"]),
    components:{
        SplitView: (resolve)=>{
            require(['./split'],resolve)
        }
    },
    methods: {
        detail(id){
            this.$store.dispatch('detail',id);
            this.$router.push('/detail');
        },
        addMore(){
            this.loadMore = "正在加载中...";
            this.$store.dispatch('changePage');
        }
    }
}
</script>

<style lang="scss" scoped>
.article{
    box-sizing: border-box;
    width: 100%;   
    .row{   
        position: relative;
        margin: 0;
        box-sizing: border-box !important;
        background: white;
        padding: 30px 20px;   
        border-bottom: 1px solid rgba(0, 0, 0,.03);
        transition: all 0.5s;
        .ribbon-zzsc-green {
            width: 85px;
            height: 85px;
            overflow: hidden;
            position: absolute;
            top: -3px;
            right: -3px;
        }
        .ribbon-green {
            font-size: 16px;
            color: #333;
            text-align: center;
            text-shadow: rgba(255, 255, 255, 0.5) 0px 1px 0px;
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            position: relative;
            padding: 7px 0;
            left: -5px;
            top: 15px;
            width: 130px;
            background-color: rgba(139, 211, 151, 0.479);
            background-image: -webkit-gradient(linear, left top, left bottom, from(#BFDC7A), to(#8EBF45));
            background-image: -webkit-linear-gradient(top, #BFDC7A, #8EBF45);
            background-image: -moz-linear-gradient(top, #BFDC7A, #8EBF45);
            background-image: -ms-linear-gradient(top, #BFDC7A, #8EBF45);
            background-image: -o-linear-gradient(top, #BFDC7A, #8EBF45);
            color: #6a6340;
            -webkit-box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
            box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
        }
        .ribbon-green:before, .ribbon-green:after {
            content: "";
            border-top: 3px solid #b7be9959;
            border-left: 3px solid transparent;
            border-right: 3px solid transparent;
            position: absolute;
            bottom: -3px;
        }
        .ribbon-green:before {
            left: 0;
        }
        .ribbon-green:after {
            right: 0;
        }
        &:hover{
            cursor: pointer;
            background: rgba(0, 0, 0,.03);
        }
        .message{    
            margin-bottom: 8px;       
            li{
                display: inline-block;
                margin-right: 6px;    
                font-size: 12px;    
                color: #555;       
            }            
        }
        &:last-child{
            border-bottom: none;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        &:first-child{
            margin-top: 20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .card-text{
            font-size: 16px;
            line-height: 26px;
            color:#555; 
            height: 50px;
            letter-spacing: 1px;           
        }
        .card-title{     
            font-size: 20px;       
            font-weight: 400;    
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;                    
        }
    }
    .list-enter{
        transform: translateY(50px)
    }
    .list-enter-to{
        transform: translateY(0px)
    }
    .list-enter-active{
        transition: transform .5s cubic-bezier(.19,.71,.36,1);
    }
    .list-leave-active{
        transition: 0s;
    }
}

</style>


