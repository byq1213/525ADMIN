<template>
  <div>
    <!-- 访问量 -->
    <el-main>
      <el-form :model="form" :inline="true" >
        <el-form-item label="时间段查询">
          <el-date-picker
            v-model="form.birthday"
            type="datetimerange"
            :picker-options="this.$store.state.app.pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            >
          </el-date-picker>
          </el-form-item>
          <el-form-item label="房源类型">
            <el-select v-model="form.type" placeholder="">
              <el-option value="0" label="全部"></el-option>
              <el-option v-for="(item,index) in this.$store.state.app.houseType"
               :key="index" 
               :value="item.value"
               :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary">查询</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="warning">删除浏览记录</el-button>
          </el-form-item>
      </el-form>
      <el-table :data="lists" border>
        <el-table-column label="头像" prop="uid.avatarUrl">
          <template slot-scope='scope'>
             <img :src="scope.row.uid.avatarUrl" class="avatarUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="uid.nickName"></el-table-column>
        <!-- <el-table-column label="电话" prop="uid.phone"></el-table-column> -->
        <el-table-column label="访问时间" prop="">
          <template slot-scope='scope'>
             <span v-text="scope.store.table.timetrans(scope.row.time)"></span>
          </template>
        </el-table-column>
        <el-table-column label="访问房源" prop="houseName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope='scope'>
            <el-button type="" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";

export default {
  mounted() {
    this.getViewsLists();
  },
  data() {
    return {
      form: {
        type: "0"
      },
      lists: []
    };
  },
  methods: {
    getViewsLists() {
      url.get("/views").then(res => {
        this.lists = res.data.lists;
      });
    }
  }
};
</script>

<style scoped>

</style>