<template>
  <div>
    <!-- 添加成交房源 -->
    <el-main>

    <el-form :model="form" label-width="100px">
      <el-form-item label="添加经纪人">
        <el-select v-model="form.brokerId" placeholder="">
          <el-option v-for="(item,index) in brokerList" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房源信息">
        <el-input v-model="form.houseName" placeholder="" class="w20"></el-input>
        <el-button type="primary" @click="showHouse">选择房源信息</el-button>
      </el-form-item>
      <el-form-item label="成交时间">
        <el-date-picker
        v-model="form.time"
        type="datetime"
        placeholder=""
        > </el-date-picker>
      </el-form-item>
      <el-form-item label="售出价格">
        <el-input v-model="form.price" placeholder="“1000元/月” 或 “100万/套”"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" placeholder="" type="textarea" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="success" @click="saveData">确认成交</el-button>
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
    </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";

export default {
  mounted(){
    this.getBrokerList()
  },
  data() {
    return {
      form: {
        brokerId: "",
        time: new Date()
      },
        BASE_API:process.env.BASE_API,
      
      addHouseDialog: false, //动态模糊狂
      house3Lists: [], //租房
      house2Lists: [], //二手房
      house1Lists: [], //新房
      brokerList: [{ label: "经纪人1", value: "经纪人1" }]
    };
  },
  methods: {
    // 显示房源列表
    showHouse() {
      this.addHouseDialog = true;
      if (this.house1Lists.length == 0) {
        this.getHouse1Lists();
      }
      // if(this.house2Lists.length == 0){
      //   this.getHouse2Lists();
      // }
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
        this.house3Lists = res.data;
      });
    },
    //获取租房列表
    getHouse3Lists() {
      url.get("/house").then(res => {
        this.house3Lists = res.data;
      });
    },
     chooseHouse(houseIndex,houseType){
        let houseInfo = this[`house${houseType }Lists`][houseIndex]
        this.form.houseName = houseInfo.name;
        this.form.houseId =  houseInfo._id;
        this.form.houseType = houseType
        this.form.houseImg = houseInfo.imgPath
        this.addHouseDialog = false
     },
     saveData(){
       console.log(this.form);
       url.post('/finish',this.form)
        .then(res =>{
          console.log(res);
        })
     },
     getBrokerList(){
       url.get('/broker')
        .then(res =>{
          console.log(res);
          this.brokerList = res.data.data
        })
     }
  },
  watch:{
    'form.time'(res){
      this.form.time = Date.parse(new Date(res))
    }
  }
};
</script>

<style scoped>
  .houseImg{
    max-height: 2em;
  }
</style>