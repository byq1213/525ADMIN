<template>
  <div>
    <!-- add follow Info -->

      <el-form :model="form" label-width="100px" size="small" ref="addFollowForm">
        <el-form-item label="经纪人" v-if="this.isBroker()">
            <el-select v-model="this.getBroker()" placeholder="" disabled="">
              <el-option label="请选择" value=""></el-option>
              <!-- <el-option v-for="(item,index) in this.$store.state.app.brokers" :key="index" :label="item.label" :value="item.value"></el-option> -->
              <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
            </el-select>
        </el-form-item>
              <el-form-item label="经纪人" v-else prop="brokerId" :rules="{
                required :true,message:'请选择经纪人',trigger:'change'
              }">
        <el-select v-model="form.brokerId" placeholder="" @change="changeBroker">
          <el-option label="请选择" value=""></el-option>
          <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="跟进时间"  prop="time" :rules="{
                required :true,message:'请选择跟进时间',trigger:'blur'
              }">
           <el-date-picker
            v-model="form.time"
            type="datetime"
            placeholder="选择日期时间"
            value-format="timestamp"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="跟进方式" >
          <el-select v-model="form.type" placeholder="">
            <el-option v-for="item in followType" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进房源"  prop="houseName" :rules="{
                required :true,message:'请选择或输入房源信息',trigger:'blur'
              }">
          <el-input v-model="form.houseName" placeholder="请选择或输入房源信息" ></el-input>
          <el-button type="primary" @click="clickHouse" size="mini">选择线上房源</el-button>
        </el-form-item>
        <el-form-item label="跟进内容">
          <el-input v-model="form.content" placeholder="请输入跟进内容" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveData()">添加</el-button>
          <el-button type="" @click="dialog= false">取消</el-button>
        </el-form-item>
      </el-form>

  </div>
</template>

<script>
import { houseCodeFormat } from "@/utils/index";
import url from "@/utils/url";

export default {
  props: {
    visible: Boolean,
    houseInfo:Object,
  },
  mounted() {
    this.getBrokerList()
  },
  data() {
    return {
      houseDialog: false,
      dialog: false,
      form: {
        code: `E${houseCodeFormat(new Date().getTime())}`,
        type: 1,
        content: "",
        brokerId:'',
        time:new Date().getTime()
      },
      followType: [
        { label: "勘察", value: 1 },
        { label: "接待", value: 2 },
        { label: "其他", value: 3 },
        { label: "完成", value: 0 }
      ],
      house2Lists: [],
      house3Lists: [],
      brokerLists: []
    };
  },
  methods: {
    clickHouse(){
      this.$emit('changeHouse',true)
    },
    saveData() {
      let data = this.form;
      this.$refs['addFollowForm'].validate((valid) => {
        if(!valid){
          return 
        }
              url.post("/addFollow", data).then(res => {
        console.log("res.data :", res.data);
        if(res.data){
          this.$message({
            type:'success',
            message:'添加成功'
          })
          this.$emit('AddSuccess',true)
        }
      });
      })

    },
    //获取二手房合租房的信息
    getHouseList() {
      url.get("/follow/getHouseList").then(res => {
        this.house2Lists = res.data.house2Lists;
        this.house3Lists = res.data.house3Lists;
      });
    },
    chooseHouse(index, houseType) {
      let houseInfo = this[`house${houseType}Lists`][index];
      console.log("houseInfo :", houseInfo);
      this.form.houseName = houseInfo.name;
      this.form.houseId = houseInfo._id;
      this.form.houseType = houseType;
      this.houseDialog = false;
    },
    getBrokerList() {
      url.post("/brokerLists").then(res => {
        this.brokerLists = res.data;
      });
    },
    changeBroker(res){
      this.brokerLists.forEach(item => {
        if(item._id == res){
          this.form.brokerName = item.brokerInfo.brokerName
        }
      })
    }
  },
  watch:{
    $props: {
      handler(newValue, oldValue) {
        // console.log('newValue :', newValue);
        this.dialog = newValue.visible
        let houseInfo = newValue.houseInfo;
        this.form.houseName = houseInfo.houseName
        this.form.houseId = houseInfo.houseId
        this.form.houseType = houseInfo.houseType
        console.log('newValue :', newValue);
      },
      deep: true
    },
    '$props.visible'(res){
        this.dialog = res
      
      console.log('res :', res);
    },
    '$props.follow'(res){
      console.log('res :', res);
    }
  }

};
</script>

<style scoped>
</style>