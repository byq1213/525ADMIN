<template>
  <div>
    <!-- 需求量 -->
    <el-main>
<el-form :model="form" :inline="true" >
        <el-form-item label="时间段查询">
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
          <el-form-item label="房源类型">
            <el-select v-model="form.mode" placeholder="">
              <el-option value="" label="全部"></el-option>
              <el-option :value="2" label="租房"></el-option>
              <el-option :value="3" label="买房"></el-option>
            </el-select>
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
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item label="">
          </el-form-item>
      </el-form>
      <el-table :data="lists" border :stripe="true" >
        <el-table-column label="用户" prop="uid.avatarUrl" fixed>
          <template slot-scope='scope'>
              <span v-if="scope.row.uid">
             <img v-if="scope.row.uid.avatarUrl" :src="scope.row.uid.avatarUrl" class="avatarUrl" alt=""></span>
             <span v-else v-text="'尚未提供信息'"></span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="uid.nickName" width="120">
          <template slot-scope='scope'>
            <span v-if="scope.row.uid" v-text="scope.row.uid.nickName" ></span>
             <span v-else v-text="'尚未提供信息'"></span>
          </template>

        </el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="联系方式" prop="phone" width="120"></el-table-column>
        <el-table-column label="发布类型" prop="mode">
          <template slot-scope='scope'>
             <span v-if="scope.row.mode ==2">租房</span>
             <span v-else-if="scope.row.mode == 3">买房</span>
             <span v-else-if="scope.row.mode == 0">出售</span>
             <span v-else-if="scope.row.mode == 1">出租</span>
          </template>
        </el-table-column>

        <el-table-column label="房源面积" prop="area">
          <template slot-scope='scope'>
             <span v-text="`${scope.row.area}㎡`"></span>
          </template>
        </el-table-column>
        <el-table-column label="房源地址" prop="address" width="300"></el-table-column>
        <el-table-column label="出租方式" prop="rentMode">
          <template slot-scope='scope'>
            <span v-if="scope.row.rentMode ==0">整租</span>
            <span v-else-if="scope.row.rentMode ==1">合租</span>
          
          <span v-else v-text="'---'"></span>
          <!-- <span v-if="scope.row.rentMode = 1" v-text="合租"></span>
          <span v-else-if="scope.row.rentMode = 0" v-text="整租"></span>
          <span v-else v-text="'--'"></span> -->
          </template>
        </el-table-column>
        <el-table-column label="户型">
          <template slot-scope='scope'>
             <span v-if="scope.row.houseType == 0" v-text="`一居室`"></span>
             <span v-if="scope.row.houseType == 1" v-text="`两居室`"></span>
             <span v-if="scope.row.houseType == 2" v-text="`三居室`"></span>
             <span v-if="scope.row.houseType == 3" v-text="`四居室`"></span>
             <span v-if="scope.row.houseType == 4" v-text="`五居室及以上`"></span>
          </template>
        </el-table-column>
        <el-table-column label="房源描述" prop="remarks" width="100"></el-table-column>
        <!-- <el-table-column label="操作" prop=""></el-table-column> -->
        <!-- <el-table-column label="电话" prop="uid.phone"></el-table-column> -->
        <el-table-column label="添加时间" prop="" width="140">
          <template slot-scope='scope'>
             <span v-text="scope.store.table.timetrans(scope.row.time)"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope='scope'>
            <el-button type="primary" size="mini" @click="matchStart(scope.$index)">匹配</el-button>
            <el-button type="" size="mini" @click="editInfo(scope.$index)">修改</el-button>
            <!-- <el-button type="" size="small">删除</el-button> -->
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
      <el-dialog :title="`为您匹配到${matchLists.length}套房源`"
      :visible.sync="matchDialog"
      >
        <!-- 匹配房源 -->
        <el-button
        type="primary"
        size="mini"
        style="margin-bottom:10px"
        @click="sendHouse" >发送</el-button>
        <el-table :data="matchLists"
        @selection-change="macthSelectChange">
          <el-table-column label="" type="selection"></el-table-column>
          <el-table-column label="房源信息" prop="name"></el-table-column>

          <el-table-column label="租金/价格" prop="">
          <template slot-scope='scope'>
              <span v-if="matchInfo.mode == 2" v-text="`${scope.row.rent}元/月`"></span>
             <!-- <span @click="test(scope)">测试scope</span> -->
          </template>
          </el-table-column>
          <el-table-column label="面积" prop="">
            <template slot-scope='scope'>
              <span v-if="matchInfo.mode == 2" v-text="`${scope.row.proportion}㎡`"></span>
            </template>
          </el-table-column>
          <el-table-column label="出租类型" prop="">
            <template slot-scope='scope'>
              <span v-if="scope.row.type == 1" v-text="`合租`"></span>
              <span v-else-if="scope.row.type == 0" v-text="`整租`"></span>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="success" size="mini" style="margin-top:10px" @click="addHouse">没有满意的房源？我要创建</el-button>
      </el-dialog>

      <el-dialog title="修改用户需求"
      :visible.sync="editInfoDialog"
      width="400px"
      >
      <!-- 修改房源需求 -->
        <el-form :model="editNeedForm" label-width="100px" size="small">
          <el-form-item label="面积" >
            <el-input v-model="editNeedForm.area" placeholder="">
              <template slot="append">
                ㎡
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="租金\价格" >
            <el-input v-if="editNeedForm.mode == 2" v-model="editNeedForm.area" placeholder="">
              <template slot="append">
                元/月
              </template>
            </el-input>
            <el-input v-else v-model="editNeedForm.area" placeholder="">
              <template slot="append">
                万元
              </template>
            </el-input>
            
          </el-form-item>
          <el-form-item label="户型" >
            <el-select v-model="editNeedForm.houseType" placeholder="">
              <el-option v-for="item in miniHouseType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出租方式" v-if="editNeedForm.mode == 2">
            <el-select v-model="editNeedForm.rentMode" placeholder="">
              <el-option :value="0" label="整租"></el-option>
              <el-option :value="1" label="合租"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="editNeedForm.address" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="success" @click="saveNeedInfo">保存</el-button>
            <el-button type="" @click="editInfoDialog = false">取消</el-button>
            <el-button type="" @click="chooseAddress">选择地址</el-button>
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
let miniHouseType = [
  { label: "一居室", value: 0 },
  { label: "两居室", value: 1 },
  { label: "三居室", value: 2 },
  { label: "四居室", value: 3 },
  { label: "五居室以上", value: 4 }
];
import url from "@/utils/url";
import { dataChart, chartIndex, getBrokerLists } from "@/utils/data";
import chooseMap from "@/components/chooseMap";
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
    this.getViewsLists();
    this.BrokerLists();
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      brokerLists: [],
      matchDialog: false,
      editInfoDialog: false,
      chooseAddressDialog: false,
      editNeedForm: {},
      form: {
        mode: "",
        time: [
          new Date().getTime() - 3600 * 24 * 7 * 1000,
          new Date().getTime()
        ],
        brokerId: ""
      },
      lists: [{ uid: {} }],
      limit: this.$store.state.app.limit,
      count: 0,
      skip: 0,

      //匹配房源
      matchInfo: {},
      matchLists: [], //匹配到的房源
      selectedHouse: [], //选中房源
      mode: 3,
      miniHouseType,
      addmapform: {}
    };
  },
  methods: {
    //子组件给父组件传递数据
    //触发事件
    chooseMapAddress(res) {
      console.log("res :", res);
      this.editNeedForm.address = res.address;
      this.editNeedForm.longitude = res.addressLatLng.lng;
      this.editNeedForm.latitude = res.addressLatLng.lat;
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
    //经纪人列表
    BrokerLists() {
      url.post("/brokerLists").then(res => {
        this.brokerLists = res.data;
        console.log(res.data);
      });
    },
    // 保存需求
    saveNeedInfo() {
      console.log("this.editInfo :", this.editNeedForm);
      url.post("/saveNeedInfo", this.editNeedForm).then(res => {
        if (res.data == 1) {
          //保存成功
          this.editInfoDialog = false;
          this.getViewsLists();
          this.$notify({
            title: "保存成功",
            // message: "成功为客户发送房源",
            type: "success"
          });
        }
      });
    },
    //修改用户信息
    editInfo(index) {
      this.editInfoDialog = true;
      let info = (this.editNeedForm = this.lists[index]);
    },
    addHouse() {
      // 跳转房源
      this.$router.push("/meng/shareHouse/house" + this.mode);
    },
    // 发送房源
    sendHouse() {
      let { selectedHouse } = this;
      selectedHouse.forEach(item => {
        item.createTime = new Date().getTime();
      });
      let { uid, mode } = this.matchInfo;
      uid = uid._id;
      if (selectedHouse.length == 0) {
        this.$notify.error({
          title: "错误",
          message: "您还未选择任何房源"
        });
        return;
      } else {
        //添加到用户的 推荐租房列表
        url.post(`/matchHouse/${uid}/${this.mode}`, selectedHouse).then(res => {
          
          if (res.data) {
            this.$notify({
              title: "成功",
              message: "成功为客户发送房源",
              type: "success"
            });
          }
        }).then(res =>{
          this.matchDialog = false
          url.post('/sendUserNotice',{id:uid,houseData:selectedHouse[0].name}).then(res=>{

          })
        })
      }
    },
    macthSelectChange(val) {
      this.selectedHouse = val;
    },
    // 匹配事件
    matchStart(index) {
      this.matchDialog = true;
      let info = (this.matchInfo = this.lists[index]);
      let { rentMode, area, mode, houseType, price,latitude,longitude } = info;
      let data = {
        rentMode, //整租./合租
        area, //面积
        mode,
        houseType, //几居室
        price, //价格
        latitude,longitude
      };
      //发送房源信息 匹配房源
      url.post(`/matchHouse`, data).then(res => {
        this.matchLists = res.data;
      });
      /*****'
      面积上下加减15
      出租方式不等于
       */
    },
    // 条件查询
    search() {
      this.getViewsLists();
    },

    //改变页码
    changePage(page) {
      this.getViewsLists(page - 1);
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
      let { time, mode, brokerId } = this.form;
      let condition = {
        time: {
          $gt: time[0],
          $lt: time[1]
        },
        mode,
        // brokerId,
        brokerId
      };
      url
        .post(`/needHouse`, { condition, limit: limit, skip: skip * limit })
        .then(res => {
          this.lists = res.data.lists;
          this.count = res.data.count;
        });
    }
  },
  watch: {
    "matchInfo.mode"(res) {
      /**
       * 如果mode 为2 时需求为找出租房
       * 房源为 租房列表
       * 为3时 找二手房二手房
       * 房源为二手房
       */
      console.log("res :", res);
      if (res == 2) {
        this.mode = 3;
      } else if (res == 3) {
        this.mode = 2;
      }
    }
  }
};
</script>

<style scoped>
/* .houseImg{
  width: 100px;
} */
</style>