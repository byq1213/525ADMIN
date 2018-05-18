<template>
  <div>
    <el-main>
      <img v-if="BASE_API" :src="`${BASE_API}qrcode/${AdminToken}.png`" />
      <el-button type="success" @click="getqrCode">获取二维码</el-button>
      </el-main>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import url from '@/utils/url';
  export default {
    mounted(){
      this. AdminToken = Cookies.get('Admin-Token')
    },
    data() {
      return {
            BASE_API: process.env.BASE_API,
            AdminToken: ''
      }
    },
    methods:{
      getqrCode(){
        url.post('/qrcode',{id:this.AdminToken}).then(res=>{
          })
          location.reload()
      }
    }
  }
</script>

<style scoped>

</style>