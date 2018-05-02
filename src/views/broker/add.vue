<template>
  <div>
    <!-- 添加经纪人 -->
    <el-main>
      <!-- 亦或 扫码登陆小程序指定页面进行获取用户信息 -->
      <el-form :model="form" label-width="100px">
        
        <el-form-item label="经纪人姓名">
          <el-input v-model="form.name" placeholder="请输入经纪人姓名" class="w20"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" placeholder="请输入联系方式" class="w20"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="form.password" type="password" placeholder="" class="w20"></el-input>
        </el-form-item>
        
        <el-form-item label="">
          <el-button type="">保存</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form:{}
    };
  }
};
</script>

<style scoped>

</style>