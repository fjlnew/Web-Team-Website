<template>
   <div class="split">
        <nav aria-label="breadcrumb" class="mt-3">             
            <ol class="breadcrumb py-2">       
                <router-link to="/index" class="breadcrumb-item" active-class="active" tag="a">首页</router-link>       
                <router-link to="/front" v-show="$route.path == '/front'" class="breadcrumb-item" active-class="active" tag="a">前端</router-link>  
                <router-link to="/back"  v-show="$route.path == '/back'" class="breadcrumb-item" active-class="active" tag="a">后台</router-link>
                <router-link to="/essays" v-show="$route.path == '/essays'" class="breadcrumb-item" active-class="active" tag="a">动态</router-link>
                <router-link to="/tag" v-show="$route.path == '/tag'" class="breadcrumb-item" active-class="active" tag="a">标签</router-link>     
            </ol>
        </nav>
   </div> 
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed:mapGetters(['indexData'])
}
</script>
<style lang="scss" scoped>
.split{
    .breadcrumb-item{
        font-size: 16px;            
    }
}
</style>



