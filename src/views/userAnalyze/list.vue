<template>
  <div>
    <!-- 用户分析 -->
    <el-main>
      <el-form :model="form" :inline="true">
        <el-form-item label=""></el-form-item>
      </el-form>
      <el-table :data="lists">
        <el-table-column label="头像" prop="avatarUrl">
          <template slot-scope='scope'>
            <img :src="scope.row.avatarUrl" alt="" class="avatarUrl">
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="nickName"></el-table-column>
        <!-- <el-table-column label="电话" prop="phone"></el-table-column> -->
        <el-table-column label="所属经纪人" prop="brokerId">
        <template slot-scope='scope'>
          <span v-if="scope.row.brokerId" v-text="scope.row.brokerId.brokerInfo.brokerName"></span>
        </template>
        </el-table-column>
        <el-table-column label="需求" prop="demand"></el-table-column>
        <el-table-column label="访问" prop="issued"></el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script> 
import url from '@/utils/url';
  export default {
    mounted(){
      this.getUserLists()
    },
    data() {
      return {
        form:{},
        lists: [],
      }
    },
    methods:{
      getUserLists(){
        url.get('/users')
          .then(res =>{
            this.lists = res.data.data
          })
      }
    }
  }
</script>

<style scoped>

</style>