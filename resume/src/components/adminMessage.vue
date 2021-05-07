<template>
  <div id="msg">
      <h3>通知信息</h3>
      <ul>
          <li v-for="msg in msgs" :key="msg.id">
              <span>内容：{{msg.content}}</span>
              <span>时间：{{msg.sendTime}}</span>
              <span> <el-button size="mini" @click="deleMsg(msg.id)">我知道了</el-button></span>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  name: "msg",
  beforeCreate() {
    this.$axios({
      url: "http://106.14.255.214:8080/XierJianli/user/getSelfMessages.do",
      method: "get",
    }).then((response) => {
      console.log(response.data.data);
      for (var i = 0; i < response.data.data.length; i++) {
        this.$set(this.msgs, i, response.data.data[i]);
        this.msgs[i].sendTime=this.msgs[i].sendTime.substr(0,19)
      }
    });
  },
  data() {
    return {
      msgs: [],
    };
  },
  methods:{
      deleMsg:function(id){
          var temp = new FormData();
          console.log(id);
          temp.append('messageId',id);
          this.$axios({
              url:"http://106.14.255.214:8080/XierJianli/user/deleteMessageById.do",
              method:"post",
              data:temp,
              headers: { 'X-CSRF-TOKEN':  localStorage.token }
          }) .then(response =>{
              console.log(response);
          })
          this.$router.go(0)
      }
  }
};
</script>
<style scoped>
ul {
  margin: 0;
  list-style: none;
}
#msg {
  height: 660px;
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 80%;
}
</style>