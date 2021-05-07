<template>
  <div id="selfdata">
    <el-container>
      <el-header>个人基本信息
        <hr>
      </el-header>
      <el-main>
        <div>用户名:{{username}}</div>
        <div>名字:{{name}}</div>
        <div>专业:{{major}}</div>
        <div>邮箱:{{email}}</div>
        <div>绑定手机号:{{tel}}</div>
        <div>qq:{{qq}}</div>
      </el-main>
      
    </el-container>
  </div>
</template>
<script>
export default {
  name:'adminSelfdata',
  data(){
    return{
      username:'',
      name:'',
      major:'',
      email:'',
      tel:'',
      qq:''
    }
  },
  beforeCreate(){
    console.log(localStorage.token);
      this.$axios({
        method: "get",
        url:
          "http://106.14.255.214:8080/XierJianli/user/getSelfAllPersonalInfo.do",

        headers: { token: localStorage.token },
      }).then((response) => {
        console.log(response);
        this.username=response.data.data.username
        this.name=response.data.data.name
        this.major=response.data.data.major
        this.email=response.data.data.email
        this.tel=response.data.data.phoneNum
        this.qq=response.data.data.qq
      });
     
      
  },
  methods:{
    
  }
}
</script>
<style scoped>

h2{
  margin:0;
}
#selfdata {
  height: 670px;
  background-color: gray;
}
</style>