<template>
   <div class="banner">
       <div id="demo" class="carousel slide" data-ride="carousel">
        <!-- 指示符 -->
        <ul class="carousel-indicators">
            <li v-for="(item,index) in bannerList" data-target="#demo" :key="index" :data-slide-to="index" :class="{active: index==0}"></li>
        </ul>
        <!-- 轮播图片 -->
        <div class="carousel-inner">
            <div v-for="(item,index) in bannerList" :key="index" class="carousel-item" :class="{'active': index==0}">
                <img class="img-fluid" :src="item.href" width="100%">
            </div>            
        </div>
        
        <!-- 左右切换按钮 -->
        <a class="carousel-control-prev" href="#demo" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#demo" data-slide="next">
            <span class="carousel-control-next-icon"></span>
        </a>

        </div> 
   </div> 
</template>

<script>
export default {
    data () {
        return {
            bannerList: []
        }
    },
    created () {
        this.getBanners();
    },
    methods: {
        getBanners () {
            this.$http.get('/file/getBannerList')
                .then(res => {
                    this.bannerList = res.data.msg;
                })
        }
    }
}
</script>

<style scoped>
</style>
