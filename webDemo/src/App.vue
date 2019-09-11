<template>
  <div id="app">   
    <div>    
      <a v-show="back" type="button" class="btn position-fixed fixed-btn" data-toggle="tooltip" data-placement="left" title="回到顶部" href="javascript:scroll(0,0)">
        <span class="iconfont d-block">&#xe602;</span>
      </a>
      <NavbarView></NavbarView>
    </div>
    <div class="wrap bg-light" id="realize">
      <div class="container"> 
          <loading v-show="loadingShow"></loading>
          <transition name="fade" mode="out-in">
            <router-view></router-view>      
          </transition>
      </div><!-- container -->
    </div><!-- wrap -->
    <BottomView></BottomView>
  </div>
</template>

<script>
/* import NavbarView from '@/components/navbar'
import BottomView from '@/components/bottom'
import NoticeView from '@/components/notice'
import ContactView from '@/components/contact'
import LatestArticleView from '@/components/latestArticle'
import ClassfiyView from '@/components/classfiy' */
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      back: false
    };
  },
  computed: mapGetters(["loadingShow"]),
  mounted() {
    window.addEventListener("scroll", this.scroll);
    this.$router.push("/index");
  },
  methods: {
    scroll() {
      var distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      var jump = document.querySelector("#realize");
      if (distance > jump.offsetTop) {
        this.back = true;
      } else {
        this.back = false;
      }
    }
  },
  components: {
    NavbarView: resolve => {
      require(["./components/common/navbar"], resolve);
    },
    BottomView: resolve => {
      require(["./components/common/bottom"], resolve);
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  .fixed-btn {
    right: 30px;
    bottom: 30px;
    z-index: 999;
    color: white;
    background: #8ac78f;
    border: none;
    border-radius: 50%;
  }
}
.wrap {
  width: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #f5f8fa;
  .fade-enter {
    opacity: 0;
  }
  .fade-leave {
    opacity: 1;
  }
  .fade-enter-active {
    transition: all 1s;
  }
  .fade-leave-active {
    opacity: 0;
    transform: translateX(200px);
    transition: all 0.5s;
  }
}
</style>
