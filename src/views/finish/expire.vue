<template>
  <div>
    <el-main height="">
      <!-- Main content -->
      <el-form :model="form" :inline="true">
         <el-form-item label="成交时间">
          <el-date-picker
            v-model="form.finishTime"
            type="daterange"
            :picker-options="this.$store.state.app.pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            align="right"
            >
          </el-date-picker>
          </el-form-item>
         <el-form-item label="到期时间">
          <el-date-picker
            v-model="form.expireTime"
            type="daterange"
            :picker-options="this.$store.state.app.pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            align="right"
            >
          </el-date-picker>
          </el-form-item>
          
        <el-form-item label="经纪人" v-if="this.isBroker()" >
          <el-select v-model="this.getBroker()" placeholder="">
            <el-option label="全部" value=""></el-option>
            <!-- <el-option v-for="(item,index) in this.$store.state.app.brokers" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="经纪人" v-else>
          <el-select v-model="form.brokerId" placeholder="">
            <el-option label="全部" value=""></el-option>
            <!-- <el-option v-for="(item,index) in this.$store.state.app.brokers" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    <!-- 到期提醒 -->
    <el-table :data="lists">
      
      <el-table-column label="剩余时间" :fixed="true">
        <template slot-scope='scope'>
           <span v-if="scope.row.expireTime > nowTime" v-text="`${Math.floor((scope.row.expireTime - nowTime) /1000/24/3600)}天`"></span>
        </template>
      </el-table-column>
            <el-table-column label="到期时间" width="140">
        <template slot-scope='scope'>
           <span>{{new Date(scope.row.expireTime).format("yyyy-MM-dd")}}</span>
        </template>
      </el-table-column>
    <el-table-column label="成交时间" width="140">
        <template slot-scope='scope'>
           <span>{{new Date(scope.row.time).format("yyyy-MM-dd")}}</span>
        </template>
      </el-table-column>
      <el-table-column label="成交经纪人" prop="brokerName" width="140"></el-table-column>
     
      <el-table-column label="成交租金">
        <template slot-scope='scope'>
           <span v-text="`${scope.row.rent}元/月`"></span>
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" prop="userName">
        
      </el-table-column>
      <el-table-column label="联系方式" prop="phone" width="140">
      </el-table-column>
      <el-table-column label="付款方式" prop="payType"></el-table-column>
      <el-table-column label="出租方式" prop="rentMode">
        <template slot-scope='scope'>
           <span v-if="scope.row.rentMode == 0">合租</span>
           <span v-else>整租</span>
        </template>
      </el-table-column>
      <el-table-column label="所属小区" prop="address" width="140"></el-table-column>
       <el-table-column label="出租房源" prop="houseCode" width="140">
        <template slot-scope='scope'>
          <span>{{scope.row.houseCode}}</span>
          <el-button type="" size="mini" @click="house3Id = scope.row.houseId; house3ViewVisible = true">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="rentRemark"></el-table-column>
    </el-table>
            <el-dialog   
          title="房源信息"
          :visible.sync="house3ViewVisible"
          width="400px"
          >
          <house3View :house3Id = "house3Id"></house3View>
          </el-dialog>
    </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";
import house3View from '../house/house3View';

export default {
  components:{
    house3View,
  },
  mounted(){
    this.getBrokerList()
    this.getExpireList()
  },
  data() {
    return {
      form: {
        brokerId:''
      },
      lists: [],
      brokerLists:[],
      nowTime :new Date().getTime(),
      house3ViewVisible:false,//房源信息
      house3Id:'',
    };
  },
  methods: {
    search(){
      this.getExpireList()
    },
    getBrokerList() {
      url.post("/brokerLists").then(res => {
        this.brokerLists = res.data;
      });
    },
    getExpireList(){
      url.post('/getExpireList',this.form).then(res=>{
        this.lists = res.data
      })
    }
  }
};
</script>

<style scoped>
</style>