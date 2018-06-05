<template>
  <div>
    <!-- 佣金数据 -->
    <el-main>
      <el-form :model="form" :inline="true">
        <el-form-item label="选择时间">
           <el-date-picker
            v-model="form.time"
            type="datetimerange"
            :picker-options="this.$store.state.app.pickerOptions"
            range-separator="至"
            value-format="timestamp"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <el-card>
        <div>

        <chart :options="options" :theme='theme'></chart>        
        </div>
      </el-card>
      </el-main>
  </div>
</template>

<script>
import chart from "vue-echarts";
import url from "@/utils/url";
export default {
  mounted() {
    this.getBrokerageData();
  },
  components: {
    chart
  },
  data() {
    return {
      theme: "light", //更换主题
      form: {},
      lists: [],
      options: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            name:'获得佣金',
            type:'bar',
            // barWidth: '60%',
          }
        ]
      }
    };
  },
  methods: {
    search(){
      this.getBrokerageData()
    },
    // 获取佣金信息
    getBrokerageData() {
      url.post("/getBrokerageData",this.form).then(res => {
        let data = res.data;
        this.options.xAxis.data = [];
        this.options.series[0].data = [];
        data.forEach(item => {
          this.options.xAxis.data.push(item.brokerInfo.brokerName);
          this.options.series[0].data.push(item.count);
        });
      });
    }
  }
};
</script>

<style scoped>
.echarts {
  height: 500px;
  width: 100%;
}
</style>