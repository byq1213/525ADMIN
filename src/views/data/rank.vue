<template>
  <div>
    <!-- 经纪人排行 -->
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
          <el-button type="" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col :span="24" class="app-item">
          <el-card>
            <div slot="header">
              综合量排名
            </div>
            <div>
              <el-table :data="countData">
                <el-table-column label="" type="index"></el-table-column>
                <el-table-column label="">
                                    <template slot-scope='scope'>
                  <img :src="`${BASE_API}uploads/${scope.row.brokerInfo.brokerAvatarUrl}`" alt="" class="avatarUrl">
                  </template>

                </el-table-column>
                <el-table-column label="经纪人" prop="brokerInfo.brokerName"></el-table-column>
                <el-table-column label="成交量" prop="finishCount">
                  <template slot-scope='scope'>
                    <span v-if="scope.row.finishCount" v-text="scope.row.finishCount"></span>
                     <span v-else v-text="'0'"></span>
                  </template>
                </el-table-column>
                <el-table-column label="访问量" prop="viewCount">
                  <template slot-scope='scope'>
                    <span v-if="scope.row.viewCount" v-text="scope.row.viewCount"></span>
                     <span v-else v-text="'0'"></span>
                  </template>
                </el-table-column>
                <el-table-column label="需求量" prop="needCount">
                  <template slot-scope='scope'>
                    <span v-if="scope.row.needCount" v-text="scope.row.needCount"></span>
                     <span v-else v-text="'0'"></span>
                  </template>
                </el-table-column>
                <el-table-column label="发布量" prop="issueCount">
                  <template slot-scope='scope'>
                    <span v-if="scope.row.issueCount" v-text="scope.row.issueCount"></span>
                     <span v-else v-text="'0'"></span>
                  </template>
                </el-table-column>
                <el-table-column label="会员量" prop="usersCount">
                  <template slot-scope='scope'>
                    <span v-if="scope.row.usersCount" v-text="scope.row.usersCount"></span>
                     <span v-else v-text="'0'"></span>
                  </template>
                </el-table-column>
                <el-table-column label="总计" prop="">
                  <template slot-scope='scope'>
                    <span v-if="scope.row.result" v-text="scope.row.result"></span>
                     <span v-else v-text="'0'"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="12" class="app-item">
          <el-card >
            <div slot="header">
              <span>访问量排名</span>
            </div>
            <div>
              <el-table :data="loginLists" size="small">
                <el-table-column label="" type="index"></el-table-column>
                <el-table-column label="">
                  <template slot-scope='scope'>
                  <img :src="`${BASE_API}uploads/${scope.row.brokerInfo.brokerAvatarUrl}`" alt="" class="avatarUrl">
                  </template>
                </el-table-column>
                <el-table-column label="经纪人" prop="brokerInfo.brokerName"></el-table-column>
                <el-table-column label="访问量" prop="count">
                  <template slot-scope='scope'>
                     <span v-if="scope.row.count" v-text="scope.row.count"></span>
                     <span v-else v-text="'0'"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" class="app-item">
          <el-card >
            <div slot="header">
              <span>成交量排名</span>
            </div>
            <div>
              <el-table :data="finishLists" size="small">
                <el-table-column label="" type="index"></el-table-column>
                <el-table-column label="">
                  <template slot-scope='scope'>
                  <img :src="`${BASE_API}uploads/${scope.row.brokerInfo.brokerAvatarUrl}`" alt="" class="avatarUrl">
                  </template>
                </el-table-column>
                <el-table-column label="经纪人" prop="brokerInfo.brokerName"></el-table-column>
                <el-table-column label="成交量" prop="count">
                  <template slot-scope='scope'>
                     <span v-if="scope.row.count" v-text="scope.row.count"></span>
                     <span v-else v-text="'0'"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" class="app-item">
          <el-card >
            <div slot="header">
              <span>发布量排名</span>
            </div>
            <div>
              <el-table :data="issueLists" size="small">
                <el-table-column label="" type="index"></el-table-column>
                <el-table-column label="">
                  <template slot-scope='scope'>
                  <img :src="`${BASE_API}uploads/${scope.row.brokerInfo.brokerAvatarUrl}`" alt="" class="avatarUrl">
                  </template>
                </el-table-column>
                <el-table-column label="经纪人" prop="brokerInfo.brokerName"></el-table-column>
                <el-table-column label="发布量" prop="count">
                  <template slot-scope='scope'>
                     <span v-if="scope.row.count" v-text="scope.row.count"></span>
                     <span v-else v-text="'0'"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
         <el-col :span="12" class="app-item">
          <el-card >
            <div slot="header">
              <span>需求量排名</span>
            </div>
            <div>
              <el-table :data="needLists" size="small">
                <el-table-column label="" type="index"></el-table-column>
                <el-table-column label="">
                  <template slot-scope='scope'>
                  <img :src="`${BASE_API}uploads/${scope.row.brokerInfo.brokerAvatarUrl}`" alt="" class="avatarUrl">
                  </template>
                </el-table-column>
                <el-table-column label="经纪人" prop="brokerInfo.brokerName"></el-table-column>
                <el-table-column label="需求量" prop="count">
                  <template slot-scope='scope'>
                     <span v-if="scope.row.count" v-text="scope.row.count"></span>
                     <span v-else v-text="'0'"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
         <el-col :span="12" class="app-item">
          <el-card >
            <div slot="header">
              <span>会员量排名</span>
            </div>
            <div>
              <el-table :data="usersLists" size="small">
                <el-table-column label="" type="index"></el-table-column>
                <el-table-column label="">
                  <template slot-scope='scope'>
                  <img :src="`${BASE_API}uploads/${scope.row.brokerInfo.brokerAvatarUrl}`" alt="" class="avatarUrl">
                  </template>
                </el-table-column>
                <el-table-column label="经纪人" prop="brokerInfo.brokerName"></el-table-column>
                <el-table-column label="会员量" prop="count">
                  <template slot-scope='scope'>
                     <span v-if="scope.row.count" v-text="scope.row.count"></span>
                     <span v-else v-text="'0'"></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";
export default {
  mounted() {
    // this.getViewRank();
    this.getFinishRank();
    this.getIssueRank();
    this.getNeedRank();
    this.getUsersRank();
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      form: {
        time: [
          new Date().getTime() - 3600 * 24 * 7 * 1000,
          new Date().getTime()
        ]
      },
      //访问量排名
      viewLists: [
        {
          brokerName: "王五",
          num: 123,
          brokerInfo: {
            brokerAvatarUrl: ""
          }
        }
      ],
      countRank: [],
      countData: [],
      finishLists: [
        {
          brokerName: "王五",
          num: 123,
          brokerInfo: {
            brokerAvatarUrl: ""
          }
        }
      ],
      issueLists: [
        {
          brokerName: "王五",
          num: 123,
          brokerInfo: {
            brokerAvatarUrl: ""
          }
        }
      ],
      needLists: [
        {
          brokerName: "王五",
          num: 123,
          brokerInfo: {
            brokerAvatarUrl: ""
          }
        }
      ],
      usersLists: [
        {
          brokerName: "王五",
          num: 123,
          brokerInfo: {
            brokerAvatarUrl: ""
          }
        }
      ],
      loginLists: [
        {
          brokerName: "王五",
          num: 123,
          brokerInfo: {
            brokerAvatarUrl: ""
          }
        }
      ]
    };
  },
  methods: {
    // 时间段查询
    search() {
      // this.getViewRank();
      this.getFinishRank();
      this.getIssueRank();
      this.getNeedRank();
      this.getUsersRank();
    },
    getBrokerList() {
      url.get("broker").then(res => {
        this.countRank = res.data.data;
        let data = new Array();
        this.countRank.forEach(item => {
          this.loginLists.forEach(item1 => {
            if (item._id == item1._id) {
              item.viewCount = item1.count ? item1.count : 0;
            }
          });
          this.finishLists.forEach(item2 => {
            if (item._id == item2._id) {
              item.finishCount = item2.count ? item2.count : 0;
            }
          });
          this.issueLists.forEach(item3 => {
            if (item._id == item3._id) {
              item.issueCount = item3.count ? item3.count : 0;
            }
          });
          this.needLists.forEach(item4 => {
            if (item._id == item4._id) {
              item.needCount = item4.count ? item4.count : 0;
            }
          });
          this.usersLists.forEach(item5 => {
            if (item._id == item5._id) {
              item.usersCount = item5.count ? item5.count : 0;
            }
          });
          item.result =
            item.viewCount +
            item.usersCount +
            item.needCount +
            item.issueCount +
            item.finishCount;
          data.push(item);
        });
        let com = (x, y) => {
          //比较函数
          if (x.result < y.result) {
            return 1;
          } else if (x.result > y.result) {
            return -1;
          } else {
            return 0;
          }
        };
        // 求出总的数组
        this.countData = data.sort(com);
      });
    },
    // 获取经纪人访问量排行
    getViewRank() {
      url.post("/rank/view", { time: this.form.time }).then(res => {
        this.viewLists = res.data.sort(this.ArrSort("count"));
      });
    },
    getFinishRank() {
      url.post("/rank/finish", { time: this.form.time }).then(res => {
        this.finishLists = res.data.sort(this.ArrSort("count"));
      });
    },
    // 发布需求
    getIssueRank() {
      url.post("/rank/issue", { time: this.form.time }).then(res => {
        this.issueLists = res.data.sort(this.ArrSort("count"));
      });
    },
    //需求
    getNeedRank() {
      url.post("/rank/need", { time: this.form.time }).then(res => {
        this.needLists = res.data.sort(this.ArrSort("count"));
      });
    },
    getUsersRank() {
      url.post("/rank/users", { time: this.form.time }).then(res => {
        this.usersLists = res.data.sort(this.ArrSort("count"));
        this.getBrokerList();
      });
    },
    getLoginRank() {
      url.post("/rank/login", { time: this.form.time }).then(res => {
        this.loginLists = res.data.sort(this.ArrSort("count"));
        this.getBrokerList();
      });
    },
    ArrSort(property) {
      return function(a, b) {
        if (a[property] == undefined) {
          a[property] = 0;
        }
        if (b[property] == undefined) {
          b[property] = 0;
        }

        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      };
    }
  }
};
</script>

<style scoped>
</style>