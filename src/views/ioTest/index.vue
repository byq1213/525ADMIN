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
      id: ""
    };
  },
  mounted() {
    this.id = this.$socket.id;
    console.log('this.id :', this.id);
    this.$socket.emit('chat',true)
    // this.$socket.emit('connect1',{id:this.id,test:'123234'})
  },
  methods: {
    sendSocketIO() {
      this.$socket.emit("test_even", "asdasdasd");
    }
  },
  sockets: {
    connect() {
      console.log('connect');
      this.id = this.$socket.id;
    },
    customEmit: function(val) {
      //这里是监听customEmit事件
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
    news(res) {
      console.log("newsres :", res);
    },
    res(res) {
      console.log("res :", res);
    },
    addUser(res) {
      console.log(res);
    }
  }
};
</script>

<style scoped>
</style>

