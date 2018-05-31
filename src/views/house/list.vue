<template>
  <el-main>
    <!-- 房源列表 -->
    <el-tabs type="card">

      <el-tab-pane>
        <span slot="label">
          二手房
          <el-badge :value="count.house2" class="item">
          </el-badge>
        </span>
        <el-form :model="form1" :inline="true" size="small">
          <!-- <el-form-item label="关键词">
            <el-input v-model="form1.keyword" placeholder="可搜索编号、名称"></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary">搜索</el-button>
          </el-form-item> -->
          <!-- <el-form-item label=""  v-if="!this.isBroker()">
            <el-button type="" @click="downHouseLists = true">下架列表</el-button>
          </el-form-item> -->
          <el-form-item label="">
            <el-input v-model="form1.keyword" placeholder="请输入关键词搜索"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model.number="form1.rent[0]" placeholder="" class="rentInput"></el-input>
            <span>-</span>
            <el-input v-model.number="form1.rent[1]" placeholder="" class="rentInput"></el-input>
            <SPAN>万元</SPAN>
          </el-form-item>
          <el-form-item label="面积">
            <el-input v-model.number="form1.proportion[0]" placeholder="" class="rentInput"></el-input>
            <span>-</span>
            <el-input v-model.number="form1.proportion[1]" placeholder="" class="rentInput"></el-input>
            <SPAN>㎡</SPAN>
          </el-form-item>
          <!-- <el-form-item label="出租方式">
            <el-select v-model="form1.type" placeholder="">
              <el-option label="全部" :value='2'></el-option>
              <el-option label="整租" :value='0'></el-option>
              <el-option label="合租" :value='1'></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="">
            <el-button type="primary" @click="search" native-type="submit">查询</el-button>
          </el-form-item>
          <el-form-item label="" v-if="!this.isBroker()">
            <el-button type="" @click="downHouseLists = true">下架列表</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="success" @click="extendDialog  = true">附加搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="lists2">
          <el-table-column label="编号" prop="code"></el-table-column>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="价格" prop="rent">
            <template slot-scope='scope'>
              <span v-text="`${scope.row.rent}万元`"></span>
            </template>
          </el-table-column>
          <el-table-column label="面积" prop="proportion">
            <template slot-scope='scope'>
              <span v-text="`${scope.row.proportion}㎡`"></span>
            </template>
          </el-table-column>
          <el-table-column label="添加时间">
            <template slot-scope='scope'>
              <span v-text="`${new Date(scope.row.time).toLocaleString()}`"></span>
            </template>
          </el-table-column>
          <el-table-column label="备注信息" prop="remark"></el-table-column>
          <!-- <el-table-column label="类型" >
            <template slot-scope="scope">
              <span v-if="scope.row.type">合租</span>
              <span v-else>整租</span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" min-width="200px" v-if="!this.isBroker()" type="expand">
            <template slot-scope="scope">
              <div style="float:right">
                <el-button type="warning" size="mini" @click="followLog(scope.row._id,scope.row.name)">跟进记录</el-button>
                <el-button type="primary" size="mini" @click="editHouse2(scope.row._id)">修改</el-button>
                <el-button type="" size="mini" @click="viewHouse2Info(scope.row._id)">详情</el-button>
                <el-button type="danger" size="mini" @click="downHouse2(scope.row._id)">下架</el-button>
                <el-button type="success" size="mini" @click="showQrcode(scope.row._id)">小程序码</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="查看" v-else type="expand">
            <template slot-scope='scope'>
              <div style="float:right">
                <el-button type="warning" size="mini" @click="followLog(scope.row._id,scope.row.name)">跟进记录</el-button>
                <el-button type="" size="mini" @click="viewHouse2Info(scope.row._id)">详情</el-button>
                <el-button type="success" size="mini" @click="showQrcode(scope.row._id)">小程序码</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          租房
          <el-badge :value="count.house3" class="item">
          </el-badge>
        </span>

        <house3 @qrCodeEvent="qrCodeEvent" @showFollowHouse="ItemFollowHouse"></house3>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          新房
          <el-badge :value="count.house1" class="item">
          </el-badge>
        </span>
        <newList @qrCodeEvent="qrCodeEvent" @showFollowHouse="ItemFollowHouse"></newList>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="房源信息" :visible.sync="dialogVisible" width="400px">
      <house2View :house2Id="house2Id"></house2View>
    </el-dialog>
    <el-dialog title="下架列表" :visible.sync="downHouseLists">
      <down2 :status="downHouseLists"></down2>
    </el-dialog>
    <el-dialog title="房源二维码" :visible.sync="qrcodeDialog" width="30%">
      <img v-if="qrPath" :src="`${BASE_API}qrcode/${qrPath}.png`" style="width:100%" />
    </el-dialog>
    <!-- 房源跟进 -->
    <el-dialog title="房源跟进" :visible.sync="followHouseDialog">
      <el-form>
        <el-form-item label="">
          <el-button type="success" size="small" @click="addFollow">添加跟进</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="followLists">
        <el-table-column label="跟进时间">
          <template slot-scope='scope'>
            <span v-text="new Date(Math.floor(scope.row.time)).toLocaleString()"></span>
          </template>
        </el-table-column>
        <el-table-column label="跟进人" prop="brokerName"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope='scope'>
            <span v-if="scope.row.type == item.value" v-for="item in followType" :key="item.value" v-text="item.label"></span>
          </template>
        </el-table-column>
        <el-table-column label="跟进内容" prop="content"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="添加跟进" :visible.sync="addFollowDialog" width="30%">
      <el-form :model="addFollowForm" label-width="100px" size="small" ref="addFollowForm">
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
          <el-select v-model="addFollowForm.brokerId" placeholder="" @change="changeBroker">
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进时间" prop="time" :rules="{
                required :true,message:'请选择跟进时间',trigger:'blur'
              }">
          <el-date-picker v-model="addFollowForm.time" type="datetime" placeholder="选择日期时间" value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="跟进方式">
          <el-select v-model="addFollowForm.type" placeholder="">
            <el-option v-for="item in followType" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="选择房源">
          <el-button type="primary" @click="getHouseList();houseDialog=true" size="mini">选择线上房源</el-button>
        </el-form-item>
        <el-form-item label="跟进房源"  prop="houseName" :rules="{
                required :true,message:'请选择或输入房源信息',trigger:'blur'
              }">
          <el-input v-model="addFollowForm.houseName" placeholder="请选择或输入房源信息" ></el-input>
        </el-form-item> -->

        <el-form-item label="跟进内容">
          <el-input v-model="addFollowForm.content" placeholder="请输入跟进内容" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveDataAddFollow()">添加</el-button>
          <el-button type="" @click="addFollowDialog= false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 附加搜索 -->
    <el-dialog title="附加搜索" :visible.sync="extendDialog" width="80%">
      <el-form :model="extendForm" :inline="true" size="small">
        <el-form-item label="">
          <el-input v-model="extendForm.cell" placeholder="请输入小区名" class="w10"></el-input>
          小区
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="extendForm.build" placeholder="请输入楼区信息" class="w10"></el-input>
          楼（座、栋）
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="extendForm.unit" placeholder="请输入单元信息" class="w10"></el-input>
          单元
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="extendForm.floor" placeholder="请输入楼层信息" class="w10"></el-input>
          层
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="extendForm.number" placeholder="请输入房间信息" class="w10"></el-input>
          室
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="extendSearch">搜索</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button type="" @click="extendForm={}; extendSearch()">重置</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

  </el-main>
</template>

<script>
  import url from "@/utils/url";
  import house3 from "./house3list"; //租房列表组件
  import newList from "./newList";
  import house2View from "./house2View"; //二手房详情弹窗
  import down2 from "./downHouse2";
  let tempForm = JSON.stringify({
    type: 1,
    content: "",
    brokerId: "",
    time: new Date().getTime()
  });
  export default {
    components: {
      house3,
      newList,
      house2View,
      down2
    },
    data() {
      return {
        BASE_API: process.env.BASE_API,
        extendForm: {}, //附加 信息搜索
        downHouseLists: false, //下架列表
        dialogVisible: false,
        form1: {
          rent: [],
          proportion: []
        },
        lists1: [],
        lists2: [],
        listsNew: [],
        count: {}, //房源总数
        qrcodeDialog: false,
        house2Id: "5af182760f790e18540e5b12", //详情ID
        qrPath: "",
        followHouseDialog: false,
        addFollowDialog: false,
        followLists: [],
        followHouseId: "", //关联房源 跟进房源ID
        followHouseName: "",
        followType: [{
            label: "勘察",
            value: 1
          },
          {
            label: "接待",
            value: 2
          },
          {
            label: "其他",
            value: 3
          },
          {
            label: "完成",
            value: 0
          }
        ],
        addFollowForm: JSON.parse(tempForm),
        brokerLists: [],
        extendDialog: false,
      };
    },
    mounted() {
      this.getHouseNum();
      this.getHouseLists2();
      this.setBrokerName();
      // this.getBrokerList()
    },
    methods: {
      //添加附加搜索
      extendSearch(){
        this.getHouseLists2(this.extendForm)
        this.extendDialog = false;
        this.extendForm={}
      },
      setBrokerName() {
        if (this.getBroker()) {
          this.addFollowForm.brokerId = this.getBroker();
        }
      },
      ItemFollowHouse(data) {
        this.followLog(data._id, data.name);
      },
      saveDataAddFollow() {
        let data = this.addFollowForm;
        data.houseName = this.followHouseName;
        data.houseId = this.followHouseId;
        this.$refs["addFollowForm"].validate(valid => {
          if (!valid) {
            return;
          }
          if (!data.hasOwnProperty("brokerName")) {
            this.changeBroker(data.brokerId);
          }
          console.log("data :", data);
          // return;
          url.post("/addFollow", data).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.addFollowDialog = false;
              this.followLog(this.followHouseId);
              this.addFollowForm = JSON.parse(tempForm);
              this.setBrokerName()
              // this.$refs["addFollowForm"].resetField();
            }
          });
        });
      },
      // 选择改变经纪人
      changeBroker(res) {
        this.brokerLists.forEach(item => {
          if (item._id == res) {
            this.addFollowForm.brokerName = item.brokerInfo.brokerName;
            return;
          }
        });
      },
      addFollow() {
        this.addFollowDialog = true;
        this.getBrokerList();
      },
      getBrokerList() {
        url.post("/brokerLists").then(res => {
          this.brokerLists = res.data;
        });
      },
      //显示房源跟进记录
      followLog(_id, name) {
        console.log("_id :", _id);
        console.log("name :", name);
        this.followHouseId = _id;
        this.followHouseName = name;
        url.get("/houseFollowLog/" + _id).then(res => {
          console.log(res.data);
          this.followLists = res.data;
          this.followHouseDialog = true;
        });
      },
      search() {
        console.log(this.form1);
        this.getHouseLists2(this.form1);
      },
      getHouseLists2(conditions) {
        url.post("/house2Lists", conditions).then(res => {
          this.lists2 = res.data;
        });
      },
      // 获取二维码
      qrCodeEvent(data) {
        console.log("data :", data);
        this.showQrcode(data._id, data.houseType);
      },
      showQrcode(_id, houseType = 2) {
        console.log("houseType :", houseType);
        console.log("typeof houseType :", typeof houseType);
        let page = "";
        switch (houseType) {
          case 1:
            page = "pages/newDetail";
            break;
          case 3:
            page = "pages/rentDetail";
            break;
          default:
            page = "pages/oldDetail";
            break;
        }
        console.log("page :", page);
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });

        let data = {};
        data.uid = this.getBroker();
        data.houseId = _id;
        data.page = page;
        console.log("data :", data);
        url.post("/mini/getshareMoments", data).then(res => {
          console.log(res);
          if (res.data.length > 0) {
            this.qrPath = res.data;
            loading.close();
            this.qrcodeDialog = true;
          }
        });
      },

      // 获取房源数量
      getHouseNum() {
        url.get("/houseCount").then(res => {
          this.count = res.data;
        });
      },
      //下架二手房
      downHouse2(id) {
        this.$confirm("此操作将下架该房源, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            url.delete(`/house2/${id}`).then(res => {
              let code = res.data.code;
              if (code == 1) {
                this.$message({
                  type: "success",
                  message: "下架成功!"
                });
                this.getHouseLists2();
              } else {
                this.$message({
                  type: "success",
                  message: "网络错误!"
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消下架"
            });
          });
        return;
      },
      //修改二手房
      editHouse2(id) {
        this.$router.push(`/House/add2/${id}`);
      },
      viewHouse2Info(id) {
        this.house2Id = id;
        this.dialogVisible = true;
      },

      getHouseListsNew() {
        url.get("/houseNew").then(res => {
          this.listsNew = res.data;
        });
      }
    },
    watch: {
      downHouseLists(res) {
        if (res == false) {
          this.getHouseLists2();
        }
      }
    }
  };

</script>

<style scoped>


</style>
