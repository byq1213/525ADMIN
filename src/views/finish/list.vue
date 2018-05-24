<template>
  <div>
    <!-- 经纪人成交房源列表 -->
    <el-main>
            <el-form :model="form" :inline="true" >
        <el-form-item label="成交时段">
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
        <el-form-item label="经纪人">
          <el-select v-model="form.broker" placeholder="">
            <el-option label="全部" value=""></el-option>
            <!-- <el-option v-for="(item,index) in this.$store.state.app.brokers" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item label="">
          </el-form-item>
      </el-form>
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
            <img :src="`${BASE_API}uploads/${scope.row.houseImg[0]}`" style="height:100px"/>
          </template>
        </el-table-column>
        <el-table-column label="房源价格" prop="price"></el-table-column>
        <el-table-column label="客户姓名" prop="userName"></el-table-column>
        <el-table-column label="联系方式" prop="phone"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作" prop="" width="200">
          <template slot-scope='scope'>
          <el-button type="" size="mini" @click="delFinish(scope.row._id)">删除</el-button>
          <el-button type="primary" size="mini" @click="showHouseInfo(scope.row)">房源详情</el-button>
          </template>
        </el-table-column>

      </el-table>
       <el-dialog   
          title="房源信息"
          :visible.sync="house3ViewVisible"
          width="400px"
          >
          <houseView v-if="houseType == 1" :houseId = "houseId"></houseView>

          <house2View v-if="houseType == 2" :house2Id="houseId"></house2View>

          <house3View v-if="houseType == 3" :house3Id="houseId"></house3View>
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
import house3View from "../house/house3View";
import house2View from "../house/house2View"; //二手房详情弹窗
import houseView from "../house/houseView"; //二手房详情弹窗

export default {
  components: {
    house3View,
    house2View,
    houseView,    
  },
  mounted() {
    this.getViewsLists();
    this.getBrokerList();
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      lists: [],
      form: {
        type: "",
        time: [
          new Date().getTime() - 3600 * 24 * 7 * 1000,
          new Date().getTime()
        ],
        broker: ""
      },
      limit: this.$store.state.app.limit,
      count: 0,
      skip: 0,
      brokerLists: [], //经纪人列表
      house3ViewVisible: false, //房源信息
      houseId: "",
      houseType:0,
    };
  },
  methods: {
    showHouseInfo(house){
      this.houseType = house.houseType
      this.houseId = house.houseId
      if(!this.houseId){
        this.$message({
          type:'warning',
          message:'暂无房源信息'
        })
        return
      }
      this.house3ViewVisible = true
      // console.log('this.houseType :', this.houseType);
      // console.log('this.houseId :', this.houseId);
      // console.log('this.house3ViewVisible :', this.house3ViewVisible);
    },
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
      let { time, type, broker } = this.form;
      let condition = {
        time: {
          $gt: time[0],
          $lt: time[1]
        },

        brokerId: broker
      };
      // // 如果经纪人为空则删除经纪人条件
      // if (condition.brokerId == "") {
      //   delete condition["brokerId"];
      // }
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
    // 删除成交
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
  }
};
</script>

<style scoped>
</style>