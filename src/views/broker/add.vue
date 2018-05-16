<template>
  <div>
    <!-- 添加经纪人 -->
    <el-main>
      <!-- 亦或 扫码登陆小程序指定页面进行获取用户信息 -->
      <el-form :model="form" label-width="100px">
        <el-form-item v-if="!isEdit" label="选择用户">
          <el-button type="success" @click="showUserLists"> 选择用户</el-button>
        </el-form-item>
        <el-form-item label="经纪人注册ID">
          <el-input v-model="changeUser._id" placeholder="" disabled="" class="w20"></el-input>
        </el-form-item>
        <el-form-item label="经纪人微信昵称">
          <el-input v-model="changeUser.nickName" placeholder="" disabled="" class="w20"></el-input>
        </el-form-item>
        <el-form-item label="经纪人姓名">
          <el-input v-model="form.brokerName" placeholder="请输入经纪人姓名" class="w20"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.brokerPhone" placeholder="请输入联系方式" class="w20"></el-input>
        </el-form-item>
        <el-form-item label="工作照">
          <el-upload
            class="avatar-uploader"
            :action="`${BASE_API}uploadFile`"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.brokerAvatarUrl" :src="`${BASE_API}/uploads/${form.brokerAvatarUrl}`" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="form.brokerPwd" type="password" placeholder="" class="w20"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button type="" @click="saveData">保存</el-button>
        </el-form-item>
      </el-form>
      <el-dialog 
      title="已注册用户信息"
      :visible.sync="userListDialog"
      >
        <el-table :data="userLists" size="small">
          <el-table-column label="专属用户ID" prop="_id"></el-table-column>
          <el-table-column label="头像" prop="avatarUrl">
            <template slot-scope='scope'>
               <img :src="scope.row.avatarUrl" alt="" class="avatarUrl">
            </template>
          </el-table-column>
          <el-table-column label="昵称" prop="nickName"></el-table-column>
          <el-table-column label="是否为经纪人" prop="">
            <template slot-scope='scope'>
               <span v-if="scope.row.isBroker">是</span>
               <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column label="注册时间">
            <template slot-scope='scope'>
              <!-- <span v-text="scope.row.reg"></span> -->
               <span v-text="new Date(Math.floor(scope.row.regTime)  ).toLocaleString()"></span>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" prop="phone"></el-table-column>
          <el-table-column label="操作" prop="">
            <template slot-scope='scope'>
               <el-button type="primary"  size="mini" @click="chooseUser(scope.$index)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";
export default {
  mounted() {
    this.editInfo()
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      form: {
        brokerAvatarUrl: ""
      },
      userListDialog: false, //用户信息弹窗
      userLists: [],
      changeUser: {}, //选中用户信息
      brokerId:'',
      isEdit:0,
    };
  },
  methods: {
    //修改经纪人信息
    editInfo(){
      let fullPath = this.$route.fullPath;
      let fullPathArr = fullPath.split('/')
      if(fullPathArr[2] == 'edit'){
        this.isEdit = 1;
        // 获取经纪人信息
        let brokerId = this.brokerId = this.$route.params.id
        url.get(`/broker/${brokerId}`).then(res=>{
          console.log(res);
          let data = res.data.data
          this.form = data.brokerInfo;
          this.changeUser = data
        })
      }
    },
    saveData() {
      let data = {
        _id:this.changeUser._id,
        brokerInfo: this.form
      }
      url.post(`/broker/`, data).then(res => {
        console.log(res.data);
      });
    },
    showUserLists() {
      // 选择用户弹出 已注册用户信息
      this.userListDialog = true;
    },
    getUserLists() {
      url.get("/users").then(res => {
        this.userLists = res.data.userList;
      });
    },
    // 选择某个用户
    chooseUser(index) {
      this.changeUser = this.userLists[index];
      this.userListDialog = false;
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
    // 上传成功
    uploadSuccess(response, file, fileList) {
      this.form.brokerAvatarUrl = response.files[0];
    }
  },
  watch: {
    userListDialog(res) {
      if (res && this.userLists.length == 0) {
        this.getUserLists();
      }
    }
  }
};
</script>

<style scoped>

</style>
