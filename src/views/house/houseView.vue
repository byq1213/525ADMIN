<template>
  <div>
    <!-- 新房详情 -->
    <el-form :model="info" size="mini" label-width="100px">
      <el-form-item label="编号">
        <el-input disabled="" v-model="info.code" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="楼盘名称">
        <el-input disabled="" v-model="info.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="别名/小区名称" prop="alias">
        <el-input v-model="info.alias" placeholder="请输入别名/小区名称" disabled=""></el-input>
      </el-form-item>
            <el-form-item label="开发商" prop="developers">
        <el-input v-model="info.developers" placeholder="请输入开发商名称" disabled="" >
        </el-input>
      </el-form-item>
            <el-form-item label="开盘时间">
        <el-date-picker v-model="info.openDate"
         placeholder=""
         type="month"
         disabled=""
         value-format="yyyy-MM"></el-date-picker>
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

      <el-form-item label="房源户型">
          <el-select v-model="info.room" placeholder="" disabled="">
            <el-option v-for="item in this.$store.state.app.room" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="建筑类型">
        <el-select v-model="info.height" placeholder="" disabled="">
          <el-option label="高楼层" :value="0"></el-option>
          <el-option label="低楼层" :value="1"></el-option>
        </el-select>
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
      <el-form-item label="楼盘图片">
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
      <el-form-item label="产权年限" prop="ageLimit" >
        <el-input v-model.number="info.ageLimit" disabled="" placeholder="请输入楼盘产权年限" >          
          <template slot="append">年</template>
        </el-input>
      </el-form-item>
      <el-form-item label="占地面积" prop="coveringArea">
        <el-input v-model.number="info.coveringArea" disabled="" placeholder="请输入楼盘占地面积" >
          <template slot="append">㎡</template>
        </el-input>
      </el-form-item>
      <el-form-item label="建筑面积" prop="proportion">
        <el-input v-model.number="info.proportion" disabled="" placeholder="请输入建筑面积" >
          <template slot="append">㎡</template>
        </el-input>
      </el-form-item>
      <el-form-item label="容积率" prop="plotRatio">
        <el-input-number v-model.number="info.plotRatio" placeholder="5"  disabled=""></el-input-number>
      </el-form-item>
      <el-form-item label="绿化率" prop="greeningRate">
        <el-input-number v-model.number="info.greeningRate" placeholder="50"  disabled=""></el-input-number> <span>%</span>
      </el-form-item>
      <el-form-item label="规划停车位"  prop="park">
        <el-input v-model.number="info.park" placeholder="请输入楼盘规划停车位"  disabled=""></el-input>
      </el-form-item>
      <el-form-item label="物业公司" prop="property">
        <el-input v-model="info.property" placeholder="请输入楼盘物业公司"  disabled=""></el-input>
      </el-form-item>
      <el-form-item label="物业费">
        <el-input v-model="info.propertyCost" placeholder="请输入楼盘物业费用"  disabled=""></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-input disabled="" v-model="info.tags" placeholder="" ></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input disabled="" v-model="info.address" placeholder="" ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import url from "@/utils/url";
export default {
  mounted() {
    console.log("houseId :", this.$props.houseId);
    this.getHouse2Info();
  },
  props: {
    houseId: {
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
      url.get(`/houseNew/${this.$props.houseId}`).then(res => {
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