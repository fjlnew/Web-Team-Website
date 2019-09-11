<template>
  <div id="detail">        
       <div class="row">          
            <div class="col-md content" v-if="getDetail.length !== 0">        
                <span class="d-block pt-2 iconfont back" @click="goback">&#xe697;返回</span>      
                <div class="top pt-3 pb-2">
                    <h1 class="mb-3 title text-center">{{getDetail[0].title}}</h1>
                    <ul class="d-flex justify-content-center">
                        <li class="mr-3"><span class="iconfont">&#xe610;</span> {{getDetail[0].post_time | timeFormat}}</li>
                        <li class="mr-3" v-if="getDetail[0].username"><span class="iconfont">&#xe732;</span> {{getDetail[0].username}}</li>
                        <li class="mr-3" v-else><span class="iconfont">&#xe732;</span> 管理员</li>
                        <li v-show="getDetail[0].read_num"><span class="iconfont">&#xe613;</span> 阅读({{getDetail[0].read_num}})</li>
                    </ul>        
                </div>                    
                <div class="py-3 mt-3 markdown-body" v-html="changMarkdown(getDetail[0].body)">                   
                    
                </div>           
            </div>         
        </div><!-- row -->
  </div>
</template>

<script>
import marked from 'marked'
import {mapGetters} from 'vuex'
import hljs from 'highlight.js'
import 'highlight.js/styles/atelier-forest-dark.css'
var renderer =  new marked.Renderer();
marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});
export default {
    name: "detail",   
    computed:mapGetters(['getDetail']),
    data(){
        return {
            str: '<p>dsadasdasdas</p>'
        }
    },
    methods: {
        changMarkdown(info){
            return marked(info,{sanitize:true})
        },
        goback () {
            history.go(-1);
        }
    }
}
</script>
<style lang="scss">
#detail{    
    .content{
        background: white;     
        .back{
            font-size: 18px;
            cursor: pointer;
                   
        }   
        .top{           
            .title{
                font-size: 22px;
                font-weight: 600;
            }            
        }                  
    }
}
</style>

