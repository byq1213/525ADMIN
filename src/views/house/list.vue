<template>
  <el-main>
    <!-- 房源列表 -->
    <el-tabs type="card">
      <el-tab-pane label="租房信息" >
        <el-form :model="form1" :inline="true">
          <el-form-item label="关键词">
            <el-input v-model="form1.keyword" placeholder="可搜索编号、名称"></el-input>
          </el-form-item>
          <el-form-item label="出租类型" >
            <el-select v-model="form1.type" class="w10" placeholder="">
              <el-option label="整租" value="1"></el-option>
              <el-option label="合租" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="lists1">
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
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import url from "@/utils/url";
export default {
  data() {
    return {
      form1:{},
      lists1: []
    };
  },
  mounted() {
    this.getHouseLists1();
  },
  methods: {
    getHouseLists1() {
      url.get("/house").then(res => {
        this.lists1 = res.data;
      });
    }
  }
};
</script>

<style scoped>

</style>