// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './fetch/http'
import store from './store/index'
import Loading from './components/loading/Loading'
import filters from './filter/index'
import "./assets/css/fonts.css"
import "./assets/css/reset.css"
import "./assets/css/github-markdown.css"
// import "./assets/css/bootstrap.min.css"
// import "./assets/js/bootstrap.min.js"
// import "./assets/js/jquery-3.3.1.min.js"

//全局注册过滤器
Object.keys(filters).forEach((key)=>{
  Vue.filter(key,filters[key])
})

Vue.component('loading',Loading)
Vue.prototype.$http = axios;
router.beforeEach((to,from,next)=>{ 
  store.state.page = 1;
  store.state.critical =false;
  if(to.meta.requireAuth === true){
    let token = store.state.token;
    if(token && token !== null && sessionStorage.getItem('studentNum')){  
      axios.defaults.headers.common['Authorization'] = `${store.state.token}`;
      next()
    }else{      
      next({
        path:'/login',
        query: { redirect: to.fullPath }
      })
    }
  }else{
    next()
  } 
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
