<template>
  <div>
    <!-- 发布量 -->
    <el-main>
      <el-table :data="lists" border >
        <el-table-column label="头像" prop="uid.avatarUrl">
          <template slot-scope='scope'>
             <img v-if="scope.row.uid" :src="scope.row.uid.avatarUrl" class="avatarUrl" alt="">
             <span v-else v-text="'尚未提供信息'"></span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="uid.nickName">
          <template slot-scope='scope'>
            <span v-if="scope.row.uid" v-text="scope.row.uid.nickName" ></span>
             <span v-else v-text="'尚未提供信息'"></span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="联系方式" prop="phone"></el-table-column>
        <el-table-column label="发布类型" prop="mode">
          <template slot-scope='scope'>
             <span v-if="scope.row.mode ==2">租房</span>
             <span v-else-if="scope.row.mode == 3">买房</span>
             <span v-else-if="scope.row.mode == 0">出售</span>
             <span v-else-if="scope.row.mode == 1">出租</span>
          </template>
        </el-table-column>
        <el-table-column label="房源面积" prop="area">
          <template slot-scope='scope'>
             <span v-text="`${scope.row.area}㎡`"></span>
          </template>
        </el-table-column>
        <el-table-column label="房源地址" prop="address"></el-table-column>
        <el-table-column label="出租方式" prop="rentMode">
          <template slot-scope='scope'>
          <span v-if="scope.row.rentMode ==1"  >合租</span>
          <span v-else-if="scope.row.rentMode ==0"  >整租</span>
          <span v-else v-text="'---'"></span>
          <!-- <span v-if="scope.row.rentMode = 1" v-text="合租"></span>
          <span v-else-if="scope.row.rentMode = 0" v-text="整租"></span>
          <span v-else v-text="'--'"></span> -->
          </template>
        </el-table-column>
        <el-table-column label="房源描述" prop="remarks"></el-table-column>
        <!-- <el-table-column label="操作" prop=""></el-table-column> -->
        <!-- <el-table-column label="电话" prop="uid.phone"></el-table-column> -->
        <el-table-column label="添加时间" prop="">
          <template slot-scope='scope'>
             <span v-text="scope.store.table.timetrans(scope.row.time)"></span>
          </template>
        </el-table-column>
    <!-- 经纪人处理信息 -->
        <el-table-column label="状态" v-if="this.isBroker()">
          <template slot-scope='scope'>
             <span v-if="scope.row.status == 0">未处理
               <el-button type="primary" size="mini" @click="changeStatus(scope.row._id,1)">点击处理</el-button>
             </span>
             <span v-if="scope.row.status == 1">处理中
               <el-button type="primary" size="mini" @click="changeStatus(scope.row._id,2)">处理完成</el-button>
             </span>
             <span v-if="scope.row.status == 2">已处理</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" v-else>
          <template slot-scope='scope'>
            <div v-if="scope.row.brokerId">
             <span v-if="scope.row.status == 0">未处理</span>
             <span v-if="scope.row.status == 1">处理中</span>
             <span v-if="scope.row.status == 2">已处理</span>
            </div>
            <div v-else>
            <span v-if="scope.row.status == 0">未处理
               <el-button type="primary" size="mini" @click="changeStatus(scope.row._id,1)">点击处理</el-button>
             </span>
             <span v-if="scope.row.status == 1">处理中
               <el-button type="primary" size="mini" @click="changeStatus(scope.row._id,2)">处理完成</el-button>
             </span>
             <span v-if="scope.row.status == 2">已处理</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
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

export default {
  props: {
    time: Array,
    brokerId: String,
    houseType: String
  },

  mounted() {
    this.getViewsLists();
    console.log("this.$props.brokerId :", this.$props.brokerId);
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,

      form: {
        type: "",
        time: [new Date().getTime() - 3600 * 24 * 1000, new Date().getTime()]
      },
      lists: [],
      limit: this.$store.state.app.limit,
      count: 0,
      skip: 0
    };
  },
  methods: {
    //改变状态
    changeStatus(_id, status) {
      this.$alert("将改变状态？", "处理状态", {
        confirmButtonText: "确定",
        callback: action => {
          url.post("/changeIssueStatus",{_id,status}).then(res => {
            if (res.data) {
              this.getViewsLists()
              this.$message({
                type: "success",
                message: `处理状态已经改变`
              });
            }
          });
        }
      });
    },
    // 条件查询
    search() {
      this.getViewsLists();
    },

    //改变页码
    changePage(page) {
      this.getViewsLists(page - 1);
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
      let { time, houseType, brokerId } = this.$props;
      let condition = {
        time: {
          $gt: time[0],
          $lt: time[1]
        },
        houseType,
        // broker,
        brokerId
      };
      console.log("condition :", condition);
      url
        .post(`/issue`, { condition, limit: limit, skip: skip * limit })
        .then(res => {
          console.log("res :", res);
          this.lists = res.data.lists;
          this.count = res.data.count;
        });
    }
  },
  watch: {
    $props: {
      handler(newValue, oldValue) {
        console.log("子组件改变");
        this.getViewsLists();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
/* .houseImg{
  width: 100px;
} */
</style>