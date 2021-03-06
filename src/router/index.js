import Vue from 'vue'
import Router from 'vue-router'
import store from '../style/js/store'

import Home from 'components/home/home'
import Details from 'components/details/details'
import Dotask from 'components/details/dotask'
import Personal from 'components/personal/personal'
import Withdrawal from 'components/personal/withdrawal'
import Balance from 'components/personal/balance'
import Balall from 'components/personal/balall'
import Balance2 from 'components/personal/balance2'
import Cash from 'components/personal/cash'
import Account from 'components/personal/account'
import Profile from 'components/personal/profile'
import Taskall from 'components/personal/taskall'
import Audit from 'components/personal/audit'
import Rejected  from 'components/personal/rejected'
import Successful  from 'components/personal/successful'
import Failure   from 'components/personal/failure'
import Dotask2   from 'components/personal/dotask2'
import bcontent   from 'components/personal/bcontent'
import Task from 'components/personal/task'
import Login from 'components/login/login'
import Registered from 'components/login/registered'
import Reset from 'components/login/reset'


Vue.use(Router)

const title = ''

const router =  new Router({
  mode: 'hash',// 设置路由模式 可选值: "hash" | "history" | "abstract"，默认"hash",
  bese:__dirname,
  linkActiveClass: 'active', // 这是链接激活时的class
  routes: [
    {
      path: '/',
      name: 'Hello',
      meta: {
        title: '首页',
        auth: false
      },
      component: Home
    },
    {
      path: '/home',
      name: 'Hello',
      meta: {
        title: '首页',
        auth: false
      },
      component: Home
    },

    {
      path: '/details/:userId',
      name: 'Details',
      meta: {
        title : '任务详情',
        auth: false
      },
      component: Details
    },
    {
      path: '/dotask/:userId',
      name: 'Dotask',
      meta: {
        title : '参与报单',
      },
      component: Dotask
    },
    {
      path: '/personal',
      name:'personal',
      meta: {
        title: '个人中心',
      },
      component: Personal
    },
    {
      path : '/withdrawal',
      name: 'Withdrawal',
      meta: {
        title:'提现'
      },
      component : Withdrawal
    },
    {
      path: '/bcontent',
      name: '任务详情',
      meta: {
        title: 'bcontent',
        auth: false
      },
      component: bcontent
    },
    {
      path : '/balance',
      name: 'Balance',
      meta: {
        title:'资金明细'
      },
      component : Balance,
      children: [
        {
          path : 'balall',
          name: 'Balall',
          meta : {
            title :'资金明细'
          },
          component : Balall,
        },
        {
        path : 'cash',
        name: 'Cash',
        meta : {
          title :'任务返利'
        },
        component : Cash,
      },
        {
          path : 'balance2',
          name: 'Balance2',
          meta : {
            title :'提现明细'
          },
          component : Balance2,
        }
      ]
    },
    {
      path : '/account',
      name: 'Account',
      meta: {
        title:'账户信息'
      },
      component : Account
    },
    {
      path : '/profile',
      name: 'Profile',
      meta: {
        title:'用户信息'
      },
      component : Profile
    },
    {
      path : '/task',
      name: 'Task',
      meta: {
        title:'任务记录'
      },
      component : Task,
      children: [
        {
          path : 'taskall',
          name: 'Taskall',
          meta : {
            title :'任务记录'
          },
          component : Taskall,
        },
        {
          path : 'audit',
          name: 'Audit',
          meta : {
            title :'审核中'
          },
          component : Audit,
        },
        {
          path : 'rejected',
          name: 'Rejected',
          meta : {
            title :'驳回'
          },
          component : Rejected,
        },
        {
          path : 'successful',
          name: 'Successful',
          meta : {
            title :'审核成功'
          },
          component : Successful,
        },
        {
          path : 'failure',
          name: 'Failure',
          meta : {
            title :'审核失败'
          },
          component : Failure,
        }
      ]
    },
    {
      path : '/dotask2/:userId',
      name: 'Dotask2',
      meta : {
        title :'报单详情'
      },
      component : Dotask2,
    },
    {
      path: '/login',
      component: Login,
      name:'login',
      meta: {
        title: '登录账号'
      }
    },
    {
      path: '/registered',
      component: Registered,
      name:'Registered',
      meta: {
        title: '注册账号',
        auth: false
      }
    },
    {
      path: '/reset',
      component: Reset,
      name:'Reset',
      meta: {
        title: '重置密码',
        auth: false
      }
    }
  ]
})

// 路由导航钩子，beforeEach，在路由进入前调用
router.beforeEach((to, from, next) => {
  let titleStr = ''
  let con=''

  // auth true登录才能访问，false不需要登录，默认true
  var { auth = true } =  to.meta
  var isLogin = Boolean(store.state.user.token) //true用户已登录， false用户未登录
  if (auth && !isLogin && to.path !== '/login') {
    return next({ path: '/login' })
  }

  // 继续路由导航
  next()

  // 检测是不是要跳转首页，如果是，则不处理
  if (to.name !== 'Home') {
    // 倒序遍历数组获取匹配到的路由节点，拼接各部分title
    for (let i = to.matched.length - 1; i >= 0; i--) {
      con = `${to.matched[i].meta.title}`
      if(i=0){
        con === `${to.matched[0].meta.title}`
      }
      titleStr += con
    }
  }

  // 添加站点名
  titleStr += title
  // 更新title
  document.title = titleStr

})

export default router
