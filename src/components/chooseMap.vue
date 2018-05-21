<template>
  <div>
    <div id="mapNode" ref="mapNode" style="height:300px;width:100%;margin-bottom:20px"></div>
    <el-form :model="form" label-width="100px" size="small">
      <span v-if="form.addressLatLng" v-text="form.addressLatLng.lat"></span>
      <span v-if="form.addressLatLng" v-text="form.addressLatLng.lng"></span>
      <el-form-item label="详细地址">
        <el-input v-model="form.address" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type=""  @click="searchaddress">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qmap from "qmap";

export default {
  props: {
    addmapform: { type: Object }
  },
  mounted() {
    this.createMap();
  },
  data() {
    return {
      form: this.$props.addmapform,
      address: "太原市",
      addressComponents: {},
      addressLatLng: { lat: 0, lng: 0 },
      markers: [],
      addressMap: {}, //地图
      searchService: {},
      selectLatLng: {},
      cityLocation: {},
      geocoder: {}
    };
  },
  methods: {
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
    setAddress(res) {
      let a = res.detail.addressComponents;
      console.log(a);
      let b = a.streetNumber ? a.streetNumber : a.street;
      this.form.address = a.city + a.district + b;
      this.form.addressComponents = a;
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
    }
  },
  watch: {
    selectLatLng(res) {
      this.form.addressLatLng = res;
      this.$emit("isAddressEvent", this.form);
    }
  }
};
</script>

<style scoped>
</style>