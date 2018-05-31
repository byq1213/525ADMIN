<template>
  <div>
    <!-- 设置登录密码 -->
    <el-main>
      <el-form :model="form" label-width="100px" :rules="rules" ref="settingPwd">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" placeholder="请输入旧密码" class="w20"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码" class="w20"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPassword">
          <el-input v-model="form.checkPassword" type="password" placeholder="请确认新密码" class="w20"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="saveData">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import MD5 from "md5";
import url from "@/utils/url";
export default {
  mounted() {
    let test = MD5("message");
    console.log("test :", test);
  },
  data() {
    let validatePass = (rule, value, cb) => {
      if (value == "") {
        cb(new Error("请输入新密码"));
      } else {
        if (this.form.checkPassword !== "") {
          this.$refs.settingPwd.validateField("checkPassword");
        }
        cb();
      }
    };
    let validatePass2 = (rule, value, cb) => {
      if (value == "") {
        cb(new Error("请再次输入密码"));
      } else if (value !== this.form.newPassword) {
        cb(new Error("两次输入面不一致！"));
      } else {
        cb();
      }
    };
    return {
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      },
      form: {}
    };
  },
  methods: {
    saveData() {
      this.$refs["settingPwd"].validate(valid => {
        if (valid) {
          console.log("this.form :", this.form);
          let data = {
            oldPwd: MD5(this.form.oldPassword),
            newPwd: MD5(this.form.newPassword)
          };
          console.log("data :", data);

          url.post("/changePwd", data).then(res => {
            let { code } = res.data;
            if (code == 10002) {
              this.$message({
                type: "success",
                message: "设置密码成功"
              });
              this.form = {};
            } else if (code == 10001) {
              this.$message.error("原始密码不一致，请认真检查");
            } else {
              this.$message({
                type: "warning",
                message: "网络错误"
              });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "请认真填写"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>