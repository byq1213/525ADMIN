<template>
  <div>
    <el-main>
    <!-- 数据分析 -->
    <el-form :model="form" :inline="true">
      <el-form-item label="时间段">
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

      <el-form-item label="经纪人" v-if="this.isBroker()">
        <el-select v-model="this.getBroker()" placeholder="" disabled="">
          <el-option label="全部" value=""></el-option>
          <!-- <el-option v-for="(item,index) in this.$store.state.app.brokers" :key="index" :label="item.label" :value="item.value"></el-option> -->
          <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="经纪人" v-else>
        <el-select v-model="form.broker" placeholder="">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,index) in brokerLists" :key="index" :label="item.brokerInfo.brokerName" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房源类型">
        <el-select v-model="form.houseType" placeholder="">
          <el-option v-for="item in houseType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item v-if="this.isBroker()" label="">
        <el-button type="success" @click="getMyqrCode">我的二维码</el-button>
      </el-form-item>
    </el-form>
    <!-- 总体数据 点击进入详情  访问量 。。。 -->
    <el-row :gutter="20" class="count app-item">
      <el-col :span="4"  v-for="(item,index) in count" :key="index" style="width:20%">
        <el-card  >
          <span class="num"  v-text="item.value"  @click="showTable(index)">
          </span>
          <span v-text="item.label"></span>
        </el-card>      
      </el-col>
    </el-row>
    <!-- <views v-if="showTableIndex == 0" :time="form.time" :brokerId="form.broker" :houseType="form.houseType"></views> -->
    <login v-if="showTableIndex == 0" :time="form.time" :brokerId="form.broker" :houseType="form.houseType"></login>
    <finish v-if="showTableIndex == 1" :time="form.time" :brokerId="form.broker" :houseType="form.houseType"></finish>
    <issue v-if="showTableIndex == 2" :time="form.time" :brokerId="form.broker" :houseType="form.houseType"></issue>
    <need v-if="showTableIndex == 3" :time="form.time" :brokerId="form.broker" :houseType="form.houseType"></need>
    <users v-if="showTableIndex == 4" :time="form.time" :brokerId="form.broker" :houseType="form.houseType"></users>
    <el-card class="countChart" v-if="showTableIndex == 100">
      <div slot="header">
        数据图表
        <!-- （总访问<span class="Num"> 79</span> 次） -->
        <span class="fr">
          <!-- <el-button type="success" size="mini"> 查看详情</el-button> -->
        </span>
      </div>
      <div>
        <chart :options="view" :theme='theme'></chart>
      </div>
    </el-card>
    <el-dialog  title="我的二维码"
  :visible.sync="qrcodeDialog"
  width="400px">
  <div class="dataQRcode">
    <a :href="`${BASE_API}qrcode/${this.getBroker()}.png`" download="我的二维码">
    <img  @click="downloadImg" :src="`${BASE_API}qrcode/${this.getBroker()}.png`" :download="`${BASE_API}qrcode/${this.getBroker()}.png`" class="" />
    </a>
  </div>
  </el-dialog>
    <audio  ref="audio1" height="100" width="100">
      <source src="../../mp3/123.mp3" type="audio/mp3" />
    <embed height="100" width="100" src="song.mp3" />
    </audio>
    </el-main>


  </div>
</template>

<script>
// import io from 'socket.io-client'
import chart from "vue-echarts";
import test from "./test";
import views from "./view";
import finish from "./finish";
import issue from "./issue";
import need from "./need";
import users from "./users";
import login from "./login";
import url from "@/utils/url";
import { dataChart, chartIndex, getBrokerLists } from "@/utils/data";

export default {
  components: {
    chart,
    test,
    views,
    finish,
    issue,
    need,
    users,
    login
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,

      qrcodeDialog: false, //获取二维码
      form: {
        time: [
          new Date().getTime() - 3600 * 24 * 7 * 1000,
          new Date().getTime()
        ],
        broker: "",
        houseType: ""
      },
      houseType: [
        { label: "全部", value: "" },
        { label: "二手房", value: "2" },
        { label: "租房", value: "3" },
        { label: "新房", value: "1" }
      ],
      brokerLists: [],
      count: [
        { label: "访问量", value: "0", url: "/" },
        { label: "成交量", value: "0", url: "/" },
        { label: "发布量", value: "0", url: "/" },
        { label: "需求量", value: "0", url: "/" },
        { label: "会员量", value: "0", url: "/" }
      ],
      theme: "light", //更换主题
      view: {
        legend: {
          data: ["访问量", "成交量", "发布量", "需求量", "会员量"]
        },
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "访问量",
            data: [0, 0],
            type: "line",
            areaStyle: {}
          },
          {
            name: "成交量",
            data: [0, 0],
            type: "line",
            areaStyle: {}
          },
          {
            name: "发布量",
            data: [0, 0],
            type: "line",
            areaStyle: {}
          },
          {
            name: "需求量",
            data: [0, 0],
            type: "line",
            areaStyle: {}
          },
          {
            name: "会员量",
            data: [0, 0],
            type: "line",
            areaStyle: {}
          }
        ]
      },
      showTableIndex: 100
    };
  },
  methods: {
    // 获取二维码
    getMyqrCode() {
      this.qrcodeDialog = true;
    },
    downloadImg() {
      console.log("下载图片");
    },
    showTable(i) {
      this.showTableIndex = i;
    },
    search() {
      //查询
      /**@augments
       * 传入 开始时间- 结束时间
       * 经纪人ID
       */
      let { time, broker, houseType } = this.form;
      // this.getViewChart(time[1], time[0], broker, houseType);
      this.getFinishChart(time[1], time[0], broker, houseType);
      this.getIssueChart(time[1], time[0], broker, houseType);
      this.getNeedChart(time[1], time[0], broker, houseType);
      this.getUsersChart(time[1], time[0], broker, houseType);
      this.getLoginChart(time[1], time[0], broker, houseType);
    },
    playAudio(){
      let audio = this.$refs['audio1'];
      audio.play()
    },
    // 获取访问量
    // async getViewChart(lt, gt, broker, houseType) {
    //   let viewData = await chartIndex("/data/views", lt, gt, broker, houseType);
    //   this.view.xAxis.data = viewData.xData;
    //   this.view.series[0].data = viewData.yData;
    //   this.count[0].value = viewData.count;
    // },
    // 登录量
    async getLoginChart(lt, gt, broker, houseType) {
      let viewData = await chartIndex("/data/login", lt, gt, broker, houseType);
      console.log("getLoginChart :", viewData);
      this.view.xAxis.data = viewData.xData;
      this.view.series[0].data = viewData.yData;
      this.count[0].value = viewData.count;
    },
    // 获取成交量
    async getFinishChart(lt, gt, broker, houseType) {
      let finishData = await chartIndex(
        "/data/finish",
        lt,
        gt,
        broker,
        houseType
      );
      this.view.series[1].data = finishData.yData;
      this.count[1].value = finishData.count;
    },
    // 获取发布量
    async getIssueChart(lt, gt, broker, houseType) {
      console.log(lt, gt, broker, houseType);

      let issuedData = await chartIndex(
        "/data/issue/1",
        lt,
        gt,
        broker,
        houseType
      );
      this.view.series[2].data = issuedData.yData;
      this.count[2].value = issuedData.count;
    },
    async getNeedChart(lt, gt, broker, houseType) {
      let issuedData = await chartIndex(
        "/data/issue/0",
        lt,
        gt,
        broker,
        houseType
      );
      this.view.series[3].data = issuedData.yData;
      this.count[3].value = issuedData.count;
    },

    async getUsersChart(lt, gt, broker, houseType) {
      let usersData = await chartIndex("/data/users", lt, gt, broker);
      this.view.series[4].data = usersData.yData;
      this.count[4].value = usersData.count;
    },

    async BrokerLists() {
      let a = await getBrokerLists();
      this.brokerLists = a.data;
    }
  },
  created() {
    if (this.isBroker()) {
      this.form.broker = this.getBroker();
    }
  },
  async mounted() {
    let { time, broker, houseType } = this.form;
    // this.getViewChart(time[1], time[0], broker, houseType);
    this.getFinishChart(time[1], time[0], broker, houseType);
    this.getIssueChart(time[1], time[0], broker, houseType);
    this.getNeedChart(time[1], time[0], broker, houseType);
    this.getUsersChart(time[1], time[0], broker, houseType);
    this.getLoginChart(time[1], time[0], broker, houseType);
    this.BrokerLists();
  },
  sockets: {
    addUser(res) {
     
      if(this.getBroker()){
        // 如果经纪人登录
        if(res.brokerId){
          // 如果用户的经纪人存在
          if(res.brokerId == this.getBroker()){
            //相同经纪人执行
            console.log(true);
            this.playAudio()
          }else{
            console.log(false)
          }
        }else{
          //待定  未绑定经纪人用户
        }
      }else{
        //直接执行
        console.log(true)
            this.playAudio()
        
      }
    }
  }
};
</script>

<style scoped lang="scss">
.echarts {
  height: 300px;
  width: 100%;
}
.countChart {
  .num {
    font-size: 1.5em;
  }
}
.dataQRcode {
  text-align: center;
  img {
    width: 100%;
  }
}
</style>