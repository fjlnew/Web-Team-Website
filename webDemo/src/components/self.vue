<template>
    <div class="self">       
        <div class="row">         
            <div class="col-lg-2 d-none d-lg-block">
                <ul class="nav flex-column nav-pills">     
                    <li class="nav-item mb-2" style="text-align:center;" v-if="personalInfo[0]">
                        <img :src="personalInfo[0].image" class="img-fluid" style="border-radius: 50%;" alt="" width="70%">
                    </li>               
                    <li class="nav-item mb-4 pl-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div v-if="personalInfo[0]">
                                <h1 style="font-weight:bold;">{{personalInfo[0].username}}</h1>
                            </div>
                            <div>
                                <button class="btn btn-danger btn-sm" @click="logOut">注销</button>
                            </div>
                        </div>
                    </li>                        
                    <router-link class="nav-item text-center py-2 px-2" v-for="(item,index) in navbar" :key="index" :to="item.route" tag="li" active-class="active" style="cursor:pointer">
                        {{item.value}}     
                    </router-link>             
                </ul>  
            </div>   
            <div class="col-lg-10" style="background: white;">                
                <router-view></router-view>
            </div>
        </div>        
    </div> 
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    name: 'self',
    computed:mapGetters(['personalInfo']),
    created () {
        if(this.$store.state.token){
            this.$store.dispatch('userInfo');
        }
    },
    data(){
        return {
            navbar:[{
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
    methods: {
        logOut () {
            this.$store.dispatch('logout');
            this.$router.push('/login');
        }
    }
}
</script>
<style lang="scss" scoped>
.self{
    .active{
        background: rgb(194, 218, 196);
        border-radius: 20px;
        color: white;      
    }
}
</style>

