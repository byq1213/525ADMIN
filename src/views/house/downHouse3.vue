<template>
  <div>
    <el-table :data="lists" size="small">
      <el-table-column label="房源编号" prop="code"></el-table-column>
      <el-table-column label="房源名称" prop="name"></el-table-column>
      <el-table-column label="房源操作">
        <template slot-scope='scope'>
           <el-button type="primary" size="mini" @click="reshelf(scope.row._id)">重新上架</el-button>
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
    houseType:{
      type:Number,
      default:1000,
    }
  },
  mounted() {
    console.log(this.$props.houseType);
    
  },
  data() {
    return {
      lists: []
    };
  },
  methods: {
    getHouse2DownLists() {
      url.get("/downHouse2").then(res => {
        this.lists = res.data;
      });
    },
    reshelf(id) {
      url.get("/reHouse2/" + id).then(res => {
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