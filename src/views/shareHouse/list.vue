<template>
  <el-main>
    <!-- 房源列表 -->
    <el-tabs type="card" >

      <el-tab-pane>
        <span slot="label">
          二手房
          <el-badge :value="lists2.length" class="item">
          </el-badge>
          </span>
        <el-form :model="form1" :inline="true">
          <!-- <el-form-item label="关键词">
            <el-input v-model="form1.keyword" placeholder="可搜索编号、名称"></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary">搜索</el-button>
          </el-form-item> -->
          <!-- <el-form-item label=""  v-if="!this.isBroker()">
            <el-button type="" @click="downHouseLists = true">下架列表</el-button>
          </el-form-item> -->
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
          <!-- <el-table-column label="类型" >
            <template slot-scope="scope">
              <span v-if="scope.row.type">合租</span>
              <span v-else>整租</span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" min-width="200px" v-if="!this.isBroker()">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editHouse2(scope.row._id)">修改</el-button>
              <el-button type="" size="mini" @click="viewHouse2Info(scope.row._id)">详情</el-button>
              <el-button type="success" size="mini" @click="downHouse2(scope.row._id,2)">上架</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane >
       <span slot="label">
          租房
          <el-badge :value="lists3.length" class="item">
          </el-badge>
          </span>
        <!-- <house3></house3> -->
        <el-table :data="lists3">
          <el-table-column label="编号" prop="code"></el-table-column>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="租金" prop="rent">
            <template slot-scope='scope'>
               <span v-text="`${scope.row.rent}元/月`"></span>
            </template>
          </el-table-column>
           <el-table-column label="面积" prop="proportion">
            <template slot-scope='scope'>
               <span v-text="`${scope.row.proportion}㎡`"></span>
            </template>
          </el-table-column>
           <el-table-column label="类型" >
            <template slot-scope="scope">
              <span v-if="scope.row.type">合租</span>
              <span v-else>整租</span>
            </template>
          </el-table-column>
          <el-table-column label="添加时间">
            <template slot-scope='scope'>
               <span v-text="`${new Date(scope.row.time).toLocaleString()}`"></span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="200px"  v-if="!this.isBroker()">
            <template slot-scope="scope">
              <el-button type="primary" size="mini"  @click="editHouse3(scope.row._id)">修改</el-button>
              <el-button type="" size="mini" @click="viewHouse3Info(scope.row._id)">详情</el-button>
              <el-button type="success" size="mini" @click="downHouse2(scope.row._id,3)">上架</el-button>
            </template> 
          </el-table-column>
        </el-table>
      </el-tab-pane>
      
    </el-tabs>
        <el-dialog   
    title="房源信息"
    :visible.sync="dialogVisible"
    width="400px"
    >
    <house2View :house2Id="house2Id"></house2View>
          <house3View :house3Id = "house3Id"></house3View>
    </el-dialog>
    <el-dialog
    title="下架列表"
    :visible.sync="downHouseLists">
      <down2 :status="downHouseLists"></down2>
    </el-dialog>
  </el-main>
</template>

<script>
import url from "@/utils/url";
import house3 from "./house3list"; //租房列表组件
import house2View from "./house2View"; //二手房详情弹窗
import house3View from './house3View';

export default {
  components: {
    house3,
    house2View,
    house3View
  },
  data() {
    return {
      downHouseLists: false, //下架列表
      dialogVisible: false,
      form1: {},
      lists1: [],
      lists2: [],
      lists3:[],
      house3Id:'',
      listsNew: [],
      count: {}, //房源总数
      house2Id: "5af182760f790e18540e5b12" //详情ID
    };
  },
  mounted() {
    this.getHouseLists2();
    this.getHouseLists3()
  },
  methods: {
        // 租房
    getHouseLists3() {
      url.post("/sharehouse3List").then(res => {
        this.lists3 = res.data;
      });
    },
        //修改信息
    editHouse3(id) {
      this.$router.push(`/House/add3/${id}`);
    },
        // 查看出租房详细信息
    viewHouse3Info(id) {
      this.house3Id = id;
      this.dialogVisible = true;
    },
    // // 获取房源数量
    // getHouseNum() {
    //   url.get("/houseCount").then(res => {
    //     this.count = res.data;
    //   });
    // },
    //上架二手房
    downHouse2(id,type) {
      this.$confirm("此操作将上架该房源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //shareHouse2Up/5b013da0ab37b049e01222ce
          url.get(`/shareHouse${type}Up/${id}`).then(res => {
            let code = res.data;
            if (code == 1) {
              this.$message({
                type: "success",
                message: "上架成功!"
              });
              // this.getHouseLists2();
              this['getHouseLists'+type]();
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

    getHouseLists2() {
      url.post("/sharehouse2List").then(res => {
        this.lists2 = res.data;
      });
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