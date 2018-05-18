<template>
  <div>
    <!-- 访问量 -->
    <el-main>
      <el-table :data="lists" border >
        <el-table-column label="头像" prop="uid.avatarUrl">
          <template slot-scope='scope'>
             <img v-if="scope.row.uid.avatarUrl" :src="scope.row.uid.avatarUrl" class="avatarUrl" alt="">
             <span v-else v-text="'尚未提供信息'"></span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="uid.nickName">
          <template slot-scope='scope'>
          
            <span v-if="scope.row.uid.nickName" v-text="scope.row.uid.nickName" ></span>
             <span v-else v-text="'尚未提供信息'"></span>
          </template>

        </el-table-column>
        <!-- <el-table-column label="电话" prop="uid.phone"></el-table-column> -->
        <el-table-column label="访问时间" prop="">
          <template slot-scope='scope'>
             <span v-text="scope.store.table.timetrans(scope.row.time)"></span>
          </template>
        </el-table-column>
        <el-table-column label="访问房源" prop="houseName">
          <template slot-scope='scope'>
             <el-popover
              placement="right"
              width="200"
              trigger="click"
              @show="getHouseInfo(scope.row.houseType,scope.row.houseId)">
                <div >
                  <p v-if="scope.row.houseType == 1">新房</p>
                  <p v-else-if="scope.row.houseType ==2">二手房</p>
                  <p v-else>新房</p>
                  <p style="text-align:center">
                    <img :src="BASE_API + 'uploads/'+scope.row.houseImg[0]" alt="" class="houseImg" style="width:100%">
                  </p>
                  <p> 房源编号：<span v-text="popoverHouseInfo.code"></span></p>
                  <p>地址 ：<span v-text="popoverHouseInfo.address"></span></p>
                  <p>价格 ：<span v-text="popoverHouseInfo.rent"></span></p>
                  <p v-if="popoverHouseInfo.proportion"> 面积 ：<span v-text="popoverHouseInfo.proportion"></span></p>
                  <p v-if="popoverHouseInfo.room">户型 ：
                    <span v-if="scope.row.houseType == 2 && popoverHouseInfo.room"  v-text="popoverHouseInfo.room.s + '室' +popoverHouseInfo.room.t + '厅' +popoverHouseInfo.room.w + '卫'"></span>
                    <span v-if="scope.row.houseType == 3" v-text="popoverHouseInfo.room + '室'"></span>
                  </p>
                </div>
              <a slot="reference" v-text="scope.row.houseName" ></a>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope='scope'>
            <el-button v-if="scope._self.isBroker()" disabled="" type="" size="small" @click="delHistory(scope.row._id)">删除</el-button>
            <el-button v-else type="" size="small" @click="delHistory(scope.row._id)">删除</el-button>
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
      <!-- <span v-text="broker1"></span> -->
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
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      popoverHouseInfo: {
        room: { s: 1, t: 1, w: 2 }
      },
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

    // 条件查询
    search() {
      this.getViewsLists();
    },

    //改变页码
    changePage(page) {
      this.getViewsLists(page - 1);
    },
    getViewsLists(skip = this.skip, limit = this.limit) {
      // 获取访问记录列表
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
      url
        .post(`/views`, { condition, limit: limit, skip: skip * limit })
        .then(res => {
          this.lists = res.data.lists;
          this.count = res.data.count;
        });
    },
    getHouseInfo(houseType, houseId) {
      //获取详细信息
      this.popoverHouseInfo = {};
      url.post("/views/popoverHouseInfo", { houseType, houseId }).then(res => {
        this.popoverHouseInfo = res.data;
      });
    },
    delHistory(id){
      console.log('id :', id);
      url.delete(`/views/${id}`)
        .then(res =>{
          if(res.data.n){
            this.$message({
              message:'删除成功'
            })
            this.getViewsLists()
          }
        })
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
  },
  computed: {
    // broker1(){
    //   console.log('改变');
    //   return this.broker
    // }
  }
};
</script>

<style scoped>
/* .houseImg{
  width: 100px;
} */
</style>