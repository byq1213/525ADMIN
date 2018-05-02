<template>
  <div>
    <!-- 经纪人列表
     -->
     <el-main>
       <el-table :data="lists">
         <el-table-column label="工作照" prop="img"></el-table-column>
         <el-table-column label="经纪人姓名" prop="name"></el-table-column>
         <el-table-column label="联系方式" prop="phone"></el-table-column>
         <el-table-column label="操作" prop="">
           <template slot-scope="scope">

           <el-button type="primary" size="mini" >修改</el-button>
           </template>
         </el-table-column>
       </el-table>
     </el-main>
  </div>
</template>

<script>
import url from '@/utils/url'
export default {
  data() {
    return {
      lists: [{

      }]
    };
  },
  mounted(){
    this.getLists()
  },
  methods: {
    getLists() {
      url.get('/broker')
        .then(res=>{
          this.lists = res.data.data
          
        })
    }
  }
};
</script>

<style scoped>

</style>