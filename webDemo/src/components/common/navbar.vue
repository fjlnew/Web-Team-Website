<template>
  <div id="top">
    <div class="container-fluid d-none d-lg-block">
        <ul class="nav justify-content-end mr-5">
            <li class="nav-item">
                <a class="nav-link" target="_Blank" href="http://218.6.132.18/meol/jpk/course/layout/lesson/index.jsp?courseId=42728"><span class="iconfont">&#xe629;</span>前端在线学习</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" target="_Blank" href="http://218.6.132.18/meol/jpk/course/layout/lesson/index.jsp?courseId=42657"><span class="iconfont">&#xe62d;</span>后台在线学习</a>
            </li>      
            <li class="nav-item" v-show="!$store.state.token">
                <router-link to="/regist" tag="a" class="nav-link"><span class="iconfont">&#xe607;</span>注册</router-link>
            </li> 
            <li class="nav-item">                           
                <router-link v-if="$store.state.token" to="/self" tag="a" class="nav-link"><span class="iconfont">&#xe609;</span>个人管理</router-link>      
                <router-link v-else to="/login" tag="a" class="nav-link"><span class="iconfont">&#xe609;</span>登陆</router-link>
            </li>                  
        </ul>
    </div>     
    <transition name="fade">
        <div id="mobile-menu" @click.stop="_changeSidebar" v-show="sidebarFlag">
            <div class="mobile-nav" @click.stop>
                <ul>
                    <li class="d-flex justify-content-center" @click="_changeSidebar" v-if="! $store.state.token">
                        <router-link to="/regist" tag="a" ><span class="iconfont">&#xe607;</span>注册</router-link>
                        <router-link to="/login" tag="a"><span class="iconfont">&#xe609;</span>登陆</router-link>
                    </li>                     
                    <li class="d-flex justify-content-center my-2" @click="_changeSidebar" v-else>
                        <button href="" class="btn btn-danger" @click="logout">注销</button>
                    </li>  
                     <li class="nav-item self" v-show="$store.state.token">
                        <a class="personal" @click="listFlag = !listFlag">
                            个人信息 <span v-if="listFlag" class="iconfont">&#xe603;</span><span class="iconfont" v-else>&#xe602;</span>
                        </a>
                        <div class="list" v-show="listFlag" @click="_changeSidebar">
                             <router-link class="nav-item text-center py-2 px-2" v-for="(item,index) in navbar2" :key="index" :to="item.route" tag="li" active-class="active" style="cursor:pointer">
                                - {{item.value}}     
                            </router-link>  
                        </div>                       
                    </li>    
                    <li  @click="_changeSidebar" class="nav-item" v-for="(item,index) in navbar" :key="index">                           
                        <router-link :to="item.href" tag="a" class="nav-link" active-class="active-color">{{item.name}}</router-link>
                    </li>    
                </ul>
            </div>            
        </div>
    </transition>  
    <nav class="navbar navbar-expand-xl">
        <div class="container">                  
                <a class="navbar-brand" href="#">
                    <img src="../../assets/img/logo.png" @click="$router.push('/index')" class="img-fluid" alt="Logo" style="width:150px;">
                </a>                 
                <button class="navbar-toggler" type="button" @click="_changeSidebar">
                    <span class="iconfont" style="color:green;font-size:30px;">&#xe696;</span>
                </button>                                       
                <div class="d-none d-xl-block">
                    <ul class="nav navbar-nav">
                        <li class="nav-item" v-for="(item,index) in navbar" :key="index">                           
                            <router-link :to="item.href" tag="a" class="nav-link" active-class="active-color">{{item.name}}</router-link>
                        </li>                       
                    </ul>                    
                </div>                              
        </div> 
    </nav>
  </div>
</template>

<script>
export default {
    name: 'top',
    data(){
        return {
            isLogin: false, 
            sidebarFlag: false, 
            listFlag: false,
            navbar:[
                {
                    href: '/index',
                    name: '首页'
                },
                {
                    href: '/front',
                    name: '前端'
                },
                {
                    href: '/back',
                    name: '后台'
                },
                {
                    href: '/essays',
                    name: '动态'
                },
                {
                    href: '/members',
                    name: '成员'
                },
                {
                    href: '/achievement',
                    name: '成果展示'
                }
            ],
            navbar2:[{
                route: "/self/survey",
                value: "个人动态"
            },{
                route: "/self/message",
                value: "个人信息"
            },{
                route: "/self/release",
                value: "文章发布"
            },{
                route: "/self/file",
                value: "资源上传"
            },{
                route: "/self/share",
                value: "内部资源"
            }]
        }
    },       
    methods:{
        _changeSidebar(){         
            this.sidebarFlag = !this.sidebarFlag;
        },
        logout(){
            this.$store.dispatch('logout');
            this.$router.replace('/login');
        }   
    }
}
</script>
<style lang="scss" scoped>
#mobile-menu {
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: rgba($color: #000000, $alpha: 0.2);
    z-index:9999;  
    transition: all .3s ease;
    .mobile-nav{
        position:absolute;
        top:0;
        left:0;       
        width:200px;
        height:100%;
        background-color:#373737;
        z-index:9999;    
        transition: transform 1s cubic-bezier(.08,.84,.01,1.00);  
        a{
            text-align: center;
            color:white;
            display:block;
            padding:1em 5%;    
            border-top:1px solid #4f4f4f;
            border-bottom:1px solid #292929;          
            cursor:pointer;   
            &:hover{
                background-color: #8AC78F;
                color: #ffffff;
            }     
        }
        .self{
            color: white;        
            .list{
                li:hover{
                    background-color: #8AC78F;
                    color: #ffffff;
                }
            }    
        }
    }
    &.fade-leave-to,&.fade-enter{
        opacity: 0;       
        .mobile-nav{            
            transform: translateX(-220px);
        }       
    }
   
}
.container-fluid{      
    .nav{       
        .nav-item{           
            a{
                margin-top: 10px;                
                padding: 10px 10px;    
                color: black;
                font-size: 16px;
                span{
                    font-size: 16px;
                    margin-right: 4px;                   
                }
                &:hover{
                    color: #8AC78F;
                }
            }            
        }
    }
}
.container{   
    .nav{
        .nav-item{
            margin-right: 30px;
            .nav-link{
                font-size: 18px;  
                color: black;
                &:hover{
                    color: #8AC78F;
                }                             
            }
            .active-color{
                color: #8AC78F;
                border-bottom: 4px solid #8AC78F;
            }
        }
    }
}
</style>

