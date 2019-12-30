import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
// import Login from './views/login.vue'
// import Register from './views/register.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/chats',
      children:[
        {
          path:'/chats',
          name:"chats",
          component: ()=> import('./views/Chats.vue')

        },
        {
          path:'/contacts',
          name:"contacts",
          component: ()=> import('./views/contacts.vue')
        },
        {
          path:'/discover',
          name:"discover",
          component: ()=> import('./views/Discover.vue')
        },
        {
          path:'/me',
          name:"me",
          component: ()=> import('./views/Me.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register.vue')
    },
    {
      path: '/information',
      name: 'information',
      component: () => import('./views/information.vue')
    },
    {
      path: '/chatview',
      name: 'chatview',
      component: () => import('./views/ChatView.vue')
    }
  ]
});
export default router;

//路由守卫 
router.beforeEach((to, from, next) => {
  //判断是否在登录状态下
  const isLogin = localStorage.wxToken ? true : false;
  //判断访问的路由是不是登录注册页 
  if(to.path == "/login" || to.path == "/register"){
    next();//进行
  }else{
    //判断isLogin值为true或false
    isLogin ? next() : next("./login")
  }
  
})
