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
      </el-form-item· ·>
      <el-form-item label="楼盘参考价格">
        <el-input v-model="form.rent" placeholder="‘100万元’ 或 ‘200-220万元’" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="开盘时间">
        <el-date-picker v-model="form.openDate"
         placeholder=""
         type="month"
         
         value-format="yyyy-MM"></el-date-picker>
      </el-form-item>
      <el-form-item label="楼盘类型">
        <el-select v-model="form.scale" placeholder="">
          <el-option label="高楼层" value="0"></el-option>
          <el-option label="低楼层" value="1"></el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="建筑类型">
        <el-select v-model="form.height" placeholder="">
          <el-option label="高楼层" value="0"></el-option>
          <el-option label="低楼层" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预售许可证">
        <el-input v-model="form.license" placeholder="" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="发证日期">
        <el-date-picker 
        v-model="form.licenseDate"
         placeholder=""
         type="month"
         value-format="yyyy-MM"
         ></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="位置">
        <el-input v-model="form.address" placeholder="请输入楼盘地址" class="w20"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="楼盘朝向">
        <el-input v-model="form.code" placeholder="请输入楼盘朝向" class="w20"></el-input>
      </el-form-item> -->
      <el-form-item label="楼盘标签">
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
      </el-card>
      <el-card class="app-item">
        <div slot="header">
          <span>
          户型介绍
          </span>

        </div>
           <div v-for="(item,index) in (form.houseType)" :key="index">
            <el-card class="app-item" style="display:flex">
              
              <el-form  size="small" label-width="100px">
                
                <el-form-item label="户型名称">
                  <el-input v-model="item.name" placeholder="" class="w20" placeholder="一室两厅"></el-input>
                </el-form-item>
                <el-form-item label="户型面积">
                  <el-input v-model="item.proportion" placeholder="" class="w20">
                    <template slot="append">
                      ㎡
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="户型约价">
                  <el-input v-model="item.rent" placeholder="" class="w20">
                    <template slot="append">
                      万元
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="户型朝向">
                  <el-input v-model="item.orientation" placeholder="" class="w20" placeholder="南北朝向"></el-input>
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
                <el-form-item label="">
                  <el-button type="danger" size="small" style="display:flex;justify-content:flex-end" @click="  delHouseType(index)">删除</el-button>
                </el-form-item>              
                </el-form>
            </el-card>
           </div>
           <p>
          <span>
            <el-button type="success" @click="form.houseType.push({})">添加户型</el-button>
          </span>
           </p>
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
        <el-input v-model="form.ageLimit" placeholder="请输入楼盘产权年限" class="w20">          
          <template slot="append">年</template>
        </el-input>
      </el-form-item>
      <el-form-item label="占地面积">
        <el-input v-model="form.coveringArea" placeholder="请输入楼盘占地面积" class="w20">
          <template slot="append">㎡</template>
        </el-input>
      </el-form-item>
      <el-form-item label="建筑面积">
        <el-input v-model="form.proportion" placeholder="请输入建筑面积" class="w20">
          <template slot="append">㎡</template>
        </el-input>
      </el-form-item>
      <el-form-item label="容积率">
        <el-input-number v-model="form.plotRatio" placeholder="5" class="w20"></el-input-number>
      </el-form-item>
      <el-form-item label="绿化率">
        <el-input-number v-model="form.greeningRate" placeholder="50" class="w20"></el-input-number> <span>%</span>
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
              <el-input v-model="form.addressLatLng.lng"  disabled="" placeholder="" size="mini" class="w20"></el-input>
            </el-form-item>
            <!-- <el-form-item label="区域">
              <el-input size="mini" v-model="form.addressComponents.district" placeholder="请选择区域" class="w20"></el-input>
            </el-form-item>
            <el-form-item label="街道">
              <el-input size="mini" v-model="form.addressComponents.street" placeholder="请选择街道" class="w20"></el-input>
            </el-form-item> -->
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
import qmap from "qmap";
import url from "@/utils/url";
export default {
  mounted() {
    this.createMap();
  },
  components: {},
  data() {
    return {
      form: {
        code: new Date().getTime(),
        imgPath: [],
        houseType: [{}],
        tags: ["南北通透", "领包入住", "精装修", "免中介费"],
        address: "太原市",
        addressComponents: {},
        addressLatLng: {}
      },
      inputValue: "",
      inputVisible: false,

      markers: [],
      addressMap: {}, //地图
      searchService: {},
      selectLatLng: {},
      cityLocation: {},
      geocoder: {}
    };
  },
  methods: {
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

      qmap.event.addListener(this.searchService, "click", res => {
        console.log("res :", res);
      });
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

    // 删除户型
    delHouseType(index) {
      console.log("test");

      this.form.houseType.splice(index, 1);
    },
    // 提交表单上传数据
    saveData() {
      url.post("/houseNew", this.form).then(res => {
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
        if (list.response) {
          data.push(list.response.files[0]);
        }
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
  },
  watch: {
    selectLatLng(res) {
      this.form.addressLatLng = res;
    }
  }
};
</script>
<style scoped>

</style>