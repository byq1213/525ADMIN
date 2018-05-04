<template>
  <div>
    <!-- 页面设置
     -->
     <el-main>
       <el-tabs type="border-card" style="min-height:300px;">
         <el-tab-pane label="推荐房源">
           <el-form :model="recommendForm">
             <el-form-item label=""></el-form-item>
             <el-form-item label=""><el-button type="success" @click="addHouse"> 添加房源</el-button></el-form-item>
           </el-form>
           <el-table :data="recommendLists">
             <el-table-column label="编号" prop="code"></el-table-column>
             <el-table-column label="房源类型" prop="houseType">
               <template slot-scope="scope">
                 <span v-if="scope.row.houseType == 1">新房</span>
                 <span v-else-if="scope.row.houseType == 2">二手房</span>
                 <span v-else>租房</span>
               </template>
             </el-table-column>
             <el-table-column label="房源名称" prop="houseName"></el-table-column>
             <el-table-column label="房源图片">
               <template slot-scope="scope">

                 <img class="houseImg" :src="BASE_API+'uploads/'+scope.row.houseImg[0]" alt="">
               </template>
             </el-table-column>
             <el-table-column label="添加时间" prop="time">
               <template slot-scope="scope">
                 <span v-text="scope.store.table.timetrans(scope.row.time)"></span>
               </template>
             </el-table-column>
             <el-table-column label="操作">
               <template slot-scope="scope">
                 <el-button type="warning" size="small" @click="delRecommend(scope.row._id)">删除</el-button>
               </template>
               
             </el-table-column>
           </el-table>
         </el-tab-pane>
         <el-tab-pane label="轮播图设置">

         </el-tab-pane>
       </el-tabs>
       <el-dialog 
       title="选择房源"
       :visible.sync="addHouseDialog"
       >
         <el-tabs >
           <el-tab-pane label="租房">
             <el-table :data="house3Lists" size="mini" >
               <el-table-column label="编号" prop="code"></el-table-column>
               <el-table-column label="名称" prop="name"></el-table-column>
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
         </el-tabs>
       </el-dialog>
     </el-main>
  </div>
</template>

<script>
import url from '@/utils/url'

  export default {
    data() {
      return {
        BASE_API:process.env.BASE_API,
        recommendForm:{},
        recommendLists:[],
        addHouseDialog:false,//动态模糊狂
        house3Lists:[],//租房
        house2Lists:[],//二手房
        house1Lists:[],//新房
      }
    },
    methods:{
      delRecommend(_id){
        url.delete(`/recommend/${_id}`,)
          .then(res=>{
            if(res.data.code == 200){
              this.getRecommendIndexLists()
            }
          })
      },
      getRecommendIndexLists(){
        url.get('/recommend')
          .then(res =>{
            this.recommendLists = res.data.recommendLists
          })
      },
      addHouse(){
        this.addHouseDialog = true;
        // 当租房列表为空时 从服务器端获取租房数据
        if(this.house3Lists.length == 0){
          this.getHouse3Lists();
        }
      },
      getHouse3Lists(){
        url.get('/house')
          .then(res =>{
            this.house3Lists = res.data
          })
      },

      //选择推荐房源
      chooseHouse(houseIndex,houseType){
        let houseInfo = this.house3Lists[houseIndex]
        url.post('/recommend',{
          houseType:houseType,
          houseName:houseInfo.name,
          houseImg:houseInfo.imgPath,
          time:Date.parse(new Date()),
          code:houseInfo.code
        })
          .then(res =>{
            if(res.data.code == 200){
              this.getRecommendIndexLists()
            }
          })
      }
    },
    mounted(){
      this.getRecommendIndexLists()
    }
  }
</script>

<style scoped>
  .houseImg{
    max-height: 2em;
  }
</style>