<template>
  <div>
    <!-- 新房列表 -->
    <el-form :model="formNew" :inline="true">
          <el-form-item label="关键词">
            <el-input v-model="formNew.keyword" placeholder="可搜索编号、名称"></el-input>
          </el-form-item>
          <el-form-item label="出租类型" >
            <el-select v-model="formNew.type" class="w10" placeholder="">
              <el-option label="整租" value="1"></el-option>
              <el-option label="合租" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="listNew">
          <el-table-column label="编号" prop="code"></el-table-column>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="租金" prop="rent"></el-table-column>
          <el-table-column label="面积" prop="proportion"></el-table-column>
          <el-table-column label="类型" >
            <template slot-scope="scope">
              <span v-if="scope.row.type">合租</span>
              <span v-else>整租</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="200px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini">修改</el-button>
              <el-button type="" size="mini">详情</el-button>
              <el-button type="danger" size="mini">下架</el-button>
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
import url from '@/utils/url'
  export default {
    data() {
      return {
        formNew:{},
        listNew:[]
      }
    },
    mounted(){
      this.getHouseNewList()
    },
    methods: {
      getHouseNewList() {
        url.get('/houseNew')
          .then(res =>{
            console.log(res);
            
          })
      }
    },
  }
</script>

<style scoped>

</style>