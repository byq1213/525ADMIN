<template>
  <div>
    <!-- 添加成交房源 -->
    <el-main>

    <el-form :model="form" label-width="100px" ref="finishForm">
      <el-form-item label="添加经纪人" prop="brokerId" :rules="[{
        required :true,message:'请添加经纪人',trigger:'blur'
      }]">
        <el-select v-model="form.brokerId" placeholder="">
          <el-option v-for="(item,index) in brokerList" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="线上房源" v-if="false">
          <el-switch
            v-model="online"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        <span v-if="online" style="color:#999">   选择线上房源</span>
        <span v-else style="color:#999">   手动添加线下房源</span>
      </el-form-item>
      <el-form-item label="房源信息" prop="houseName" :rules="{
        required :true,message:'请添加房源信息',trigger:'blur'
      }">
        <el-input v-model="form.houseName" :placeholder="houseTypeHit[(form.houseType-1)]" class="w20"></el-input>
        <el-button v-if="online" type="primary" @click="showHouse">选择房源信息</el-button>
          <el-button-group v-else>
            <el-button type="primary" @click="form.houseType = 2">二手房</el-button>
            <el-button type="primary" @click="form.houseType =3" >租房</el-button>
            <el-button type="primary" @click="form.houseType =1">新房</el-button>
          </el-button-group>
      </el-form-item>
      <el-form-item label="成交时间">
        <el-date-picker
        v-model="form.time"
        type="datetime"
        placeholder=""
         value-format="timestamp"
        
        > </el-date-picker>
      </el-form-item>
      <el-form-item label="售出价格">
        <el-input v-model="form.price" placeholder="“1000元/月” 或 “100万/套”" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="form.userName" placeholder="请输入客户姓名" class="w20"></el-input>
      </el-form-item>
       <el-form-item label="联系方式">
        <el-input v-model="form.phone" placeholder="请输入联系方式" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" placeholder="" type="textarea" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="success" @click="saveData">确认成交</el-button>
        <!-- <el-button type="success" @click="saveDataAndSend">成交并发送</el-button> -->
      </el-form-item>
    </el-form>
    <el-dialog 
       title="选择房源"
       :visible.sync="addHouseDialog"
       >
         <el-tabs >
           <el-tab-pane label="租房">
             <el-table :data="house3Lists" size="mini" >
               <el-table-column label="编号" prop="code"></el-table-column>
               <el-table-column label="名称" prop="name"></el-table-column>
               <el-table-column label="参考价格" prop="rent"></el-table-column>
               <el-table-column label="图片" prop="imgPath">
                 <template slot-scope="scope">
                 <img v-if="scope.row.imgPath" class="houseImg" :src="BASE_API+'uploads/'+scope.row.imgPath[0]" alt="">
                 </template>
               </el-table-column>
               <el-table-column label="选择">
                 <template slot-scope="scope">
                   <el-button type="primary" size="mini" @click="chooseHouse(scope.$index,3)">选择</el-button>
                 </template>
               </el-table-column>
             </el-table>
           </el-tab-pane>           <el-tab-pane label="二手房">
             <el-table :data="house2Lists" size="mini" >
               <el-table-column label="编号" prop="code"></el-table-column>
               <el-table-column label="名称" prop="name"></el-table-column>
               <el-table-column label="参考价格" prop="rent"></el-table-column>
               <el-table-column label="图片" prop="imgPath">
                 <template slot-scope="scope">
                 <img v-if="scope.row.imgPath" class="houseImg" :src="BASE_API+'uploads/'+scope.row.imgPath[0]" alt="">
                 </template>
               </el-table-column>
               <el-table-column label="选择">
                 <template slot-scope="scope">
                   <el-button type="primary" size="mini" @click="chooseHouse(scope.$index,2)">选择</el-button>
                 </template>
               </el-table-column>
             </el-table>
           </el-tab-pane>
           <el-tab-pane label="新房">
             <el-table :data="house1Lists" size="mini" >
               <el-table-column label="编号" prop="code"></el-table-column>
               <el-table-column label="名称" prop="name"></el-table-column>
               <el-table-column label="参考价格" prop="rent"></el-table-column>
               <el-table-column label="图片" prop="imgPath">
                 <template slot-scope="scope">
                 <img v-if="scope.row.imgPath" class="houseImg" :src="BASE_API+'uploads/'+scope.row.imgPath[0]" alt="">
                 </template>
               </el-table-column>
               <el-table-column label="选择">
                 <template slot-scope="scope">
                   <el-button type="primary" size="mini" @click="chooseHouse(scope.$index,1)">选择</el-button>
                 </template>
               </el-table-column>
             </el-table>
           </el-tab-pane>
         </el-tabs>
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
               <el-option label="合租" value="0"></el-option>
               <el-option label="整租" value="1"></el-option>
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

export default {
  mounted() {
    this.getBrokerList();
  },
  data() {
    return {
      houseTypeHit: ["请输入新房信息", "请输入二手房信息", "请输入租房信息"],
      online: true, //线上房源
      form: {
        brokerId: "",
        time: new Date().getTime(),
        houseType: 3
      },
      BASE_API: process.env.BASE_API,
      expireDialog: false, //到期提醒
      addHouseDialog: false, //动态模糊狂
      house3Lists: [], //租房
      house2Lists: [], //二手房
      house1Lists: [], //新房
      brokerList: [],
      expireForm: {}
    };
  },
  watch: {
    "form.brokerId"(res) {
      this.brokerList.forEach(item => {
        if (item._id == res) {
          this.form.brokerName = item.brokerInfo.brokerName;
        }
      });
    }
  },
  methods: {
    closeEv() {
      this.$router.push("./list");
    },
    saveExp() {
      url.post("/createExp", this.expireForm).then(res => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.expireDialog = false;
          this.$router.push("./list");
        }
      });
    },
    // 显示房源列表
    showHouse() {
      this.addHouseDialog = true;
      if (this.house1Lists.length == 0) {
        this.getHouse1Lists();
      }
      if (this.house2Lists.length == 0) {
        this.getHouse2Lists();
      }
      if (this.house3Lists.length == 0) {
        this.getHouse3Lists();
      }
    },
    // 获取新房列表
    getHouse1Lists() {
      url.get("/houseNew").then(res => {
        this.house1Lists = res.data;
      });
    },
    // 获取二手房列表
    getHouse2Lists() {
      url.get("/house2").then(res => {
        this.house2Lists = res.data;
      });
    },
    //获取租房列表
    getHouse3Lists() {
      url.get("/house").then(res => {
        this.house3Lists = res.data;
      });
    },
    chooseHouse(houseIndex, houseType) {
      let houseInfo = this[`house${houseType}Lists`][houseIndex];
      this.form.houseName = houseInfo.name;
      this.form.houseId = houseInfo._id;
      this.form.houseType = houseType;
      this.form.houseImg = houseInfo.imgPath;
      this.form.houseCode = houseInfo.code;
      this.addHouseDialog = false;
    },
    saveData() {
      //保存数据
      this.$refs["finishForm"].validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
      url
        .post("/finish", this.form)
        .then(res => {
          console.log('res :', res);
          return res.data._id;
        })
        .then(_id => {
          if (this.form.houseType == 3) {
            this.$confirm("已提交租房信息，是否新建租房到期提醒？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.expireForm._id = _id;
                this.expireDialog = true;
                this.expireForm.userName = this.form.userName;
                this.expireForm.phone = this.form.phone
                // this.$message({
                //   type: 'success',
                //   message: '删除成功!'
                // });
              })
              .catch(() => {
                this.$router.push("./list");

                // this.$message({
                //   type: "info",
                //   message: "已取消删除"
                // });
              });
          }
        });

      return;
    },
    saveDataAndSend() {
      this.saveData();
      url.post("/send", this.form).then(res => {
        console.log(res);
      });
    },
    getBrokerList() {
      url.post("/brokerLists").then(res => {
        console.log(res);
        this.brokerList = res.data;
      });
    }
  },
  watch: {
    online(res) {
      if (res == false) {
        this.form.houseName = "";
      }
    }
  }
};
</script>

<style scoped>
.houseImg {
  max-height: 2em;
}
</style>