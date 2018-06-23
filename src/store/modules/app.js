import Cookies from 'js-cookie'
import url from '@/utils/url'
import {
  getStoreInfo
} from '@/api/login'

const app = {
  state: {
    limit: 5, //分页数量
    BASE_API: process.env.BASE_API,
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    pickerOptions: {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }]
    },
    houseType: [{
        label: '全部',
        value: ''
      },
      {
        label: '新房',
        value: 1
      },
      {
        label: '二手房',
        value: 2
      },
      {
        label: '租房',
        value: 3
      }
    ],
    room: [{
        label: '一居室',
        value: 1
      },
      {
        label: '两居室',
        value: 2
      },
      {
        label: '三居室',
        value: 3
      },
      {
        label: '四居室',
        value: 4
      },
      {
        label: '四居室以上',
        value: 5
      },
    ],
    brokers: [{
      label: '王五',
      value: '12312341234'
    }],
    storeInfo: {

    },
    houseTags: [{
        title: '朝向',
        sub: ['朝东', '朝南', '朝西', '朝北', '南北', ],

      }, {
        title: '其他',
        sub: [
          '满五年',
          '满两年',
          '近地铁',
          '新上',
          '随时看房',
          '有电梯',
        ]
      },
      {
        title: '用途',
        sub: [
          '普通住宅',
          '商业类',
          '别墅',
          '四合院',
        ]
      },
      {
        title: '权属',
        sub: [
          '商品房',
          '公房',
          '经适房',
        ]
      }
    ]
  },
  mutations: {
    GET_STORE_INFO: (state, info) => {
      state.storeInfo = info.data
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    beforeUpload(file) {
      if (file.size > 1024000) {
        this.$message('您上传的图片太大了');
        return false;
      }
    },
  },
  actions: {
    // GetStoreInfo({commit},storeInfo) {

    // },
    ToggleSideBar: ({
      commit
    }) => {
      commit('TOGGLE_SIDEBAR')
    },
    GetBroker: () => {
      console.log('GetBroker');
    },
    //获取店铺信息
    GetStoreInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getStoreInfo().then(res => {
          commit('GET_STORE_INFO', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      });
    },
    beforeUpload: ({
      commit
    }) => {
      console.log(commit)
    }
  }
}

export default app
