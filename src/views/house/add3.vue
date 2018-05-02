<template>
  <el-main>
    <!-- 添加房源 -->
    <el-form :model="form" label-width="100px">
      <el-card class="app-item">
        <div slot="header">
          基本信息（租房）
        </div>
      <el-form-item label="房源编号">
        <el-input v-model="form.code" placeholder="请输入房源编号" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="房源名称">
        <el-input v-model="form.name" placeholder="请输入房源名称" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="房源租金">
        <el-input v-model="form.rent" placeholder="请输入房源租金" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="房源面积">
        <el-input v-model="form.proportion" placeholder="请输入房源面积" class="w20">
          <template slot="append">㎡</template>
        </el-input>
      </el-form-item>
      <el-form-item label="房源户型">
        <el-input v-model="form.houseType" placeholder="请输入房源户型" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="房源年代">
        <el-date-picker v-model="form.age"
         placeholder=""
         type="year"></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="房源朝向">
        <el-input v-model="form.code" placeholder="请输入房源朝向" class="w20"></el-input>
      </el-form-item> -->
      <el-form-item label="出租方式">
        <el-select v-model="form.type" placeholder="出租方式">
          <el-option value='整租' label="整租" ></el-option>
          <el-option value='合租' label="合租" ></el-option>
        </el-select>
      </el-form-item> 
      <el-form-item label="支付方式">
          <el-input v-model="form.payType.charge" placeholder="" class="w10">
            <template slot="prepend">押</template>
          </el-input>
          <el-input v-model="form.payType.pair" placeholder="" class="w10">
            <template slot="prepend">付</template>
          </el-input>
      </el-form-item>
      <el-form-item label="楼层">
        <el-select v-model="form.level" placeholder="" >
          <el-option value="1" label="低楼层"></el-option>
          <el-option value="2" label="中楼层"></el-option>
          <el-option value="3" label="高楼层"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属小区">
        <el-input v-model="form.cell" placeholder="" class="w20"></el-input>
      </el-form-item>
      </el-card>
      <el-card class="app-item">
        <div slot="header">
          房屋设施
        </div>
        <el-form-item label="">
           <el-checkbox size="big" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="form.checkAll" @change="handlecheckedFacilityChange">
              <el-checkbox v-for="item in facility" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
      </el-card>
      <el-card class="app-item">
        <div slot="header">
          房源图片
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
          房源特色
        </div>
        <el-form-item label="房源亮点">
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
        <el-form-item label="标签添加">
          <el-tag
            :key="tag"
            v-for="tag in form.tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加自定义标签</el-button>
        </el-form-item>
        <el-form-item label="坐标选择">

        </el-form-item>
        <el-form-item label="">
          <el-button type="" @click="saveData">保存</el-button>
          <el-button type="success" @click="saveData">保存并通知经纪人</el-button>
        </el-form-item>
      </el-card>
    </el-form>  
  </el-main>

</template>

<script>
const facilityOptions = ["洗衣机", "彩电", "冰箱"];
// import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
// import LocalSearch from 'vue-baidu-map/components/Search/LocalSearch.vue'
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
        tags: ["南北通透","领包入住","精装修","免中介费",]
      },
      // 选择房屋设施
      isIndeterminate: true,
      checkedFacility: ["洗衣机", "彩电", "冰箱"],
      facility: facilityOptions,
      checkAll: false,
      inputValue: "",
      inputVisible: false

      // map: {
      //   ak: "93xi2EVIQxNlCz8z4v7WpGqGuusDWApE",
      //   keyword: "长风画卷",
      //   location: "太原"
      // }
    };
  },
  methods: {
    // 删除标签
    handleClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
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
    handleCheckAllChange(val) {
      this.checkedFacility = val ? facilityOptions : [];
      this.isIndeterminate = false;
    },
    handlecheckedFacilityChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.facility.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.facility.length;
    }
  }
};
</script>

<style scoped>

</style>