<template>
  <div>
    <!-- 租房列表 -->
            <el-form :model="form" :inline="true">
          <!-- <el-form-item label="关键词">
            <el-input v-model="form.keyword" placeholder="可搜索编号、名称"></el-input>
          </el-form-item>
          
          <el-form-item label="">
            <el-button type="primary">搜索</el-button>
          </el-form-item> -->
          <el-form-item label=""  v-if="!this.isBroker()">
            <el-button type="" @click="downHouseLists = true">下架列表</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="lists">
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
              <el-button type="danger" size="mini" @click="downHouse(scope.row._id)">下架</el-button>
            </template> 
          </el-table-column>
        </el-table>
        <el-dialog
        title="下架列表"
        :visible.sync="downHouseLists">
          <downHouse2 :status="downHouseLists" :houseType="3"></downHouse2>
        </el-dialog>
        <el-dialog   
          title="房源信息"
          :visible.sync="dialogVisible"
          width="400px"
          >
          <house3View :house3Id = "house3Id"></house3View>
          </el-dialog>
  </div>
</template>

<script>
import url from "@/utils/url";
import downHouse2 from "./downHouse2";
import house3View from "./house3View";
export default {
  components: {
    downHouse2,
    house3View //获取详细信息
  },
  mounted() {
    this.getHouseLists1();
  },
  data() {
    return {
      dialogVisible: false,
      downHouseLists: false,
      form: {},
      lists: [],
      house3Id: ""
    };
  },
  methods: {
    // 查看出租房详细信息
    viewHouse3Info(id) {
      this.house3Id = id;
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
          url.delete(`/house/${id}`).then(res => {
            let code = res.data.code;
            if (code == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getHouseLists1();
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
    // 租房
    getHouseLists1() {
      url.get("/house").then(res => {
        this.lists = res.data;
      });
    },
    //修改信息
    editHouse3(id) {
      this.$router.push(`/House/add3/${id}`);
    }
  },
  watch: {
    downHouseLists(res) {
      if (res == false) {
        this.getHouseLists1();
      }
    }
  }
};
</script>

<style scoped>
</style>