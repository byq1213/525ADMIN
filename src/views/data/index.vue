<template>
  <div>
    <el-main>
    <!-- 数据分析 -->
    <el-form :model="form" :inline="true">
      <el-form-item label="时间段">
         <el-date-picker
            v-model="form.birthday"
            type="datetimerange"
            :picker-options="this.$store.state.app.pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            >
          </el-date-picker>
      </el-form-item>
      <el-form-item label="经纪人">
        <el-select v-model="form.broker" placeholder="">
          <el-option v-for="(item,index) in this.$store.state.app.brokers" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 总体数据 点击进入详情  访问量 。。。 -->
    <el-row :gutter="20" class="count app-item">
      <el-col :span="6"  v-for="(item,index) in count" :key="index">
        <el-card>
          <span class="num">
            <router-link :to="item.url" v-text="item.value"></router-link>
          </span>
          <span v-text="item.label"></span>
        </el-card>      
      </el-col>
    </el-row>

    <el-card class="countChart">
      <div slot="header">
        访问量
        （总访问<span class="Num"> 79</span> 次）
        <span class="fr">
          <el-button type="success" size="mini"> 查看详情</el-button>
        </span>
      </div>
      <div>
        <chart :options="view" :theme='theme'></chart>
      </div>
    </el-card>
    </el-main>
  </div>
</template>

<script>
// import io from 'socket.io-client'
import chart from "vue-echarts";
export default {
  components: {
    chart
  },
  data() {
    return {
      form: {},
      count: [
        { label: "访问量", value: "123", url: "/" },
        { label: "成交量", value: "123", url: "/" },
        { label: "发布量", value: "123", url: "/" },
        { label: "需求量", value: "123", url: "/" }
      ],
      theme:'light',//更换主题
      view: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ],
      }
    };
  },
  mounted() {
    
  }
};
</script>

<style scoped lang="scss">
.echarts {
  height: 300px;
  width: 100%;
}
.countChart {
  .Num{
    font-size: 1.5em;
    
  }
}
</style>