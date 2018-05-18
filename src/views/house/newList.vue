<template>
  <div>
    <!-- 新房列表 -->
    <el-form :model="formNew" :inline="true">
          <!-- <el-form-item label="关键词">
            <el-input v-model="formNew.keyword" placeholder="可搜索编号、名称"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary">搜索</el-button> -->
          <!-- </el-form-item> -->
          <el-form-item label=""  v-if="!this.isBroker()">
            <el-button type="" @click="downHouseLists = true">下架列表</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="listNew">
          <el-table-column label="编号" prop="code"></el-table-column>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="参考价格" prop="rent">
            <template slot-scope='scope'>
               <span v-text="scope.row.rent +'万元'"></span>
            </template>
          </el-table-column>
                    <el-table-column label="添加时间">
            <template slot-scope='scope'>
               <span v-text="`${new Date(scope.row.time).toLocaleString()}`"></span>
            </template>
          </el-table-column>
          <el-table-column label="户型">
            <template slot-scope='scope'>
               <span v-for="(item,index) in  scope.row.houseType" :key="index"> {{item.name}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" min-width="200px"  v-if="!this.isBroker()">
            <template slot-scope="scope">
              <el-button type="primary" size="mini"  @click="editHouse(scope.row._id)">修改</el-button>
              <el-button type="" size="mini" @click="viewHouseInfo(scope.row._id)">详情</el-button>
              <el-button type="danger" size="mini" @click="downHouse(scope.row._id)">下架</el-button>
            </template>
          </el-table-column>
        </el-table>
                <el-dialog
        title="下架列表"
        :visible.sync="downHouseLists">
          <downHouse2 :status="downHouseLists" :houseType="1"></downHouse2>
        </el-dialog>
        <el-dialog   
          title="房源信息"
          :visible.sync="dialogVisible"
          width="400px"
          >
          <houseView :houseId = "houseId"></houseView>
          </el-dialog>
  </div>
</template>

<script>
import houseView from "./houseView"; //二手房详情弹窗
import downHouse2 from "./downHouse2";

import url from "@/utils/url";
export default {
  components:{
    downHouse2,
    houseView,
  },
  data() {
    return {
      dialogVisible: false,
      downHouseLists: false,
      formNew: {},
      listNew: [],
      houseId: "",
    };
  },
  mounted() {
    this.getHouseNewList();
  },
  methods: {
    // 查看新房楼盘详细信息
    viewHouseInfo(id) {
      this.houseId = id;
      this.dialogVisible = true;
    },
      //下架出租房
    downHouse(id) {
      this.$confirm("此操作将下架该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          url.delete(`/houseNew/${id}`).then(res => {
            let code = res.data.code;
            if (code == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getHouseNewList();
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
        //修改信息
    editHouse(id) {
      this.$router.push(`/House/addNew/${id}`);
    },
    getHouseNewList() {
      url.get("/houseNew").then(res => {
        this.listNew = res.data;
      });
    }
  },
  watch: {
    downHouseLists(res) {
      if (res == false) {
        this.getHouseNewList();
      }
    }
  }
};
</script>

<style scoped>
</style>