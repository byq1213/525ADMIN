<template>
  <el-main>
    <!-- 添加楼盘 -->
    <el-form :model="form" label-width="120px" :rules="formRules" ref="formNewHouse">
      <el-card class="app-item">
        <div slot="header">
          基本信息（新房）
        </div>  
      <el-form-item label="楼盘编号" prop="code">
        <el-input v-model="form.code" placeholder="请输入楼盘编号" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="楼盘名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入楼盘名称" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="别名/小区名称" prop="alias">
        <el-input v-model="form.alias" placeholder="请输入别名/小区名称" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="开发商" prop="developers">
        <el-input v-model="form.developers" placeholder="请输入开发商名称" class="w20">
        </el-input>
      </el-form-item>
      <el-form-item label="楼盘参考价格" prop="rent">
        <el-input v-model.number="form.rent" placeholder="" class="w20">
          <template slot="append">万元</template>
          
        </el-input>
      </el-form-item>
      <el-form-item label="开盘时间">
        <el-date-picker v-model="form.openDate"
         placeholder=""
         type="month"
         
         value-format="yyyy-MM"></el-date-picker>
      </el-form-item>
      <el-form-item label="楼盘类型">
        <el-select v-model="form.scale" placeholder="">
          <el-option label="普通住宅" value="0"></el-option>
          <el-option label="别墅" value="1"></el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="建筑类型">
        <el-select v-model="form.height" placeholder="">
          <el-option label="高楼层" :value="0"></el-option>
          <el-option label="低楼层" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预售许可证" prop="license">
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
      <el-form-item label="楼盘标签" prop="tags">
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
              <el-form  size="small" label-width="100px"   :ref="`newHouseRulesItem`">
           <div v-for="(item,index) in (form.houseType)" :key="index">
            <el-card class="app-item" style="display:flex">
                <el-form-item
                label="户型名称"
                :prop="`item.${index}.name`"
                >
                  <el-input v-model="item.name" :maxlength="10" placeholder="" class="w20"  ></el-input>
                </el-form-item>
                <el-form-item label="户型面积" prop="proportion">
                  <el-input v-model.number="item.proportion" placeholder="" class="w20">
                    <template slot="append">
                      ㎡
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="户型约价" prop="rent">
                  <el-input v-model="item.rent" placeholder="" class="w20">
                    <template slot="append">
                      万元
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="户型朝向">
                  <el-input v-model="item.orientation" placeholder="" class="w20" placeholder="南北朝向"></el-input>
                </el-form-item>
                <el-form-item label="户型上传" prop="imgPath">
                  <el-upload
                  v-if="HouseTypeuploadImg[index]"
                  :action="BASE_API+'uploadFile'"
                  list-type="picture-card"
                  :on-remove="houseTypeRemove"
                  :on-success="houseTypeSuccess"
                  :before-upload="beforeUpload"
                  :headers="{index}"
                  :file-list="HouseTypeuploadImg[index].editImg"
                  multiple=""
                    >
                  <i class="el-icon-plus"></i>
                  </el-upload>
                                    <el-upload
                  v-else
                  :action="BASE_API+'uploadFile'"
                  list-type="picture-card"
                  :on-remove="houseTypeRemove"
                  :on-success="houseTypeSuccess"
                  :before-upload="beforeUpload"
                  :headers="{index}"
                  multiple=""
                    >
                  <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="danger" size="small" style="display:flex;justify-content:flex-end" @click="  delHouseType(index)">删除</el-button>
                </el-form-item>              
            </el-card>
           </div>
                </el-form>
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
          :action="BASE_API+'uploadFile'"
          list-type="picture-card"
          :on-remove="uploadRemove"
          :on-success="uploadSuccess"
          :before-upload="this.beforeUpload"
          :file-list="uploadImg">
          <i class="el-icon-plus"></i>
          </el-upload>
        <span class="imgImpose">*请上传不大于 1M ，长宽比 尽可能 16：9的图片。</span>
        </el-form-item>
      </el-card>
      <el-card class="app-item">
        <div slot="header">
          楼盘特色
        </div>
      <el-form-item label="产权年限" prop="ageLimit">
        <el-input v-model.number="form.ageLimit" placeholder="请输入楼盘产权年限" class="w20">          
          <template slot="append">年</template>
        </el-input>
      </el-form-item>
      <el-form-item label="占地面积" prop="coveringArea">
        <el-input v-model.number="form.coveringArea" placeholder="请输入楼盘占地面积" class="w20">
          <template slot="append">㎡</template>
        </el-input>
      </el-form-item>
      <el-form-item label="建筑面积" prop="proportion">
        <el-input v-model.number="form.proportion" placeholder="请输入建筑面积" class="w20">
          <template slot="append">㎡</template>
        </el-input>
      </el-form-item>
      <el-form-item label="容积率" prop="plotRatio">
        <el-input-number v-model.number="form.plotRatio" placeholder="5" class="w20"></el-input-number>
      </el-form-item>
      <el-form-item label="绿化率" prop="greeningRate">
        <el-input-number v-model.number="form.greeningRate" placeholder="50" class="w20"></el-input-number> <span>%</span>
      </el-form-item>
      <!-- <el-form-item label="规划停车位"  prop="park">
        <el-input v-model.number="form.park" placeholder="请输入楼盘规划停车位" class="w20">
          <template slot-scope='scope'>
             
          </template>
        </el-input>
      </el-form-item> -->
      <el-form-item label="物业公司" prop="property">
        <el-input v-model="form.property" placeholder="请输入楼盘物业公司" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="物业费">
        <el-input v-model="form.propertyCost" placeholder="请输入楼盘物业费用" class="w20"></el-input>
      </el-form-item>
      <el-form-item label="坐标选择">
          <div id="mapNode" ref="mapNode" style="height:300px;width:100%;margin-bottom:20px"></div>

            <el-form-item label="详细地址">
              <el-input size="mini" v-model="form.address" placeholder="请选择详细地址" class="w20"></el-input>
              <el-button type="" size="mini" @click="searchaddress">查询</el-button>
            </el-form-item>
            <el-form-item label="坐标">
              <el-input v-model="form.addressLatLng.lat" disabled="" placeholder="" size="mini" class="w20"></el-input>
              <div></div>
              <el-input v-model="form.addressLatLng.lng"  disabled="" placeholder="" size="mini" class="w20"></el-input>
            </el-form-item>

        </el-form-item>

        <el-form-item label="">
          <el-button type="" @click="saveData">立即上传</el-button>
        </el-form-item>
      </el-card>
    </el-form>  
  </el-main>

</template>

<script>
import qmap from "qmap";
import url from "@/utils/url";
import { houseCodeFormat } from "@/utils/index";
import { newHouseRules, newHouseRulesItem } from "@/api/houseRules";
export default {
  mounted() {
    this.createMap();
    this.editHouse();

    console.log(newHouseRules);
  },
  components: {},
  data() {
    return {
      BASE_API: process.env.BASE_API,
      uploadImg: [],
      HouseTypeuploadImg: [{ eidtImg: [] }],
      form: {
        code: `X${houseCodeFormat(new Date().getTime())}`,
        imgPath: [],
        houseType: [{}],
        tags: [],
        address: "太原市",
        addressComponents: {},
        addressLatLng: {},
        scale: 0
      },
      formRules: newHouseRules,
      itemRules: newHouseRulesItem,
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
    //修改新房信息
    editHouse() {
      if (this.$route.params.id) {
        let id = (this.editId = this.$route.params.id);
        url.get(`/houseNew/${id}`).then(res => {
          this.form = res.data;
          let imgPath = this.form.imgPath;
          let houseTypeArr = this.form.houseType;
          imgPath.forEach(item => {
            this.uploadImg.push({
              name: "房源图片",
              url: `${this.BASE_API}uploads/${item}`,
              response: { files: [`${item}`] }
            });
          });
          houseTypeArr.forEach((item, index) => {
            item.editImg = [];
            item.imgPath.forEach(imgItem => {
              item.editImg.push({
                name: "户型图片",
                url: `${this.BASE_API}uploads/${imgItem}`,
                response: { files: [`${imgItem}`], index: index }
              });
            });
          });
          this.HouseTypeuploadImg = houseTypeArr;
          console.log("houseTypeArr :", houseTypeArr);
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
    // 标签提示
    tagNotify(text) {
      const h = this.$createElement;

      this.$notify({
        title: "标题名称",
        message: h("i", { style: "color: teal" }, text)
      });
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

    // 删除户型
    delHouseType(index) {
      console.log("test");

      this.form.houseType.splice(index, 1);
    },
    // 提交表单上传数据
    saveData() {
      console.log(this.$refs["formNewHouse"]);
      this.$refs["formNewHouse"].validate(valid => {
        // this.$refs["newHouseRulesItem"].validate(validItem => {
        //   if (validItem) {
        //   } else {
        //     console.log("户型填写验证");
        //   }
        // });
        console.log("this.form :", this.form);
        if (valid) {
          if (this.form.imgPath.length == 0) {
            this.$notify.error({
              title: "错误",
              message: "请上传房源图片",
              type: "success"
            });
          }
          url.post("/houseNew", this.form).then(res => {
            this.$router.push("/House/list");
          });
        } else {
          scrollTo(0, 0);
          console.log("error submit!!");
          return false;
        }
      });
      return;
    },
    // 上传图片
    uploadSuccess(response, file, fileList) {
      // console.log("response :", response);
      // console.log("file :", file);
      // console.log("fileList :", fileList);
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
      console.log(data);

      this.form.imgPath = data;
    },

    // 户型图上传
    // 上传图片
    houseTypeSuccess(response, file, fileList) {
      // console.log(response); //["bdd5da6eec56cb9585537329fd55417b.png"]

      this.houseTypeFile(fileList, file.response.index);
    },
    houseTypeRemove(file, fileList) {
      console.log("file :", file);
      console.log("fileList :", fileList);
      this.houseTypeFile(fileList, file.response.index);
    },
    // 处理最后上传的数据
    houseTypeFile(fileList, index) {
      console.log("fileList :", fileList);
      console.log("index :", index);
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