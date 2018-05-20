<template>
  <div>
    <!-- 租房详情 -->
    <el-form :model="info" size="mini" label-width="100px">
      <el-form-item label="编号">
        <el-input disabled="" v-model="info.code" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="房源名称">
        <el-input disabled="" v-model="info.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="参考价格">
        <el-input disabled="" v-model="info.rent" placeholder="">
          <template slot="append">
            元/月
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="房源面积">
        <el-input disabled="" v-model="info.proportion" placeholder="">
          <template slot="append">
            ㎡
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="出租方式">
                <el-select v-model="info.type" disabled="" placeholder="出租方式">
          <el-option :value='0' label="整租" ></el-option>
          <el-option :value='1' label="合租" ></el-option>
        </el-select>
      </el-form-item>
            <el-form-item label="支付方式" v-if="info.payType">
          <el-input disabled="" v-model="info.payType.charge" placeholder="" class="w10">
            <template slot="prepend">押</template>
          </el-input>
          <el-input  disabled="" v-model="info.payType.pair" placeholder="" class="w10">
            <template slot="prepend">付</template>
          </el-input>
      </el-form-item>
      <el-form-item label="房源户型">
          <el-select v-model="info.room" placeholder="" disabled="">
            <el-option v-for="item in this.$store.state.app.room" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="楼层">
        <span v-if="info.level == 1"> 
          <el-input  placeholder="低楼层" disabled=""></el-input>
        </span>
        <span v-if="info.level == 2"> 
          <el-input  placeholder="中楼层" disabled=""></el-input>
        </span>
        <span v-if="info.level == 3"> 
          <el-input  placeholder="高楼层" disabled=""></el-input>
        </span>
      </el-form-item>

      <el-form-item label="商圈">
        <el-input disabled="" v-model="info.tradingArea" placeholder=""></el-input>
      </el-form-item>
      <!-- <el-form-item label="装修">
        <el-input disabled="" v-model="info.decoration" placeholder=""></el-input>
      </el-form-item> -->
      <el-form-item label="小区">
        <el-input disabled="" v-model="info.cell" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="房源名称">
       <span v-for="(item,index) in info.imgPath" :key="index">
         <img :src="`${BASE_API}uploads/${item}`" style="max-height:30px" />
       </span>
      </el-form-item>
      <el-form-item label="房源亮点">
        <el-input disabled="" v-model="info.highlight" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="交通出行">
        <el-input disabled="" v-model="info.transport" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="周边配套">
        <el-input disabled="" v-model="info.rim" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="户型介绍">
        <el-input disabled="" v-model="info.housIntroduce" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="小区介绍">
        <el-input disabled="" v-model="info.estate" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-input disabled="" v-model="info.tags" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input disabled="" v-model="info.address" placeholder=""></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import url from "@/utils/url";
export default {
  mounted() {
    console.log("house3Id :", this.$props.house3Id);
    this.getHouse2Info();
  },
  props: {
    house3Id: {
      type: String
    }
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      info: {}
    };
  },
  methods: {
    getHouse2Info() {
      url.get(`/house/${this.$props.house3Id}`).then(res => {
        this.info = res.data;
      });
    }
  },
  watch: {
    $props: {
      handler(newValue, oldValue) {
        console.log("子组件改变");
        this.getHouse2Info();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
</style>