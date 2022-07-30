import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login.vue'
// import Home from "../views/Home.vue";
// import Welcome from '../views/Welcome.vue'
// import User from '../views/user/User.vue'
// import Rights from '../views/power/rights/Rights.vue'
// import Roles from '../views/power/roles/Roles.vue'
// import Cate from '../views/goods/category/Cate.vue'
// import Params from '../views/goods/params/Params.vue'
// import GoodList from '../views/goods/goodLists/GoodList.vue'
// import AddGood from '../views/goods/goodLists/childComp/AddGood.vue'
// import Order from '../views/order/Order.vue'
// import Report from '../views/report/Report.vue'

const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/Login.vue')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/Home.vue')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/Welcome.vue')

const User = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../views/user/User.vue')
const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../views/power/rights/Rights.vue')
const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../views/power/roles/Roles.vue')

const Cate = () => import(/* webpackChunkName: "Cate_Params" */ '../views/goods/category/Cate.vue')
const Params = () => import(/* webpackChunkName: "Cate_Params" */ '../views/goods/params/Params.vue')

const GoodList = () => import(/* webpackChunkName: "GoodsList_Add" */ '../views/goods/goodLists/GoodList.vue')
const AddGood = () => import(/* webpackChunkName: "GoodsList_Add" */ '../views/goods/goodLists/childComp/AddGood.vue')

const Order = () => import(/* webpackChunkName: "Order_Report" */ '../views/order/Order.vue')
const Report = () => import(/* webpackChunkName: "Order_Report" */ '../views/report/Report.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome', component: Welcome
      },
      {
        path: '/users', component: User
      },
      {
        path: '/rights', component: Rights
      },
      {
        path: '/roles', component: Roles
      },
      {
        path: '/categories', component: Cate
      },
      {
        path: '/params', component: Params
      },
      {
        path: '/goods', component: GoodList
      },
      {
        path: '/goods/add', component: AddGood
      },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路有导航守卫

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    next('/login')
  } else {
    next()
  }
})

export default router
