<template>
  <div class="wel" id="app">
    <el-menu
      :default-ative="this.$router.path"
      router
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/homepage">首页</el-menu-item>
      <el-menu-item index="/about">关于西二</el-menu-item>
      <el-submenu index="3">
        <template slot="title">方向介绍</template>
        <el-menu-item index="/aboutWEB">前端</el-menu-item>
        <el-menu-item index="/aboutGO">Go语言</el-menu-item>
        <el-menu-item index="/aboutIOS">IOS</el-menu-item>
        <el-menu-item index="/aboutJAVA">Java</el-menu-item>
        <el-menu-item index="/aboutUNITY">Unity</el-menu-item>
        <el-menu-item index="/aboutCP">产品经理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/form">简历投递</el-menu-item>
      <el-menu-item
        ><el-button @click="dialogVisible = true">登录</el-button></el-menu-item
      >
    </el-menu>
    <el-dialog
      title="管理员登录"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form label-width="80px">
        <el-form-item label="用户名：">
          <el-input
            v-model="username"
            placeholder="请输入用户名"
            :min="1"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            v-model="password"
            placeholder="请输入密码"
            show-password
            :min="1"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="buttonType">登录</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-checkbox v-model="remMe">记住我</el-checkbox>
        </el-form-item>
      </el-form>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "1",
      dialogVisible: false,
      name: "",
      major: "",
      email: "",
      QQ: "",
      r_username: "",
      r_password: "",
      r_number: "",
      username: "",
      password: "",
      remMe: true,
    };
  },
  methods: {
    login: function () {
      if (this.username === "") {
        alert("用户名不能为空");
        return;
      }
      if (this.password === "") {
        alert("密码不能为空");
        return;
      }

      var params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);

      this.$axios({
        method: "post",
        url: "http://106.14.255.214:8080/XierJianli/login.do",
        data: params,
      }).then((response) => {
        localStorage.setItem("token", response.data.data.csrfToken);
        this.$axios({
        url:
          "http://106.14.255.214:8080/XierJianli/user/getSelfAllPersonalInfo.do",
        method: "get",
      }).then((response) => {
        console.log(response);
        localStorage.setItem('adminBelong',response.data.data.groupList[0].id)
        if (response.data.data.roleList.length === 0) {
          alert("您没有任何权限，无法登陆");
        } else {
          if (response.data.data.roleList[0].id === 1) {
              localStorage.setItem("loginFlag", true);
              localStorage.setItem("username", this.username);
              this.$router.push("/adminM");
              
            }else if(response.data.data.roleList[0].id === 2){
              localStorage.setItem("loginFlag", true);
              localStorage.setItem("username", this.username);
              this.$router.push("/admin");
              
            }else{
              console.log("咸鱼无法进入");
            }
          
        }
      }) .catch(err=>{})
      });
      
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style spoped>
#app {
  height: 650px;
}
</style>
