<template>
  <div>
    <!-- 租房列表 -->
    <el-form :model="form" :inline="true" size="small">
      <!-- <el-form-item label="关键词">
            <el-input v-model="form.keyword" placeholder="可搜索编号、名称"></el-input>
          </el-form-item>
          
          <el-form-item label="">
            <el-button type="primary">搜索</el-button>
          </el-form-item> -->

      <el-form-item label="">
        <el-input v-model="form.keyword" placeholder="请输入关键词搜索"></el-input>
      </el-form-item>
      <el-form-item label="租金">
        <el-input v-model.number="form.rent[0]" placeholder="" class="rentInput"></el-input>
        <span>-</span>
        <el-input v-model.number="form.rent[1]" placeholder="" class="rentInput"></el-input>
        <SPAN>元/月</SPAN>
      </el-form-item>
      <el-form-item label="面积">
        <el-input v-model.number="form.proportion[0]" placeholder="" class="rentInput"></el-input>
        <span>-</span>
        <el-input v-model.number="form.proportion[1]" placeholder="" class="rentInput"></el-input>
        <SPAN>㎡</SPAN>
      </el-form-item>
      <el-form-item label="出租方式">
        <el-select v-model="form.type" placeholder="">
          <el-option label="全部" :value='2'></el-option>
          <el-option label="整租" :value='0'></el-option>
          <el-option label="合租" :value='1'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="search" native-type="submit">查询</el-button>
      </el-form-item>
      <el-form-item label="" v-if="!this.isBroker()">
        <el-button type="" @click="downHouseLists = true">下架列表</el-button>
      </el-form-item>
                <el-form-item label="">
            <el-button type="success" @click="extendDialog  = true">附加搜索</el-button>
          </el-form-item>

    </el-form>
    <el-table :data="lists">
      <el-table-column label="编号" prop="code"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="租金" prop="rent">
        <template slot-scope='scope'>
          <span v-text="`${scope.row.rent}元/月`"></span>
        </template>
      </el-table-column>
      <el-table-column label="面积" prop="proportion">
        <template slot-scope='scope'>
          <span v-text="`${scope.row.proportion}㎡`"></span>
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type">合租</span>
          <span v-else>整租</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间">
        <template slot-scope='scope'>
          <span v-text="`${new Date(scope.row.time).toLocaleString()}`"></span>
        </template>
      </el-table-column>
      <el-table-column label="备注信息" prop="remark"></el-table-column>
      <el-table-column label="操作" min-width="200px" type="expand" v-if="!this.isBroker()">
        <template slot-scope="scope">
          <div style="float:right">
            <el-button type="warning" size="mini" @click="followLog(scope.row._id,scope.row.name)">跟进记录</el-button>
            <el-button type="primary" size="mini" @click="editHouse3(scope.row._id)">修改</el-button>
            <el-button type="" size="mini" @click="viewHouse3Info(scope.row._id)">详情</el-button>
            <el-button type="danger" size="mini" @click="downHouse(scope.row._id)">下架</el-button>
            <el-button type="success" size="mini" @click="showQrcode(scope.row._id)">小程序码</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="查看" v-else type="expand">
        <template slot-scope='scope'>
          <div style="float:right">
            <el-button type="warning" size="mini" @click="followLog(scope.row._id,scope.row.name)">跟进记录</el-button>
            <el-button type="" size="mini" @click="viewHouse2Info(scope.row._id)">详情</el-button>
            <el-button type="success" size="mini" @click="showQrcode(scope.row._id)">小程序码</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="下架列表" :visible.sync="downHouseLists">
      <downHouse2 :status="downHouseLists" :houseType="3"></downHouse2>
    </el-dialog>
    <el-dialog title="房源信息" :visible.sync="dialogVisible" width="400px">
      <house3View :house3Id="house3Id"></house3View>
    </el-dialog>
        <!-- 附加搜索 -->
    <el-dialog title="附加搜索" :visible.sync="extendDialog" width="80%">
      <el-form :model="extendForm" :inline="true" size="small">
        <el-form-item label="">
          <el-input v-model="extendForm.cell" placeholder="请输入小区名" class="w10"></el-input>
          小区
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="extendForm.build" placeholder="请输入楼区信息" class="w10"></el-input>
          楼（座、栋）
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="extendForm.unit" placeholder="请输入单元信息" class="w10"></el-input>
          单元
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="extendForm.floor" placeholder="请输入楼层信息" class="w10"></el-input>
          层
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="extendForm.number" placeholder="请输入房间信息" class="w10"></el-input>
          室
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="extendSearch">搜索</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button type="" @click="extendForm={}; extendSearch()">重置</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import url from "@/utils/url";
import downHouse2 from "./downHouse2";
import house3View from "./house3View";
export default {
  components: {
    downHouse2,
    house3View //获取详细信息
  },
  mounted() {
    this.getHouseLists1();
  },
  data() {
    return {
      dialogVisible: false,
      downHouseLists: false,
      form: {
        rent: [],
        proportion: [],
        type: 2
      },
      lists: [],
      house3Id: "",
      extendDialog: false,
      extendForm: {} //附加 信息搜索
    };
  },
  methods: {
    //添加附加搜索
    extendSearch() {
      this.getHouseLists1(this.extendForm);
      this.extendDialog = false;
      this.extendForm = {};
    },
    //跟进记录
    followLog(_id, name) {
      this.$emit("showFollowHouse", {
        _id,
        name
      });
    },
    //搜索查询
    search() {
      console.log(this.form);
      this.getHouseLists1(this.form);
    },
    // 租房
    getHouseLists1(conditions) {
      url.post("/house3Lists", conditions).then(res => {
        this.lists = res.data;
      });
    },
    showQrcode(_id) {
      this.$emit("qrCodeEvent", {
        _id,
        houseType: 3
      });
    },
    // 查看出租房详细信息
    viewHouse3Info(id) {
      this.house3Id = id;
      this.dialogVisible = true;
    },

    //下架出租房
    downHouse(id) {
      this.$confirm("此操作将下架该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          url.delete(`/house/${id}`).then(res => {
            let code = res.data.code;
            if (code == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getHouseLists1();
            } else {
              this.$message({
                type: "success",
                message: "网络错误!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架"
          });
        });
      return;
    },

    //修改信息
    editHouse3(id) {
      this.$router.push(`/House/add3/${id}`);
    }
  },
  watch: {
    downHouseLists(res) {
      if (res == false) {
        this.getHouseLists1();
      }
    }
    // "form.rent"(res) {
    //   console.log("res :", res);
    //   let num = res[0];
    //   if (res[0] > res[1]) {
    //     res[0] = res[1];
    //     res[1] = num;
    //   }
    // }
  }
};
</script>

<style scoped>
.rentInput {
  width: 80px;
}
</style>
