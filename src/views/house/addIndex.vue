<template>
  <el-main>
    <!-- 添加房源INDEX -->
    <el-card class="body">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card>
            <router-link :to="'addNew'">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fangzi"></use>
            </svg>
            <p>添加新房</p>
            </router-link>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <router-link :to="'add2'">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-loufang1"></use>
            </svg>
            <p>添加二手房</p>
            </router-link>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <router-link :to="'add3'">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-loufang"></use>
            </svg>
            <p>添加租房</p>
            </router-link>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </el-main>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
  }
</script>

<style scoped>
.body{
  text-align: center;
}
</style>