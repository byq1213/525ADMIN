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
         <el-table-column label="操作" prop="">
           <template slot-scope="scope">
             <router-link :to="`edit/${scope.row._id}`">
              <el-button type="primary" size="mini" @click="editBroker">修改</el-button>
            </router-link>
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
    //修改
    editBroker(){

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