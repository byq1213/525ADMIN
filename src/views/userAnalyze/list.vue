<template>
  <div>
    <!-- 用户分析 -->
    <el-main>
      <el-form :model="form" :inline="true">
        <el-form-item label=""></el-form-item>
      </el-form>
      <el-table :data="lists">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="所属经纪人" prop="broker"></el-table-column>
        <el-table-column label="需求" prop="demand"></el-table-column>
        <el-table-column label="访问" prop="issued"></el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script> 
  export default {
    data() {
      return {
        lists: [],
      }
    },
  }
</script>

<style scoped>

</style>