<template>
  <el-main>
    <!-- 房源列表 -->
    <el-tabs type="card" >

      <el-tab-pane>
        <span slot="label">
          二手房
          <el-badge :value="count.house2" class="item">
          </el-badge>
          </span>
        <el-form :model="form1" :inline="true">
          <!-- <el-form-item label="关键词">
            <el-input v-model="form1.keyword" placeholder="可搜索编号、名称"></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary">搜索</el-button>
          </el-form-item> -->
          <el-form-item label="">
            <el-button type="" @click="downHouseLists = true">下架列表</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="lists2">
          <el-table-column label="编号" prop="code"></el-table-column>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="租金" prop="rent"></el-table-column>
          <el-table-column label="面积" prop="proportion"></el-table-column>
          <!-- <el-table-column label="类型" >
            <template slot-scope="scope">
              <span v-if="scope.row.type">合租</span>
              <span v-else>整租</span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" min-width="200px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editHouse2(scope.row._id)">修改</el-button>
              <el-button type="" size="mini" @click="viewHouse2Info(scope.row._id)">详情</el-button>
              <el-button type="danger" size="mini" @click="downHouse2(scope.row._id)">下架</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane >
                <span slot="label">
          租房
          <el-badge :value="count.house3" class="item">
          </el-badge>
          </span>

        <house3></house3>
      </el-tab-pane>
      <el-tab-pane >
                <span slot="label">
          新房
          <el-badge :value="count.house1" class="item">
          </el-badge>
          </span>

        <newList></newList>
      </el-tab-pane>
    </el-tabs>
        <el-dialog   
    title="房源信息"
    :visible.sync="dialogVisible"
    width="400px"
    >
    <house2View :house2Id="house2Id"></house2View>
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
import newList from "./newList";
import house2View from "./house2View"; //二手房详情弹窗
import down2 from "./downHouse2";

export default {
  components: {
    house3,
    newList,
    house2View,
    down2
  },
  data() {
    return {
      downHouseLists: false, //下架列表
      dialogVisible: false,
      form1: {},
      lists1: [],
      lists2: [],
      listsNew: [],
      count: {}, //房源总数
      house2Id: "5af182760f790e18540e5b12" //详情ID
    };
  },
  mounted() {
    this.getHouseNum();
    this.getHouseLists2();
  },
  methods: {
    // 获取房源数量
    getHouseNum() {
      url.get("/houseCount").then(res => {
        this.count = res.data;
      });
    },
    //下架二手房
    downHouse2(id) {
      this.$confirm("此操作将下架该文件, 是否继续?", "提示", {
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
                message: "删除成功!"
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

    getHouseLists2() {
      url.get("/house2").then(res => {
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