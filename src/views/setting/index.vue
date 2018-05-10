<template>
  <div>
    <!-- 页面设置 店铺名称 -->
    <el-main>
      <el-form :model="form" label-width="100px">
        <el-form-item label="店铺名称">
          <el-input v-model="form.storeName" class="w20" placeholder="请输入店铺名称"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.storePhone" class="w20" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="店铺LOGO">
          <el-input v-model="form.LOGO" class="w20" placeholder="请输入店铺名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="success" @click="updateStoreInfo">保存</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";

export default {
  mounted() {
    this.getStoreInfo();
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    getStoreInfo() {
      url.get("/store").then(res => {
        this.form = res.data.info;
      });
    },
    updateStoreInfo(){
      url.post("/store",this.form)
        .then(res =>{
          console.log(res);
          
        })
    }
  }
};
</script>

<style scoped>

</style>