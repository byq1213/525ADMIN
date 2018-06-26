<template>
  <div>
    <!-- 二手房详情 -->
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
            万元
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
      <el-form-item label="房源户型">
        <el-input disabled="" v-model="info.room.s" placeholder="" class="w10">
          <template slot="append">
            室
          </template>
        </el-input>
        <div></div>
        <el-input disabled="" v-model="info.room.t" placeholder="" class="w10">
          <template slot="append">
            厅
          </template>
        </el-input>
        <div></div>
        <el-input disabled="" v-model="info.room.w" placeholder="" class="w10">
          <template slot="append">
            卫
          </template>
        </el-input>
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
      <el-form-item label="装修">
        <el-input disabled="" v-model="info.decoration" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="小区">
        <el-input disabled="" v-model="info.cell" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="房源图片">
       <span v-for="(item,index) in info.imgPath" :key="index">
         <!-- <img :src="`${BASE_API}uploads/${item}`" style="max-height:30px" /> -->
          <el-popover
          placement="right"
          width="600"
          trigger="hover">
          <img :src="`${BASE_API}uploads/${item}`" style="width:100%"/>
          <img  slot="reference" :src="`${BASE_API}uploads/${item}`" class="houseViewImg">
          <!-- <el-button slot="reference">click 激活</el-button> -->
        </el-popover>
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
            <el-form-item label="小区">
        <el-input disabled="" v-model="info.cell" placeholder="" >
          <template slot="append">
            小区
          </template>
        </el-input>
        <div></div>
        <el-input disabled="" v-model="info.build" placeholder="" >
          <template slot="append">
            楼/座/栋
          </template>
        </el-input>
        <div></div>
        <el-input disabled="" v-model="info.unit" placeholder="" >
          <template slot="append">
           单元
          </template>
        </el-input>
        <div></div>
        <el-input disabled="" v-model="info.floor" placeholder="" >
          <template slot="append">
           层
          </template>
        </el-input>
        <div></div>
        <el-input disabled="" v-model="info.number" placeholder="" >
          <template slot="append">
           室
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="房东姓名">
        <el-input disabled="" v-model="info.hostName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input disabled="" v-model="info.hostPhone" placeholder=""></el-input>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script>
import url from "@/utils/url";
export default {
  mounted() {
    console.log("house2Id :", this.$props.house2Id);
    this.getHouse2Info();
  },
  props: {
    house2Id: {
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
      url.get(`/house2/${this.$props.house2Id}`).then(res => {
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