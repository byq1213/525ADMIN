<template>
  <el-main>
    <!-- 添加楼盘 -->
    <el-form :model="form" label-width="100px">
      <el-card class="app-item">
        <div slot="header">
          基本信息（新房）
        </div>  
      <el-form-item label="楼盘编号">
        <el-input v-model="form.code" placeholder="请输入楼盘编号" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="楼盘名称">
        <el-input v-model="form.name" placeholder="请输入楼盘名称" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="form.alias" placeholder="请输入楼盘别名" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="开发商">
        <el-input v-model="form.developers" placeholder="请输入开发商名称" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="楼盘参考价格">
        <el-input v-model="form.rent" placeholder="请输入楼盘租金" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="开盘时间">
        <el-date-picker v-model="form.openDate"
         placeholder=""
         type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="楼盘类型">
        <el-select v-model="form.scale" placeholder="">
          <el-option label="住宅" value="0"></el-option>
          <el-option label="别墅" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼盘面积">
        <el-input v-model="form.proportion" placeholder="请输入楼盘面积" class="w20">
          <template slot="append">㎡</template>
        </el-input>
      </el-form-item>
      <el-form-item label="位置">
        <el-input v-model="form.address" placeholder="请输入楼盘地址" class="w20"></el-input>
      </el-form-item>



      <!-- <el-form-item label="楼盘朝向">
        <el-input v-model="form.code" placeholder="请输入楼盘朝向" class="w20"></el-input>
      </el-form-item> -->
      <el-form-item label="楼盘标签">
        <el-tag type="">五证齐全</el-tag>
        <el-tag type="">车位重组</el-tag>
      </el-form-item>
      </el-card>
      <el-card class="app-item">
        <div slot="header">
          户型介绍
        </div>
           <div v-for="(item,index) in (form.houseType)" :key="index">
            <el-card class="app-item">
              <el-form  size="small" label-width="100px">
                <el-form-item label="户型名称">
                  <el-input v-model="item.name" placeholder="" class="w20"></el-input>
                </el-form-item>
                <el-form-item label="户型面积">
                  <el-input v-model="item.proportion" placeholder="" class="w20"></el-input>
                </el-form-item>
                <el-form-item label="户型约价">
                  <el-input v-model="item.rent" placeholder="" class="w20"></el-input>
                </el-form-item>
                <el-form-item label="户型朝向">
                  <el-input v-model="item.orientation" placeholder="" class="w20"></el-input>
                </el-form-item>
                <el-form-item label="户型上传">
                  <el-upload
                  action="http://127.0.0.1:7001/uploadFile"
                  list-type="picture-card"
                  :on-remove="houseTypeRemove"
                  :on-success="houseTypeSuccess"
                  :headers="{index}"
                  multiple=""
                    >
                  <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
            </el-card>
           </div>
      </el-card>
      <el-card class="app-item">
        <div slot="header">
          楼盘图片
        </div>
        <el-form-item label="">
          <el-upload
          action="http://127.0.0.1:7001/uploadFile"
          list-type="picture-card"
          :on-remove="uploadRemove"
          :on-success="uploadSuccess"
          multiple="">
          <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-card>
      <el-card class="app-item">
        <div slot="header">
          楼盘特色
        </div>
      <el-form-item label="产权年限">
        <el-input v-model="form.property" placeholder="请输入楼盘产权年限" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="占地面积">
        <el-input v-model="form.coveringArea" placeholder="请输入楼盘占地面积" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="规划停车位">
        <el-input v-model="form.park" placeholder="请输入楼盘规划停车位" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="物业公司">
        <el-input v-model="form.property" placeholder="请输入楼盘物业公司" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="物业费">
        <el-input v-model="form.propertyCost" placeholder="请输入楼盘物业费用" class="w20"></el-input>
      </el-form-item>
        <!-- <el-form-item label="楼盘亮点">
          <el-input v-model="form.highlight" type="textarea" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="交通出行">
          <el-input v-model="form.transport" type="textarea" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="周边配套">
          <el-input v-model="form.rim" type="textarea" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="户型介绍">
          <el-input v-model="form.housIntroduce" type="textarea" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="小区介绍">
          <el-input v-model="form.estate" type="textarea" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="坐标选择">
        </el-form-item> -->
        <el-form-item label="">
          <el-button type="" @click="saveData">保存</el-button>
        </el-form-item>
      </el-card>
    </el-form>  
  </el-main>

</template>

<script>
import url from "@/utils/url";
export default {
  mounted() {},
  components: {},
  data() {
    return {
      form: {
        code: new Date().getTime(),
        payType: {},
        imgPath: [],
        houseType: [{ name: "三室两厅" }, { name: "三室两厅" }]
      },
      // 选择房屋设施
      isIndeterminate: true
    };
  },
  methods: {
    // 提交表单上传数据
    saveData() {
      url.post("/house", this.form).then(res => {
        console.log(res);
      });
    },
    // 上传图片
    uploadSuccess(response, file, fileList) {
      // console.log(response); //["bdd5da6eec56cb9585537329fd55417b.png"]
      this.uploadFile(fileList);
    },
    uploadRemove(file, fileList) {
      this.uploadFile(fileList);
    },
    // 处理最后上传的数据
    uploadFile(fileList) {
      let data = [];
      fileList.forEach(list => {
        data.push(list.response.files[0]);
      });
      this.form.imgPath = data;
    },

    // 户型图上传
    // 上传图片
    houseTypeSuccess(response, file, fileList, index) {
      // console.log(response); //["bdd5da6eec56cb9585537329fd55417b.png"]
      this.houseTypeFile(fileList, file.response.index);
    },
    houseTypeRemove(file, fileList) {
      this.houseTypeFile(fileList, file.response.index);
    },
    // 处理最后上传的数据
    houseTypeFile(fileList, index) {
      let data = [];
      fileList.forEach(list => {
        data.push(list.response.files[0]);
      });
      this.form.houseType[index].imgPath = data;
    }
  }
};
</script>

<style scoped>

</style>