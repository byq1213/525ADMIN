<template>
  <div>
    <el-main>
      <el-form :model="form" :inline="true">
        <el-form-item label="手机号">
          <el-input v-model="form.keyword" placeholder="请输入用户手机号进行查询"></el-input>
        </el-form-item>
          <el-form-item label="经纪人" v-if="this.isBroker()">
        <el-select v-model="this.getBroker()" placeholder="">
          <el-option label="全部" value=""></el-option>
          <!-- <el-option v-for="(item,index) in this.$store.state.app.brokers" :key="index" :label="item.label" :value="item.value"></el-option> -->
          <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="经纪人" v-else>
        <el-select v-model="form.brokerId" placeholder="">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="lists">
        <el-table-column label="微信头像">
          <template slot-scope='scope'>
             <img v-if="scope.row.avatarUrl" :src="scope.row.avatarUrl" class="avatarUrl" alt="">
             <span v-else v-text="'尚未提供信息'"></span>
          </template>
        </el-table-column>
        <el-table-column label="微信昵称" prop="nickName"></el-table-column>
        <el-table-column label="预留电话" prop="phone"></el-table-column>
        <el-table-column label="注册时间">
           <template slot-scope='scope'>
             <span v-text="new Date(Math.floor(scope.row.regTime)).toLocaleString()"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope='scope'>
             
          <el-button type="primary" size="small" @click="addNeedInfo(scope.row._id)"> 添加需求</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="添加需求"
        :visible.sync="addNeedDialog"
        width="30%"
        >
        <el-form :model="addNeedForm" label-width="100px" size="small" ref="addNeedForm">
          <el-form-item label="类型">
            <el-select v-model="addNeedForm.mode" placeholder="">
              <el-option :value="2" label="租房"> </el-option>
              <el-option :value="3" label="买房"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面积" prop="area" :rules="{ required: true, message: '请输入面积', trigger: 'change' }">
            <el-input v-model="addNeedForm.area" placeholder="">
              <template slot="append">
                 ㎡
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="租金\价格" prop="price" :rules="{ required: true, message: '请输入租金', trigger: 'blur' }">
            <el-input v-if="addNeedForm.mode == 2" v-model="addNeedForm.price" placeholder="">
              <template slot="append">
                元/月
              </template>
            </el-input>
            <el-input v-else v-model="addNeedForm.area" placeholder="">
              <template slot="append">
                万元
              </template>
            </el-input>
            
          </el-form-item>
          <el-form-item label="户型" >
            <el-select v-model="addNeedForm.houseType" placeholder="">
              <el-option v-for="item in miniHouseType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出租方式" v-if="addNeedForm.mode == 2">
            <el-select v-model="addNeedForm.rentMode" placeholder="">
              <el-option :value="0" label="整租"></el-option>
              <el-option :value="1" label="合租"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房源备注">
            <el-input v-model="addNeedForm.remarks" placeholder="" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="选择地址" prop="address" :rules="{ required: true, message: '请选择地址', trigger: 'blur' }">
            <el-input v-model="addNeedForm.address" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="" @click="chooseAddress">选择地址</el-button>
            
          </el-form-item>
          <el-form-item label="">
            <el-button type="success" @click="saveData">添加</el-button>
            <el-button type="" @click="addNeedDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
    
      </el-dialog>
      <el-dialog
        title="选择地址"
        :visible.sync="chooseAddressDialog"
        width="30%"
        >
        
        <chooseMap :addmapform="addmapform" @isAddressEvent="chooseMapAddress"></chooseMap>

      </el-dialog>
      
    </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";
//选择地图
import chooseMap from "@/components/chooseMap";

let miniHouseType = [
  { label: "一居室", value: 0 },
  { label: "两居室", value: 1 },
  { label: "三居室", value: 2 },
  { label: "四居室", value: 3 },
  { label: "五居室以上", value: 4 }
];
export default {
  components: {
    chooseMap
  },
  created() {
    if (this.isBroker()) {
      this.form.brokerId = this.getBroker();
    }
  },
  mounted() {
    this.BrokerLists();
  },
  data() {
    return {
      miniHouseType,
      form: { brokerId: "" },
      brokerLists: [],
      lists: [],
      addNeedDialog: false,
      addNeedForm: {
        mode: 2,
        houseType: 0,
        rentMode: 0
      },
      chooseAddressDialog: false,
      addmapform: {}
    };
  },
  methods: {
    chooseMapAddress(res) {
      console.log("res :", res);
      this.addNeedForm.address = res.address;
      this.addNeedForm.longitude = res.addressLatLng.lng;
      this.addNeedForm.latitude = res.addressLatLng.lat;
      this.chooseAddressDialog = false;
    },
    //选择地址
    chooseAddress() {
      let form = {
        address: "太原市",
        addressComponents: {},
        addressLatLng: { lat: 0, lng: 0 }
      };
      this.addmapform = form;
      this.chooseAddressDialog = true;
    },
    addNeedInfo(_id) {
      this.addNeedDialog = true;
      this.addNeedForm.uid = _id;
    },
    saveData() {
      this.addNeedForm.brokerId = this.form.brokerId;
      this.$refs['addNeedForm'].validate(valid => {
        if (valid) {
          return
        } 
      });
      url.post("/addNeed", this.addNeedForm).then(res => {
        if (res.data) {
          this.addNeedDialog = false;
        }
      });
    },
    //经纪人列表
    BrokerLists() {
      url.post("/brokerLists").then(res => {
        this.brokerLists = res.data;
        console.log(res.data);
      });
    },
    search() {
      url.post("/FindUser", this.form).then(res => {
        this.lists = res.data;
        console.log("res :", res);
      });
    }
  }
};
</script>

<style scoped>
</style>