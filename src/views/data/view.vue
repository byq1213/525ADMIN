<template>
  <div>
    <!-- 访问量 -->
    <el-main>
      <el-form :model="form" :inline="true" >
        <el-form-item label="时间段查询">
          <el-date-picker
            v-model="form.birthday"
            type="datetimerange"
            :picker-options="this.$store.state.app.pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            >
          </el-date-picker>
          </el-form-item>
          <el-form-item label="房源类型">
            <el-select v-model="form.type" placeholder="">
              <el-option value="0" label="全部"></el-option>
              <el-option v-for="(item,index) in this.$store.state.app.houseType"
               :key="index" 
               :value="item.value"
               :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary">查询</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="warning">删除浏览记录</el-button>
          </el-form-item>
      </el-form>
      <el-table :data="lists" border>
        <el-table-column label="头像" prop="uid.avatarUrl">
          <template slot-scope='scope'>
             <img v-if="scope.row.uid.avatarUrl" :src="scope.row.uid.avatarUrl" class="avatarUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="uid.nickName"></el-table-column>
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
                    <img :src="BASE_API + '/uploads/'+scope.row.houseImg[0]" alt="" class="houseImg" style="width:100%">
                  </p>
                  <p> 房源编号：<span v-text="popoverHouseInfo.code"></span></p>
                  <p>地址 ：<span v-text="popoverHouseInfo.address"></span></p>
                  <p>价格 ：<span v-text="popoverHouseInfo.rent"></span></p>
                  <p>面积 ：<span v-text="popoverHouseInfo.proportion"></span></p>
                  <p>户型 ：
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
            <el-button type="" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";

export default {
  mounted() {
    this.getViewsLists();
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      popoverHouseInfo:{
        room:{s:1,t:1,w:2}
      },
      form: {
        type: "0"
      },
      lists: []
    };
  },
  methods: {
    getViewsLists() {
      url.get("/views").then(res => {
        this.lists = res.data.lists;
      });
    },
    getHouseInfo(houseType,houseId){
      this.popoverHouseInfo = {};
      url.post('/views/popoverHouseInfo',{houseType,houseId})
        .then(res =>{
          this.popoverHouseInfo = res.data
          
        })

    }
  }
};
</script>

<style scoped>
/* .houseImg{
  width: 100px;
} */
</style>