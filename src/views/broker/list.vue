<template>
  <div>
    <!-- 经纪人列表
     -->
     <el-main>
       <el-table :data="lists">
         <el-table-column label="工作照" >
           <template slot-scope='scope'>
              <img  :src="BASE_API +'uploads/' + scope.row.brokerInfo.brokerAvatarUrl" alt="" class="avatarUrl">
           </template>
         </el-table-column>
         <el-table-column label="经纪人姓名" prop="brokerInfo.brokerName"></el-table-column>
         <el-table-column label="联系方式" prop="brokerInfo.brokerPhone"></el-table-column>
         <el-table-column label="客户总量" prop="count"></el-table-column>
         <el-table-column label="操作" prop="">
           <template slot-scope="scope">
              <el-button  type="primary" size="mini" @click="editBroker(scope.row._id)">修改</el-button>
              <el-button  type="" size="mini" @click="delBroker(scope.row._id)">移除经纪人</el-button>
           </template>
         </el-table-column>
       </el-table>
     </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";
export default {
  data() {
    return {
      BASE_API: process.env.BASE_API,
      lists: []
    };
  },
  mounted() {
    this.getLists();
  },
  methods: {
    // 移除经纪人
    delBroker(id) {
      this.$confirm("确认删除经纪人？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          url.delete(`/broker/${id}`).then(res => {
            if (res.data) {
              this.getLists();
            }
            let code = res.data.code;
            if (code == 1) {
              this.$message({
                type: "success",
                message: "操作成功!"
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
            message: "已取消操作"
          });
        });
    },
    //修改
    editBroker(id) {
      this.$router.push(`edit/${id}`);
    },
    getLists() {
      url.get("/broker").then(res => {
        this.lists = res.data.data;
      });
    }
  }
};
</script>

<style scoped>
</style>