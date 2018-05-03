<template>
  <div>
    <!-- 访问量 -->
    <el-main>
      <el-form :model="form" :inline="true">
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
      </el-form>
      <el-table :data="lists">
        <el-table-column label="头像"></el-table-column>
        <el-table-column label="昵称"></el-table-column>
        <el-table-column label="电话"></el-table-column>
        <el-table-column label="访问时间"></el-table-column>
        <el-table-column label="访问房源"></el-table-column>
        
      </el-table>
    </el-main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          type:'0'
        },
        lists:[],
        
      }
    },
  }
</script>

<style scoped>

</style>