<template>
  <div>
    <!-- 发布量 -->
    <el-main>
      <el-form :model="form" :inline="true" >
        <el-form-item label="时间段查询">
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            :picker-options="this.$store.state.app.pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            align="right"
            >
          </el-date-picker>
          </el-form-item>
          <el-form-item label="房源类型">
            <el-select v-model="form.type" placeholder="">
              <el-option value="" label="全部"></el-option>
              <el-option value="0" label="出售"></el-option>
              <el-option value="1" label="出租"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item label="">
          </el-form-item>
      </el-form>
      <el-table :data="lists" border >
        <el-table-column label="头像" prop="uid.avatarUrl">
          <template slot-scope='scope'>
             <img v-if="scope.row.uid.avatarUrl" :src="scope.row.uid.avatarUrl" class="avatarUrl" alt="">
             <span v-else v-text="'尚未提供信息'"></span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="uid.nickName">
          <template slot-scope='scope'>
            <span v-if="scope.row.uid.nickName" v-text="scope.row.uid.nickName" ></span>
             <span v-else v-text="'尚未提供信息'"></span>
          </template>

        </el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="联系方式" prop="phone"></el-table-column>
        <el-table-column label="发布类型" prop="mode">
          <template slot-scope='scope'>
             <span v-if="scope.row.mode ==2">租房</span>
             <span v-else-if="scope.row.mode == 3">买房</span>
             <span v-else-if="scope.row.mode == 0">出售</span>
             <span v-else-if="scope.row.mode == 1">出租</span>
          </template>
        </el-table-column>
        <el-table-column label="房源面积" prop="area"></el-table-column>
        <el-table-column label="房源地址" prop="address"></el-table-column>
        <el-table-column label="出租方式" prop="rentMode">
          <template slot-scope='scope'>
          <span v-if="scope.row.rentMode ==1"  >合租</span>
          <span v-else-if="scope.row.rentMode ==0"  >整租</span>
          <span v-else v-text="'---'"></span>
          <!-- <span v-if="scope.row.rentMode = 1" v-text="合租"></span>
          <span v-else-if="scope.row.rentMode = 0" v-text="整租"></span>
          <span v-else v-text="'--'"></span> -->
          </template>
        </el-table-column>
        <el-table-column label="房源描述" prop="remarks"></el-table-column>
        <!-- <el-table-column label="操作" prop=""></el-table-column> -->
        <!-- <el-table-column label="电话" prop="uid.phone"></el-table-column> -->
        <el-table-column label="添加时间" prop="">
          <template slot-scope='scope'>
             <span v-text="scope.store.table.timetrans(scope.row.time)"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope='scope'>
            <el-button type="" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="count"
          @current-change="changePage"
          :page-size="limit">
        </el-pagination>
      </div>
    </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";

export default {
  mounted() {
    this.getViewsLists();
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,

      form: {
        type: "",
        time: [new Date().getTime() - 3600 * 24 * 1000, new Date().getTime()]
      },
      lists: [],
      limit: this.$store.state.app.limit,
      count: 0,
      skip: 0
    };
  },
  methods: {
    // 条件查询
    search() {
      this.getViewsLists();
    },

    //改变页码
    changePage(page) {
      this.getViewsLists(page - 1);
    },
    getViewsLists(skip = this.skip, limit = this.limit) {
      // 获取发布列表
      /**
       * body.lt 最大值 现在时间
       * body.gt 最小值 设定时间
       *       time: {
        $gt: gt,
        $lt: lt
      }
       */
      let { time, type } = this.form;
      let condition = {
        time: {
          $gt: time[0],
          $lt: time[1]
        },
        //全部还是  出租、出售 后台判断如果为‘’   则          $or: [{ mode: 1 }, { mode: 0 }]
        mode: type
      };
      console.log(condition);

      url
        .post(`/issue`, { condition, limit: limit, skip: skip * limit })
        .then(res => {
          this.lists = res.data.lists;
          this.count = res.data.count;
        });
    }
  }
};
</script>

<style scoped>
/* .houseImg{
  width: 100px;
} */
</style>