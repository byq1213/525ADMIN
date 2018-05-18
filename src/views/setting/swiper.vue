<template>
  <div>
    <!-- 轮播图设置 -->
    <el-main>
      <el-form :model="form">
        <el-form-item label="">
          <el-button type="success" @click="dialogVisible = true">添加轮播图</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="lists">
        <el-table-column label="图片" prop="">
          <template slot-scope='scope'>
             <img :src="BASE_API+'uploads/'+scope.row.imgPath" alt="" class="avatarUrl">
          </template>
        </el-table-column>
        <el-table-column label="房源链接" prop="">
          <template slot-scope='scope'>
             <span v-text="scope.row.houseName"></span>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" prop="time">
          <template slot-scope='scope'>
             <span v-text="new Date().toLocaleString()"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="">
          <template slot-scope='scope'>
             <el-button type="warning" size="small" @click="delSwiper(scope.row._id)"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog 
      title="新增轮播图"
      :visible.sync="dialogVisible"
      >
      <el-form :model="form" size="small" label-width="100px">
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            :action="BASE_API + 'uploadFile'"
            :on-success="uploadSuccess"
            :show-file-list="false"
            >
            <img v-if="form.imgPath" :src="BASE_API + 'uploads/'+ form.imgPath" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
        <el-form-item label="关联房源">
          <el-input v-model="form.houseName" disabled="" placeholder="" class="w20"></el-input>
          <el-button type="success" @click="addHouse"> 关联房源</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button type="" @click="saveData">添加</el-button>
        </el-form-item>
      </el-form>
      
      </el-dialog>
             <el-dialog 
       title="选择房源"
       :visible.sync="addHouseDialog"
       >
         <el-tabs >
          <el-tab-pane label="二手房">
             <el-table :data="house2Lists" size="mini" >
               <el-table-column label="编号" prop="code"></el-table-column>
               <el-table-column label="名称" prop="name"></el-table-column>
               <el-table-column label="参考价格" prop="rent"></el-table-column>
               <el-table-column label="图片" prop="imgPath">
                 <template slot-scope="scope">
                 <img v-if="scope.row.imgPath" class="houseImg" :src="BASE_API+'uploads/'+scope.row.imgPath[0]" alt="">
                 </template>
               </el-table-column>
               <el-table-column label="选择">
                 <template slot-scope="scope">
                   <el-button type="primary" size="mini" @click="chooseHouse(scope.$index,2)">选择</el-button>
                 </template>
                 
               </el-table-column>
             </el-table>
           </el-tab-pane>
           <el-tab-pane label="租房">
             <el-table :data="house3Lists" size="mini" >
               <el-table-column label="编号" prop="code"></el-table-column>
               <el-table-column label="名称" prop="name"></el-table-column>
               <el-table-column label="参考价格" prop="rent"></el-table-column>
               <el-table-column label="图片" prop="imgPath">
                 <template slot-scope="scope">
                 <img v-if="scope.row.imgPath" class="houseImg" :src="BASE_API+'uploads/'+scope.row.imgPath[0]" alt="">
                 </template>
               </el-table-column>
               <el-table-column label="选择">
                 <template slot-scope="scope">
                   
                   <el-button type="primary" size="mini" @click="chooseHouse(scope.$index,3)">选择</el-button>
                 </template>
                 
               </el-table-column>
             </el-table>
           </el-tab-pane>
           <el-tab-pane label="新房">
             <el-table :data="house1Lists" size="mini" >
               <el-table-column label="编号" prop="code"></el-table-column>
               <el-table-column label="名称" prop="name"></el-table-column>
               <el-table-column label="参考价格" prop="rent"></el-table-column>
               <el-table-column label="图片" prop="imgPath">
                 <template slot-scope="scope">
                 <img v-if="scope.row.imgPath" class="houseImg" :src="BASE_API+'uploads/'+scope.row.imgPath[0]" alt="">
                 </template>
               </el-table-column>
               <el-table-column label="选择">
                 <template slot-scope="scope">
                   <el-button type="primary" size="mini" @click="chooseHouse(scope.$index,1)">选择</el-button>
                 </template>
               </el-table-column>
             </el-table>
           </el-tab-pane>
         </el-tabs>
       </el-dialog>
    </el-main>
  </div>
</template>

<script>
import url from "@/utils/url";

export default {
  mounted() {
    this.getSwiperLists();
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      dialogVisible: false,
      lists: [],
      form: {
        imgPath: ""
      },
      addHouseDialog: false, //动态模糊狂
      house3Lists: [], //租房
      house2Lists: [], //二手房
      house1Lists: [] //新房
    };
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      console.log(response);

      this.form.imgPath = response.files[0];
    },

    addHouse() {
      this.addHouseDialog = true;
      // 当租房列表为空时 从服务器端获取租房数据
      if (this.house1Lists.length == 0) {
        this.getHouse1Lists();
      }
      if (this.house2Lists.length == 0) {
        this.getHouse2Lists();
      }
      if (this.house3Lists.length == 0) {
        this.getHouse3Lists();
      }
    },
    // 获取新房列表
    getHouse1Lists() {
      url.get("/houseNew").then(res => {
        this.house1Lists = res.data;
      });
    },
    // 获取二手房列表
    getHouse2Lists() {
      url.get("/house2").then(res => {
        this.house2Lists = res.data;
      });
    },
    //获取租房列表
    getHouse3Lists() {
      url.get("/house").then(res => {
        this.house3Lists = res.data;
      });
    },
    chooseHouse(houseIndex, houseType) {
      let houseInfo = this[`house${houseType}Lists`][houseIndex];
      this.form.houseType = houseType;
      this.form.houseName = houseInfo.name;
      this.form.houseId = houseInfo._id;
      this.form.houseImg = houseInfo.imgPath;
      this.addHouseDialog = false;
    },
    saveData() {
      url.post("/swiper", this.form).then(res => {
        if (res.data.code == 200) {
          this.form = {
            imgPath: ""
          };
          this.getSwiperLists();
          this.dialogVisible = false;
        }
      });
    },
    getSwiperLists() {
      url.get("/swiper").then(res => {
        this.lists = res.data.data;
      });
    },
    delSwiper(id) {
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          url.delete(`/swiper/${id}`).then(res => {
            let code = res.data.code;
            if (code == 200) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.getSwiperLists();
            } else {
              this.$message({
                type: "warning",
                message: "网络错误!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  }
};
</script>

<style scoped>
.houseImg {
  max-height: 2em;
}
</style>