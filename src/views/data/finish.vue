<template>
  <div>
    <!-- 经纪人成交房源列表 -->
    <el-main>
            
      <el-table :data="lists">
        <el-table-column label="经纪人姓名" prop="brokerId.brokerInfo.brokerName"></el-table-column>
        <el-table-column label="成交时间" prop="">
          <template slot-scope='scope'>
              <span v-text="new Date(Math.floor(scope.row.time)  ).toLocaleString()"></span>
          </template>
        </el-table-column>
        <el-table-column label="房源" prop="houseName"></el-table-column>
        <el-table-column label="房源类型" prop="houseType">
          <template slot-scope='scope'>
             <span v-if="scope.row.houseType ==1">新房</span>
             <span v-if="scope.row.houseType ==2">二手房</span>
             <span v-if="scope.row.houseType ==3">租房</span>
          </template>
        </el-table-column>
        <el-table-column label="房源图片" prop="houseImg">
          <template slot-scope='scope'>
            <img :src="`${BASE_API}uploads/${scope.row.houseImg[0]}`" style="height:50px"/>
          </template>
        </el-table-column>
        <el-table-column label="房源价格" prop="price"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作" prop="">
          <template slot-scope='scope'>
          <el-button type="" size="small" @click="delFinish(scope.row._id)">删除</el-button>
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
    // this.getBrokerList();
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      lists: [],
      form: {
        type: "",
        time: [new Date().getTime() - 3600 * 24 * 1000, new Date().getTime()],
        broker: ""
      },
      limit: this.$store.state.app.limit,
      count: 0,
      skip: 0,
      brokerLists: [] //经纪人列表
    };
  },
  methods: {
    getFinishLists() {
      url.get("/finish").then(res => {
        this.lists = res.data.data;
      });
    },
    // 条件查询
    search() {
      this.getViewsLists();
    },
    //改变页码
    changePage(page) {
      this.getViewsLists(page - 1);
      // this.getBrokerList();
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
        time,
        houseType,
        // broker,
        brokerId
      };

      console.log(condition);

      url
        .post(`/finishLists`, { condition, limit: limit, skip: skip * limit })
        .then(res => {
          this.lists = res.data.userList;
          this.count = res.data.count;
        });
    },
    getBrokerList() {
      url.post("/brokerLists").then(res => {
        this.brokerLists = res.data;
      });
    },
    delFinish(id) {
      // console.log("id :", id);
      url.delete(`/finish/${id}`).then(res => {
        console.log("res.data :", res.data);
        if (res.data.n) {
          this.$message({
            message: "删除成功"
          });
          this.getViewsLists();
        }
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
</style>