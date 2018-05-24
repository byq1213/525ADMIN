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
    <el-table :data="lists" :stripe="true">
      
      <el-table-column label="剩余时间" :fixed="true">
        <template slot-scope='scope'>
           <span v-if="scope.row.expireTime > nowTime" v-text="`${Math.floor((scope.row.expireTime - nowTime) /1000/24/3600)}天`"></span>
           <span v-else style="color:red">已到期</span>
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
     
      <el-table-column label="成交租金" width="120px">
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
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="rentRemark"></el-table-column>
      <el-table-column label="操作" prop="" fixed="right" width="200px">
        <template slot-scope='scope'>
        <el-button type="primary" size="mini" @click="expireForm = scope.row; expireDialog =true">修改</el-button>
          <el-button type="" size="mini" @click="house3Id = scope.row.houseId; house3ViewVisible = true">房源详情</el-button>
        
        </template>
      </el-table-column>
    </el-table>
            <el-dialog   
          title="房源信息"
          :visible.sync="house3ViewVisible"
          width="400px"
          >
          <house3View :house3Id = "house3Id"></house3View>
          </el-dialog>
           <el-dialog
         title="到期提醒"
         :visible.sync="expireDialog"
         width="30%"
         @close="closeEv"
         >
         <el-form :model="expireForm" size="small" label-width="100px">
           <el-form-item label="到期时间">
             <el-date-picker v-model="expireForm.expireTime" placeholder="" value-format="timestamp"></el-date-picker>
           </el-form-item>
           <el-form-item label="成交租金">
             <el-input v-model="expireForm.rent" placeholder="请输入租金" class="w20">
               <template slot="append">
                 元
               </template>
             </el-input>
           </el-form-item>
           <el-form-item label="出租方式">
             <el-select v-model="expireForm.rentMode" placeholder="">
               <el-option label="合租" :value="0"></el-option>
               <el-option label="整租" :value="1"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="付款方式">
             <el-input v-model="expireForm.payType" placeholder="" class="w20"></el-input>
           </el-form-item>
           <el-form-item label="客户姓名">
             <el-input v-model="expireForm.userName" placeholder="请输入客户姓名" class="w20"></el-input>
           </el-form-item>
           <el-form-item label="客户联系方式">
             <el-input v-model="expireForm.phone" placeholder="请输入客户联系方式" class="w20"></el-input>
           </el-form-item>
           <el-form-item label="所属小区地址">
             <el-input v-model="expireForm.address" placeholder="请输入所属小区地址"></el-input>
           </el-form-item>
           <el-form-item label="备注信息">
             <el-input v-model="expireForm.rentRemark" type="textarea" placeholder="请输入备注信息，如110栋1单元1101A室"></el-input>
           </el-form-item>
           <el-form-item label="">
             <el-button type="success" @click="saveExp">保存</el-button>
             <el-button type="" @click="expireDialog = false">取消</el-button>
           </el-form-item>
         </el-form>

       </el-dialog>
    </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";
import house3View from "../house/house3View";

export default {
  components: {
    house3View
  },
  mounted() {
    this.getBrokerList();
    this.getExpireList();
  },
  data() {
    return {
      expireDialog: false,
      expireForm: {},
      form: {
        brokerId: ""
      },
      lists: [],
      brokerLists: [],
      nowTime: new Date().getTime(),
      house3ViewVisible: false, //房源信息
      house3Id: ""
    };
  },
  methods: {
    saveExp() {
      url.post("/createExp", this.expireForm).then(res => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.expireDialog = false;
          // this.$router.push("./list");
        }
      });
    },
    search() {
      this.getExpireList();
    },
    getBrokerList() {
      url.post("/brokerLists").then(res => {
        this.brokerLists = res.data;
      });
    },
    getExpireList() {
      url.post("/getExpireList", this.form).then(res => {
        this.lists = res.data;
      });
    }
  }
};
</script>

<style scoped>
</style>