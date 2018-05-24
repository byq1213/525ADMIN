<template>
  <div>
    <!-- 用户分析 -->
    <el-main>
      <el-form :model="form" :inline="true" >
          <el-form-item label="关键词">
            <el-input v-model="form.keyword" placeholder="姓名\手机号"></el-input>
          </el-form-item>
          
        <el-form-item label="经纪人" v-if="this.isBroker()" >
          <el-select v-model="this.getBroker()" placeholder="">
            <el-option label="全部" value=""></el-option>
            <!-- <el-option v-for="(item,index) in this.$store.state.app.brokers" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="经纪人" v-else>
          <el-select v-model="form.broker" placeholder="">
            <el-option label="全部" value=""></el-option>
            <!-- <el-option v-for="(item,index) in this.$store.state.app.brokers" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需求/发布">
          <el-select v-model="form.isHelp" placeholder="">
            <el-option v-for="(item,index) in helpSelect" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时段">
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            :picker-options="this.$store.state.app.pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            align="right"
            >
          </el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item label="">
          </el-form-item>
      </el-form>
      <el-table
      :data="lists"
>

        <el-table-column label="头像" prop="avatarUrl">
          <template slot-scope='scope'>
            <img :src="scope.row.avatarUrl" alt="" class="avatarUrl">
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="nickName"></el-table-column>
        <!-- <el-table-column label="电话" prop="phone"></el-table-column> -->
        <el-table-column label="所属经纪人" prop="brokerId">
          <template slot-scope='scope'>
            <span v-if="scope.row.brokerId" v-text="scope.row.brokerId.brokerInfo.brokerName"></span>
          </template>
        </el-table-column>
                <el-table-column label="联系电话" prop="brokerId">
          <template slot-scope='scope'>
            <span v-if="scope.row.phone" v-text="scope.row.phone"></span>
            <span v-else>尚未获取</span>
          </template>
        </el-table-column>

        <el-table-column label="注册时间" min-width="100px">
          <template slot-scope='scope'>
             <span v-text="new Date(Math.floor(scope.row.regTime)  ).toLocaleString()"></span>
          </template>
        </el-table-column>
        <el-table-column label="最后登录时间" min-width="100px">
          <template slot-scope='scope'>
             <span v-text="new Date(Math.floor(scope.row.logTime)  ).toLocaleString()"></span>
          </template>
        </el-table-column>
        <el-table-column label="需求\发布\访问" prop="demand" min-width="200px">
          <template slot-scope='scope'>
             <el-button type="primary" size="small" @click="viewUserInfo(scope.row._id)"> 查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="用户信息"
       :visible.sync="userInfoDialog"
       width="80%"
       >
        <el-card class="app-item">
          <div slot="header">
            用户需求
          </div>
          <el-table :stripe='1' :data="userInfo.needLists" size='mini'>
            <el-table-column label="发布时间" prop="">
              <template slot-scope='scope'>
                <span v-text="new Date(Math.floor(scope.row.time)  ).toLocaleString()"></span>
              </template>
            </el-table-column>
            <el-table-column label="联系人" prop="name"></el-table-column>
            <el-table-column label="联系电话" prop="phone"></el-table-column>
            <el-table-column label="要求" prop="">
              <template slot-scope='scope'>
                 <p v-text="`价格：${scope.row.price}元/月、面积：${scope.row.area}㎡`"></p>
                 <span v-if="scope.row.rentMode ==0">整租</span>
                 <span v-if="scope.row.rentMode ==1">合租</span>
              </template>
            </el-table-column>
            <el-table-column label="类型" prop="">
              <template slot-scope='scope'>
               <span v-if="scope.row.mode ==2"  >帮我租房</span>
               <span v-if="scope.row.mode ==3"  >帮我买房</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card>
          <div slot="header">
            用户发布
          </div>
          <el-table :stripe='1' :data="userInfo.issueLists" size='mini'>
            <el-table-column label="发布时间" prop="">
              <template slot-scope='scope'>
                <span v-text="new Date(Math.floor(scope.row.time)  ).toLocaleString()"></span>
              </template>
            </el-table-column>
            <el-table-column label="联系人" prop="name"></el-table-column>
            <el-table-column label="联系电话" prop="phone"></el-table-column>
            <el-table-column label="要求" prop="">
              <template slot-scope='scope'>
                 <p v-text="`价格：${scope.row.price}元/月、面积：${scope.row.area}㎡`"></p>
                 <span v-if="scope.row.rentMode ==0">整租</span>
                 <span v-if="scope.row.rentMode ==1">合租</span>
              </template>
            </el-table-column>
            <el-table-column label="类型" prop="">
              <template slot-scope='scope'>
               <span v-if="scope.row.mode ==0"  >我要出售</span>
               <span v-if="scope.row.mode ==1"  >我要出租</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
               <el-card class="app-item">
         <div slot="header">
           访问记录
         </div>
         <el-table :stripe='1' :data="userInfo.historyLists" size='mini'>
           <el-table-column label="访问时间" prop="">
             <template slot-scope='scope'>
               <span v-text="new Date(Math.floor(scope.row.time)).toLocaleString()"></span>
             </template>
           </el-table-column>
           <el-table-column label="访问房源" prop="houseName"></el-table-column>
           <el-table-column label="房源图片">
             <template slot-scope='scope'>
                <img :src="`${BASE_API}uploads/${scope.row.houseImg[0]}`" class="avatarUrl"/>
             </template>
           </el-table-column>
         </el-table>
       </el-card>
       </el-dialog>
       <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="count"
          @current-change="changePage"
          :page-size="limit">
        </el-pagination>
      </div>
    </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";
import { getBrokerLists } from "@/utils/data";

export default {
  mounted() {
    this.getViewsLists();
    this.getBrokerList();
  },
    created() {
    if (this.isBroker()) {
      this.form.broker = this.getBroker();
    }
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      helpSelect: [
        { label: "全部", value: "" },
        { label: "已发布需求", value: 1 },
        { label: "已发布房源", value: 2 }
      ],
      form: {
        isHelp: "",
        type: "",
        time: [
          new Date().getTime() - 3600 * 7 * 24 * 1000,
          new Date().getTime()
        ],
        broker: ""
      },
      lists: [],
      userInfoDialog: false,
      userInfo: {},
      limit: this.$store.state.app.limit,
      count: 0,
      skip: 0,
      brokerLists: [] //经纪人列表
    };
  },
  methods: {
    // 条件查询
    search() {
      this.getViewsLists();
    },
    //改变页码
    changePage(page) {
      this.getViewsLists(page - 1);
      this.getBrokerList();
    },
    getViewsLists(skip = this.skip, limit = this.limit) {
      // 获取发布列表
      /**
       * body.lt 最大值 现在时间
       * body.gt 最小值 设定时间
       *       time: {
        $gt: gt,
        $lt: lt
      }
       */
      let { time, type, broker,keyword } = this.form;
      let condition = {
        regTime: {
          $gt: time[0],
          $lt: time[1]
        },

        brokerId: broker,
        keyword,
      };
      // 如果经纪人为空则删除经纪人条件
      console.log(condition);

      url
        .post(`/usersLists`, { condition, limit: limit, skip: skip * limit })
        .then(res => {
          this.lists = res.data.userList;
          this.count = res.data.count;
          this.getIsHelp(this.form.isHelp);
        });
    },
    getUserLists() {
      url.post("/users").then(res => {
        this.lists = res.data.data;
      });
    },
    viewUserInfo(id) {
      this.userInfoDialog = true;
      url.get(`/users/${id}`).then(res => {
        console.log("res :", res);
        this.userInfo = res.data;
      });
    },
    getBrokerList() {
      url.post("/brokerLists").then(res => {
        this.brokerLists = res.data;
      });
    },
    getIsHelp(value) {
      // 获取有需求的用户

      url.get("/isHelp/" + value).then(res => {
        let data = res.data;
        let lists = this.lists;
        let tempList = [];
        lists.forEach((item, index) => {
          data.forEach((_item, _index) => {
            if (item._id != _item._id) {
              return;
            }
            tempList.push(item);
          });
        });
        this.lists = tempList;
      });
    }
  },
  watch: {
    "form.isHelp"(res) {
      // 查看已发布需求的用户
      this.getIsHelp(res);
    }
  }
};
</script>

<style scoped>
</style>