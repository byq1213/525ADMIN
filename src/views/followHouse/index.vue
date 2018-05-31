<template>
  <div>
    <!-- 跟进列表 -->
    <el-main>
      <el-form :model="form" :inline="true">
        <el-form-item label="跟进时间">
          <el-date-picker v-model="form.time" type="datetimerange" :picker-options="this.$store.state.app.pickerOptions" range-separator="至"
            value-format="timestamp" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="经纪f人" v-if="this.isBroker()">
            <el-select v-model="this.getBroker()" placeholder="" disabled="">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="经纪人">
          <el-select v-model="form.brokerId" placeholder="">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.keyword" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="getFollowLists()">查询</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button type="success" @click="AddFollowDialog=true">添加跟进</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="lists">
        <el-table-column label="跟进时间">
          <template slot-scope='scope'>
            <span v-text="new Date(Math.floor(scope.row.time)).toLocaleString()"></span>
          </template>
        </el-table-column>
        <el-table-column label="经纪人" prop="brokerName"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope='scope'>
            <span v-if="scope.row.type == item.value" v-for="item in followType" :key="item.value" v-text="item.label"></span>
          </template>
        </el-table-column>
        <el-table-column label="相关房源" prop="houseName"></el-table-column>
        <el-table-column label="跟进内容" prop="content">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="count" @current-change="changePage" :page-size="limit">
        </el-pagination>
      </div>
      <el-dialog title="添加跟进" :visible.sync="AddFollowDialog" width="30%">
        <el-form :model="addForm" label-width="100px" size="small" ref="addFollowForm">
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
            <el-select v-model="addForm.brokerId" placeholder="" @change="changeBroker">
              <el-option label="请选择" value=""></el-option>
              <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="跟进时间" prop="time" :rules="{
                required :true,message:'请选择跟进时间',trigger:'blur'
              }">
            <el-date-picker v-model="addForm.time" type="datetime" placeholder="选择日期时间" value-format="timestamp">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="跟进方式">
            <el-select v-model="addForm.type" placeholder="">
              <el-option v-for="item in followType" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择房源">
            <el-button type="primary" @click="getHouseList();houseDialog=true" size="mini">选择线上房源</el-button>
          </el-form-item>
          <el-form-item label="跟进房源" prop="houseName" :rules="{
                required :true,message:'请选择或输入房源信息',trigger:'blur'
              }">
            <el-input v-model="addForm.houseName" placeholder="请选择或输入房源信息"></el-input>
          </el-form-item>

          <el-form-item label="跟进内容">
            <el-input v-model="addForm.content" placeholder="请输入跟进内容" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="saveDataADD()">添加</el-button>
            <el-button type="" @click="AddFollowDialog= false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="跟进房源" :visible.sync="houseDialog" width="40%">
        <el-tabs>
          <el-tab-pane label="二手房">
            <el-table :data="house2Lists" size='mini'>
              <el-table-column label="编号" prop="code"></el-table-column>
              <el-table-column label="房源" prop="name"></el-table-column>
              <el-table-column>
                <template slot-scope='scope'>
                  <el-button type="primary" size="mini" @click="chooseHouse(scope.$index,2)">选择</el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-tab-pane>
          <el-tab-pane label="租房">
            <el-table :data="house3Lists" size='mini'>
              <el-table-column label="编号" prop="code"></el-table-column>
              <el-table-column label="房源" prop="name"></el-table-column>
              <el-table-column>
                <template slot-scope='scope'>
                  <el-button type="primary" size="mini" @click="chooseHouse(scope.$index,3)">选择</el-button>
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
  import AddFollow from "@/views/followHouse/add";
  let tempForm = {
    type: 1,
    content: "",
    brokerId: "",
    time: new Date().getTime()
  };
  export default {
    components: {
      AddFollow
    },
    mounted() {
      this.getBrokerList();
      this.getFollowLists();
      if (this.getBroker()) {
        this.addForm.brokerId = this.getBroker();
      }
    },
    data() {
      return {
        lists: [],
        form: {
          brokerId: "",
          time: []
        },
        brokerLists: [],
        AddFollowDialog: false,
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
        houseDialog: false,
        house2Lists: [],
        house3Lists: [],
        houseInfo: {},
        addForm: tempForm,
        count: 0,
        limit: this.$store.state.app.limit,
        skip: 0
      };
    },
    methods: {
      // 添加新的跟进
      saveDataADD() {
        let data = this.addForm;
        this.$refs["addFollowForm"].validate(valid => {
          if (!valid) {
            return;
          }
          if (!data.hasOwnProperty("brokerName")) {
            this.changeBroker(data.brokerId);
          }
          url.post("/addFollow", data).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.AddFollowDialog = false;
              this.getFollowLists();
              this.addForm = tempForm;
              this.$refs["addFollowForm"].resetField();
            }
          });
        });
      },
      // 选择改变经纪人
      changeBroker(res) {
        this.brokerLists.forEach(item => {
          if (item._id == res) {
            this.addForm.brokerName = item.brokerInfo.brokerName;
            return;
          }
        });
      },
      // 选择房源 关联房源信息到 addform
      chooseHouse(index, houseType) {
        let houseInfo = this[`house${houseType}Lists`][index];
        this.addForm.houseName = houseInfo.name;
        this.addForm.houseId = houseInfo._id;
        this.addForm.houseType = houseType;
        this.houseDialog = false;
      },
      // 获取二手房租房列表
      getHouseList() {
        url.get("/follow/getHouseList").then(res => {
          this.house2Lists = res.data.house2Lists;
          this.house3Lists = res.data.house3Lists;
        });
      },
      // 获取跟进房源列表
      getFollowLists(skip = this.skip, limit = this.limit) {
        let conditions = this.form;
        url
          .post("/getFollowLists", {
            conditions,
            limit: limit,
            skip: skip * limit
          })
          .then(res => {
            this.lists = res.data.lists;
            this.count = res.data.count;
          });
      },
      // 获取经纪人信息
      getBrokerList() {
        url.post("/brokerLists").then(res => {
          this.brokerLists = res.data;
        });
      },

      changePage(page) {
        this.getFollowLists(page - 1);
      }
    }
  };

</script>

<style scoped>


</style>
