import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
    path: '/login',
    component: () =>
      import ('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () =>
      import ('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    name: 'Index',
    hidden: true,
    children: [{
      path: '',
      component: () =>
        import ('@/views/data/index')
    }]
  },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

// 用户权限设置
export const asyncRouterMap = [{
    path: '/index',
    component: Layout,
    meta: {
      title: '数据分析',
      icon: 'form',
      roles: ['admin', 'view']
    },
    children: [{
        path: 'data',
        name: 'data_index',
        component: () =>
          import ('@/views/data/index'),
        meta: {
          title: '数据分析',
          icon: 'form',
          roles: ['admin', 'view']
        }
      },

    ]
  },
  {
    path: '/index',
    component: Layout,
    meta: {
      title: '经纪人排名',
      icon: 'form',
      roles: ['admin', 'view']
    },
    children: [{
      path: 'rank',
      name: 'data_rank',
      component: () =>
        import ('@/views/data/rank'),
      meta: {
        title: '经纪人排名',
        icon: 'form',
        roles: ['admin', 'view']
      }
    }, ]
  },
  {
    path: '/userAnalyze',
    component: Layout,
    meta: {
      title: '用户分析',
      icon: 'form',
      roles: ['admin', 'view']
    },
    children: [{
      path: 'list',
      name: 'userList',
      component: () =>
        import ('@/views/userAnalyze/list'),
      meta: {
        title: '会员查询',
        icon: 'form',
        roles: ['admin', 'view']
      }
    }]
  },
  {
    path: '/House',
    component: Layout,
    meta: {
      title: '房源数据',
      icon: 'form'
    },
    children: [{
        path: 'index',
        name: 'HouseAdd',
        component: () =>
          import ('@/views/house/addIndex'),
        meta: {
          title: '添加房源',
          icon: 'form',
          roles: ['admin']
        }
      },
      {
        path: 'addNew',
        name: 'HouseAdd1',
        hidden: true,
        component: () =>
          import ('@/views/house/addNew'),
        meta: {
          title: '添加新房',
          icon: 'form',
          roles: ['admin']
        }
      },
      {
        path: 'addNew/:id',
        name: 'EditAdd1',
        hidden: true,
        component: () =>
          import ('@/views/house/addNew'),
        meta: {
          title: '修改新房信息',
          icon: 'form',
          roles: ['admin']
        }
      },
      {
        path: 'add2',
        name: 'HouseAdd2',
        hidden: true,
        component: () =>
          import ('@/views/house/add2'),
        meta: {
          title: '添加二手房',
          icon: 'form',
          roles: ['admin']
        }
      },
      {
        path: 'add2/:id',
        name: 'EditAdd2',
        hidden: true,
        component: () =>
          import ('@/views/house/add2'),
        meta: {
          title: '修改二手房',
          icon: 'form',
          roles: ['admin']
        }
      },
      {
        path: 'add3',
        name: 'HouseAdd3',
        hidden: true,
        component: () =>
          import ('@/views/house/add3'),
        meta: {
          title: '添加租房',
          icon: 'form',
          roles: ['admin']
        }
      },
      {
        path: 'add3/:id',
        name: 'EditAdd3',
        hidden: true,
        component: () =>
          import ('@/views/house/add3'),
        meta: {
          title: '修改租房信息',
          icon: 'form',
          roles: ['admin']
        }
      },
      {
        path: 'list',
        name: 'HouseList',
        component: () =>
          import ('@/views/house/list'),
        meta: {
          title: '房源列表',
          icon: 'form',
          roles: ['admin', 'view']
        }
      },
    ]
  },
  {
    path: '/finish',
    component: Layout,
    meta: {
      title: '成交房源',
      icon: 'form',
      roles: ['admin', 'view']
    },
    children: [{
        path: 'index',
        name: 'createFinish',
        component: () =>
          import ('@/views/finish/add'),
        meta: {
          title: '添加成交',
          icon: 'form',
          roles: ['admin']
        }
      }, {
        path: 'list',
        name: 'finishList',
        hidden: true,
        component: () =>
          import ('@/views/finish/list'),
        meta: {
          title: '成交列表',
          icon: 'form',
          roles: ['admin', 'view']
        }
      },
      {
        path: 'expire',
        name: 'expirehList',
        component: () =>
          import ('@/views/finish/expire'),
        meta: {
          title: '到期提醒',
          icon: 'form',
          roles: ['admin', 'view']
        }
      },

    ]
  },
  {
    path: '/broker',
    component: Layout,
    meta: {
      title: '经纪人管理',
      icon: 'form'
    },
    children: [{
        path: 'list',
        name: 'brokerList',
        component: () =>
          import ('@/views/broker/list'),
        meta: {
          title: '经纪人列表',
          icon: 'form',
          roles: ['admin']
        }
      },
      {
        path: 'add',
        name: 'brokerAdd',
        component: () =>
          import ('@/views/broker/add'),
        meta: {
          title: '添加经纪人',
          icon: 'form',
          roles: ['admin']
        }
      },
      {
        path: 'edit/:id',
        name: 'brokerEdit',
        hidden: true,
        component: () =>
          import ('@/views/broker/add'),
        meta: {
          title: '修改经纪人',
          icon: 'form',
          roles: ['admin']
        }
      },
    ]
  },
  {
    path: '/storeSetting',
    component: Layout,
    meta: {
      title: '店铺设置',
      icon: 'form',
      roles: ['admin']
    },
    children: [{
        path: 'index',
        name: 'storeSetting',
        component: () =>
          import ('@/views/setting/index'),
        meta: {
          title: '店铺设置',
          icon: 'form',
          roles: ['admin']
        }
      },
      {
        path: '',
        name: 'swiperSetting',
        component: () =>
          import ('@/views/setting/swiper'),
        meta: {
          title: '轮播设置',
          icon: 'form',
          roles: ['admin']
        }
      }
    ]
  },
  {

    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    hidden: true,
    alwaysShow: false,
    meta: {
      title: '权限管理',
      icon: 'form'
    },
    children: [{
        path: 'index',
        name: 'permissionList',
        component: () =>
          import ('@/views/broker/list'),
        meta: {
          title: '权限管理',
          icon: 'form',
          roles: ['admin']
        }
      },
      {
        path: 'index1',
        name: 'permissionList1',
        component: () =>
          import ('@/views/broker/list'),
        meta: {
          title: '权限管理1',
          icon: 'form',
          roles: ['admin']
        }
      },

    ]
  },
  {
    path: '/setting',
    component: Layout,
    hidden: true,
    meta: {
      title: '页面管理',
      icon: 'form',
      roles: ['admin']
    },
    children: [{
      path: 'index',
      name: 'setting_index',
      component: () =>
        import ('@/views/setting/pageSetting'),
      meta: {
        title: '首页设置',
        icon: 'form',
        roles: ['admin']
      }
    }, ]
  },
  {
    path: '/expand',
    component: Layout,
    hidden: true,

    meta: {
      title: '推广店铺',
      icon: 'form',
      roles: ['view']
    },
    children: [{
      path: 'index',
      hidden: true,

      name: 'expand_index',
      component: () =>
        import ('@/views/broker/expand'),
      meta: {
        title: '推广店铺',
        icon: 'form',
        roles: ['view']
      }
    }, ]
  },
  {
    path: '/sendHouse',
    component: Layout,
    meta: {
      title: '推送房源',
      icon: 'form',
      roles: ['view']
    },
    children: [{
      path: 'index',
      name: 'sendHouse',
      component: () =>
        import ('@/views/send/index'),
      meta: {
        title: '需求列表',
        icon: 'form',
        roles: ['view']
      }
    }, {
      path: 'addNeed',
      name: 'addNeed',
      component: () =>
        import ('@/views/send/add'),
      meta: {
        title: '添加需求',
        icon: 'form',
        roles: ['view']
      }
    }, ]
  },
  {
    path: '/meng/shareHouse',
    component: Layout,
    meta: {
      title: '管理共享房源',
      icon: 'form',
      roles: ['view']
    },
    children: [{
        path: 'index',
        name: 'manageSharellist',
        component: () =>
          import ('@/views/shareHouse/list'),
        meta: {
          title: '房源列表',
          icon: 'form',
          roles: ['view']
        }
      },
      {
        path: 'house3',
        name: 'manageShareHouse3',
        component: () =>
          import ('@/views/shareHouse/add3'),
        meta: {
          title: '添加出租房',
          icon: 'form',
          roles: ['view']
        }
      },
      {
        path: 'house2',
        name: 'manageShareHouse2',
        component: () =>
          import ('@/views/shareHouse/add2'),
        meta: {
          title: '添加二手房',
          icon: 'form',
          roles: ['view']
        }
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];
