<template>
  <div class="app-container">
asd
<el-button type="" @click="sendSocketIO">SEND IO</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      id:'',
    };
  },
  mounted(){
    this.id=this.$socket.id
    this.$socket.on("res",(res)=>{ console.log(res)})
  },
  methods: {
    sendSocketIO(){
      console.log('test_even');
      
      this.$socket.emit('test_even','asdasdasd')
    }
  },
  sockets: {
    connect() {
      this.id = this.$socket.id;
    },
    customEmit() {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    }
  }
};
</script>

<style scoped>
</style>

