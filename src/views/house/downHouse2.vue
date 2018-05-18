<template>
  <div>
    <el-table :data="lists" size="small">
      <el-table-column label="房源编号" prop="code"></el-table-column>
      <el-table-column label="房源名称" prop="name"></el-table-column>
      <el-table-column label="房源操作">
        <template slot-scope='scope'>
           <el-button type="primary" size="mini" @click="reshelf(scope.row._id)">重新上架</el-button>
           <el-button type="" size="mini" @click="delHouse(scope.row._id)">彻底删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import url from "@/utils/url";
export default {
  props: {
    status: {
      type: Boolean
    },
    houseType: {
      type: Number,
      default: 2
    }
  },
  mounted() {
    this.getHouse2DownLists();
  },
  data() {
    return {
      lists: []
    };
  },
  methods: {
    getHouse2DownLists() {
      url.get("/downHouse" + this.$props.houseType).then(res => {
        this.lists = res.data;
      });
    },
    reshelf(id) {
      url.get("/reHouse" + this.$props.houseType + "/" + id).then(res => {
        let code = res.data.code;

        if (code) {
          this.$message({
            message: "上架成功",
            type: "success"
          });
          this.getHouse2DownLists();
        } else {
          this.$message({
            message: "操作失败",
            type: "success"
          });
        }
      });
    },
    delHouse(id) {
      this.$confirm("此操作将彻底删除房源信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          url.get("/rmHouse" + this.$props.houseType + "/" + id).then(res => {
            let code = res.data.n;
            if (code == 1) {
              this.$message({
                type: "success",
                message: "房源已彻底删除!"
              });
              // this.getHouseLists2();
              this.getHouse2DownLists()
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
            message: "操作已取消"
          });
        });
    }
  },
  watch: {
    $props: {
      handler(newValue, oldValue) {
        this.getHouse2DownLists();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
</style>