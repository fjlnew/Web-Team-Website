import Vue from 'vue'
import Router from 'vue-router'
/* import Article from '@/components/article'
import Achievement from '@/components/achievement'
import Members from '@/components/members'
import Self from '@/components/self'
import Survey from '@/components/survey' */
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'articleAll',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'articleList',
      component: resolve => require(['@/components/index'],resolve)
    },
    {
      path: '/login',
      name: "登陆",
      component: resolve => require(['@/components/login'],resolve)
    },
    {
      path: '/regist',
      name: "注册",
      component: resolve => require(['@/components/regist'],resolve)
    },
    {
      path: '/front',
      name: '前端',
      component: resolve => require(['@/components/front'],resolve)
    },
    {
      path: '/back',
      name: '后台',
      component: resolve => require(['@/components/back'],resolve)
    },
    {
      path: '/essays',
      name: '杂文',
      component: resolve => require(['@/components/essays'],resolve)
    },
    {
      path: '/achievement',
      component: resolve => require(['@/components/achievement'],resolve)
    },
    {
      path: '/members',
      component: resolve => require(['@/components/members'],resolve)
    },
    {
      path: '/detail',
      component: resolve => require(['@/components/detail'],resolve)
    },
    {
      path: '/reset',
      component: resolve => require(['@/components/reset'],resolve)
    },
    {
      path: '/tag',
      component: resolve => require(['@/components/tag'],resolve)
    },
    {
      path: '/self',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['@/components/self'],resolve),
      children:[   
        {
          path: '',         
          redirect: '/self/survey'
        },
        {
          path: 'survey',
          meta: {
            requireAuth: true
          },
          component: resolve => require(['@/components/common/survey'],resolve),
        },
        {
          path: 'message',
          name: "个人信息页",
          component: resolve => require(['@/components/common/message'],resolve),
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: "release",
          name: "release",
          component: resolve => require(['@/components/common/release'],resolve),
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: "file",
          name: "file",
          component: resolve => require(['@/components/common/file'],resolve),
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "share",
          name: "share",
          component: resolve => require(['@/components/common/share'],resolve),
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    }   
  ]
})
