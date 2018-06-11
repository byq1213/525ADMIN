<template>
  <el-main>
    <!-- 添加房源 -->
    <el-form :model="form" label-width="100px" 
    :rules="house3Rules"
    ref="formHouse3">
      <el-card class="app-item">
        <div slot="header">
          基本信息（租房）
        </div>
      <el-form-item label="房源编号" prop="code">
        <el-input v-model="form.code" placeholder="请输入房源编号" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="房源名称"  prop="name">
        <el-input v-model="form.name" placeholder="请输入房源名称" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="房源租金"  prop="rent">
        <el-input v-model.number="form.rent" placeholder="请输入房源租金" class="w20" :disabled="mian">
          <template slot="append">元/月</template>
        </el-input>
        <el-checkbox label="面议" v-model="mian"></el-checkbox>
      </el-form-item>
      <el-form-item label="房源面积"  prop="proportion">
        <el-input v-model.number="form.proportion" placeholder="请输入房源面积" class="w20">
          <template slot="append">㎡</template>
        </el-input>
      </el-form-item>
      <el-form-item label="房源朝向">
        <el-input v-model="form.orientation" placeholder="" class="w20"></el-input>
      </el-form-item>
      <!-- <el-form-item label="房源户型">
        <el-select v-model="form.room" placeholder="请选择居室数量">
          <el-option v-for="item in this.$store.state.app.room" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item> -->
                  <el-form-item label="房源户型" >
        <el-input v-model="form.room.s" placeholder="" size="small" class="w10">
          <template slot="append">
            室
          </template>
        </el-input>
        <el-input v-model="form.room.t" placeholder="" size="small" class="w10">
          <template slot="append">
            厅
          </template>
        </el-input>
        <el-input v-model="form.room.w" placeholder="" size="small" class="w10">
          <template slot="append">
            卫
          </template>
        </el-input>

        <!-- <el-select v-model="form.room" placeholder="请选择居室数量">
          <el-option v-for="item in this.$store.state.app.room" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select> -->
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
          <el-option :value='0' label="整租" ></el-option>
          <el-option :value='1' label="合租" ></el-option>
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
          <el-option :value="1" label="低楼层"></el-option>
          <el-option :value="2" label="中楼层"></el-option>
          <el-option :value="3" label="高楼层"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商圈">
        <el-input v-model="form.tradingArea" placeholder="请输入商圈" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="所属小区" prop="cell">
        <el-input v-model="form.cell" placeholder="" class="w20"></el-input>
      </el-form-item>
      </el-card>
      <el-card class="app-item">
        <div slot="header">
          房屋设施
        </div>
        <el-form-item label="">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
      </el-card>
      <el-card class="app-item">
        <div slot="header">
          房源图片
        </div>
        <el-form-item label="">
          <el-upload
          :action="BASE_API+'uploadFile'"
          list-type="picture-card"
          :on-remove="uploadRemove"
          :on-success="uploadSuccess"
          :before-upload="this.beforeUpload"
          :file-list="uploadImg"
          multiple=""
          :headers="this.getcsrf()">
          <i class="el-icon-plus"></i>
          </el-upload>
        <span class="imgImpose">*请上传不大于 1M ，长宽比 尽可能 16：9的图片。</span>
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
        <el-form-item label="标签添加"  prop="tags">
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
          <div id="mapNode" ref="mapNode" style="height:300px;width:100%;margin-bottom:20px"></div>

            <!-- <el-form-item label="地区">
              <el-input v-model="addressChoose.area" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button type="success" @click="searchAddress">查询</el-button> -->
            <!-- </el-form-item>
            <div  id="infoDiv" ref="infoDiv"></div> -->
            <el-form-item label="详细地址">
              <el-input size="mini" v-model="form.address" placeholder="请选择详细地址" class="w20"></el-input>
              <el-button type="" size="mini" @click="searchaddress">查询</el-button>
            </el-form-item>
            <el-form-item label="坐标">
              <el-input v-model="form.addressLatLng.lat" disabled="" placeholder="" size="mini" class="w20"></el-input>
              <div></div>
              <el-input v-model="form.addressLatLng.lng" disabled="" placeholder="" size="mini" class="w20"></el-input>
            </el-form-item>
            <!-- <el-form-item label="区域">
              <el-input size="mini" v-model="form.addressComponents.district" placeholder="请选择区域" class="w20"></el-input>
            </el-form-item>
            <el-form-item label="街道">
              <el-input size="mini" v-model="form.addressComponents.street" placeholder="请选择街道" class="w20"></el-input>
            </el-form-item> -->
        </el-form-item>
        <el-form-item label="">
          <el-button type="" @click="saveData">立即上传</el-button>
          <!-- <el-button type="success" @click="saveData">保存并通知经纪人</el-button> -->
        </el-form-item>
      </el-card>
    </el-form>  
  </el-main>

</template>

<script>
const cityOptions = [
  "热水器",
  "卫生间",
  "洗衣机",
  "冰箱",
  "电视",
  "床",
  "衣柜",
  "阳台"
];

// import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
// import LocalSearch from 'vue-baidu-map/components/Search/LocalSearch.vue'
import url from "@/utils/url";
import qmap from "qmap";
import { houseCodeFormat } from "@/utils/index";
import { house3Rules } from "@/api/houseRules";

export default {
  mounted() {
    this.createMap();
    this.editHouse3();
  },
  components: {},
  data() {
    return {
      house3Rules,
      uploadImg: [],
      BASE_API: process.env.BASE_API,

      form: {
        room: {
          s: 1,
          t: 1,
          w: 1
        },
        code: `Z${houseCodeFormat(new Date().getTime())}`,
        payType: {
          charge: 1,
          pair: 1
        },
        imgPath: [],
        tags: [],
        address: "太原市",
        addressComponents: {},
        addressLatLng: {}
      },
      // 选择房屋设施
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      inputValue: "",
      inputVisible: false,

      //地图
      markers: [],
      addressMap: {}, //地图
      searchService: {},
      selectLatLng: {},
      cityLocation: {},
      geocoder: {},

      //租金面议
      mian: false
    };
  },
  methods: {
    // 修改租房信息
    editHouse3() {
      if (this.$route.params.id) {
        let id = (this.editId = this.$route.params.id);
        url.get(`/house/${id}`).then(res => {
          this.checkedCities = res.data.facility;
          this.form = res.data;
          let imgPath = this.form.imgPath;
          imgPath.forEach(item => {
            this.uploadImg.push({
              name: "房源图片",
              url: `${this.BASE_API}uploads/${item}`,
              response: { files: [`${item}`] }
            });
          });
        });
        // 设置房源图片
      }
    },
    searchaddress() {
      const _this = this;
      let l = this.geocoder.getLocation(this.form.address);
      this.geocoder.setComplete(function(result) {
        let loc = result.detail.location;
        _this.selectLatLng = loc;
        console.log("result", result);
        _this.setAddress(result);
        _this.addressMap.setCenter(loc);
        var marker = new qmap.Marker({
          map: _this.addressMap,
          position: loc
        });
      });
    },

    // 新增地图
    createMap() {
      let mapNode = this.$refs.mapNode;
      // 初始化地图、
      this.addressMap = new qmap.Map(mapNode, {
        center: new qmap.LatLng(37.853441, 112.562485),
        zoom: 13 //缩放等级
      });

      // 获取区域信息  无用
      this.cityLocation = new qmap.CityService({
        complete: res => {
          this.addressMap.setCenter(res.detail.latLng);
          console.log("res :", res);
        }
      });

      // 获取详细信息
      this.geocoder = new qmap.Geocoder();

      qmap.event.addListener(this.searchService, "click", res => {});
      // 添加点击事件
      qmap.event.addListener(this.addressMap, "click", event => {
        // 获取到坐标
        this.selectLatLng = event.latLng;
        const map = this.addressMap;
        map.setCenter(event.latLng);
        this.geocoder.getAddress(event.latLng);
        this.geocoder.setComplete(res => {
          this.setAddress(res);
          //获取到详细街道信息
          // {
          //   address: "中国山西省太原市万柏林区迎泽西大街102号";
          //   addressComponents: {
          //     city: "太原市";
          //   country: "中国";
          //   district: "万柏林区";
          //   province: "山西省";
          //   street: "迎泽西大街";
          //   streetNumber: "迎泽西大街102号";
          //   town: "千峰街道";
          //   village: "";
          //   }
          // }
        });
        let marker = new qmap.Marker({
          position: event.latLng,
          map: this.addressMap
        });
        qmap.event.addListener(map, "click", function(event) {
          marker.setMap(null);
        });
      });
    },
    // 设置区域
    setAddress(res) {
      let a = res.detail.addressComponents;
      console.log(a);
      let b = a.streetNumber ? a.streetNumber : a.street;
      this.form.address = a.city + a.district + b;
      this.form.addressComponents = a;
    },

    // 房屋设施
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 删除标签
    handleClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    },
    showInput() {
      if (this.form.tags.length >= 4) {
        this.tagNotify("标签不能超过四个");
        return;
      }
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 标签提示
    tagNotify(text) {
      const h = this.$createElement;

      this.$notify({
        title: "标题名称",
        message: h("i", { style: "color: teal" }, text)
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        if (inputValue.length > 4) {
          this.tagNotify("标签字数不能多于四个");
          return;
        } else {
          this.form.tags.push(inputValue);
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 提交表单上传数据
    saveData() {
      this.$refs["formHouse3"].validate(valid => {
        if (valid) {
          if (this.form.imgPath.length == 0) {
            this.$notify.error({
              title: "错误",
              message: "请上传房源图片",
              type: "success"
            });
            return;
          }
          this.form.share = true;
          this.form.addBroker = this.getBroker();
          url.post("/house", this.form).then(res => {
            this.$router.push("/meng/shareHouse/index");
          });
        } else {
          scrollTo(0, 0);
          console.log("error submit!!");
          return false;
        }
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
        if (list.response) {
          data.push(list.response.files[0]);
        }
      });
      this.form.imgPath = data;
    }
  },
  watch: {
    checkedCities(res) {
      this.form.facility = res;
    },
    selectLatLng(res) {
      this.form.addressLatLng = res;
    },
    mian(res) {
      if (res) {
        this.form.rent = 0;
      }
    }
  }
};
</script>

<style scoped>
</style>