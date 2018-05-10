<template>
  <div>
    <!-- 经纪人成交房源列表 -->
    <el-main>
      <el-table :data="lists">
        <el-table-column label="经纪人姓名" prop=""></el-table-column>
        <el-table-column label="成交时间" prop=""></el-table-column>
        <el-table-column label="房源" prop=""></el-table-column>
        <el-table-column label="房源类型" prop=""></el-table-column>
        <el-table-column label="房源图片" prop=""></el-table-column>
        <el-table-column label="房源价格" prop=""></el-table-column>
        <el-table-column label="备注" prop=""></el-table-column>
        <el-table-column label="操作" prop=""></el-table-column>

      </el-table>
    </el-main>
  </div>
</template>

<script>
import url from '@/utils/url'

  export default {
    mounted(){
      this.getFinishLists()
    },
    data() {
      return {
        lists:[]
      }
    },
    methods:{
      getFinishLists(){
        url.get('/finish')
          .then(res =>{
            this.lists = res.data.data
          })
      }
    }
  }
</script>

<style scoped>

</style>