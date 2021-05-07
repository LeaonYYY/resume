<template>
  <div id="adminBox">
    <span id="box1">
      <span id="user_show_head">
        <i
          class="el-icon-s-custom"
          style="font-size: 50px; margin-top: 20px"
        ></i>
        <span>
          {{ username }}
          
        </span>
      </span>
      <span id="user_show_body">
        <el-menu
          :default-ative="this.$router.path"
          router
          class="el-menu-vertical-demo"
          mode="vertical"
          background-color="white"
          text-color="black"
        >
          <el-menu-item index="/MCharge">组织管理</el-menu-item>
          <el-menu-item index="/adminMSelfdata">个人信息</el-menu-item>
        </el-menu>
        <el-button type="danger" @click="logout">注销</el-button>
      </span>
    </span>
    <span id="box2">
      <router-view></router-view>
    </span>
  </div>
</template>


<script>
export default {
  name: "admin",
  data() {
    return {
      username: "超级管理员",
    };
  },
  methods:{
    logout:function(){
      this.$axios({
        method:'post',
        url:'http://106.14.255.214:8080/XierJianli/logout.do',
        headers: { 'X-CSRF-TOKEN':  localStorage.token }
      }) 
      localStorage.setItem('loginFlag',false);
      localStorage.setItem('username','')
      this.$router.push('/home')
    }
  }
};
</script>

<style>
</style>
<style scoped>
#adminBox {
  display: flex;
  height: 670px;
  width: 1350px;
  font-family: "微软雅黑";
}
#box1 {
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  border: solid 1px black;
}
#user_show_head {
  flex: 2;
  flex-direction: column;
  background: linear-gradient(rgb(73, 144, 238), white);
  align-items: center;
}
#box1 span:nth-child(2) {
  flex: 8;
 
}
#box2 {
  flex: 9;
  border:solid 1px gray
}
#user_show_head {
  display: flex;
  justify-content: center;
}
#user_show_body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-menu {
  min-width: 130px !important;
  text-align: center;
}
</style>