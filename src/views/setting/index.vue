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
          <el-upload
            class="avatar-uploader"
            :action="`${BASE_API}uploadFile`"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="this.getcsrf()">
            <img v-if="form.logo" :src="`${BASE_API}/uploads/${form.logo}`" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
      BASE_API: process.env.BASE_API,
      form: {
        logo:''
      }
    };
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      this.form.logo = response.files[0];
      console.log(this.form.logo);
      
    },
        // 头像限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getStoreInfo() {
      url.get("/store").then(res => {
        this.form = res.data.info;
      });
    },
    updateStoreInfo() {
      url.post("/store", this.form).then(res => {
        if(res.data.code){
          this.$message({
            type:'success',
            message:'保存成功'
          })
        }
      });
    }
  }
};
</script>

<style scoped>
</style>