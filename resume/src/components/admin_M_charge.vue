<template>
  <div class="MCharge">
    <div id="groupsControl">
      <span style="margin-left:140px;margin-top:60px"><el-input v-model="newGroupName" placeholder="输入新的分组名"></el-input></span>
      <span style="margin-top:60px"><el-button @click="addgroup">添加分组</el-button></span>
    </div>
    <div id="groups">
      <ul id="goups_show" style="margin-left:100px">
        <li v-for="group in groups" :key="group.id" style="border:solid 1px black;width:70%">
          <span>{{ group.groupName }}</span>
          <span>
            <el-button type="text" @click="add_show(group.id)"
              >添加成员</el-button
            >
            <el-button type="text" @click="delegroup(group.id)"
              >删除分组</el-button
            >
          </span>
          <ul id="ulList2">
            <li v-for="user in group.users" :key="user.id"  style="width:300px;display:flex;justify-content:space-around;">
              <span style="line-height:40px">{{ user.name }}</span>
              <span>
                <el-button type="text" @click="changeRoles(user.username,user.id)"
                  >修改权限</el-button
                >
                <el-button type="text" @click="deleuser(user.id)"
                  >删除成员</el-button
                >
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <el-dialog title="角色详情" :visible.sync="roleVisiable">
      <ul>
        <li v-for="role in roles" :key="role.id" class="display:flex">
          {{ role.name }}
          <el-switch
            v-model="role.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change='changeStatus($event,role.id)'
          >
          </el-switch>
        </li>
      </ul>
    </el-dialog>

    <el-dialog title="添加用户" :visible.sync="addVisiable">
      <el-form label-width="80px">
        <el-form-item label="用户名：">
          <el-input v-model="username_r"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="password_r"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="name_r"></el-input>
        </el-form-item>
        <el-form-item label="专业：">
          <el-input v-model="major_r"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="email_r"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="QQ_r"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="phoneNum_r"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="adduser">添加</el-button>
          <el-button @click="addVisiable=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MCharge",
  data() {
    return {
      username_r:'',
      password_r:'',
      name_r:'',
      major_r:'',
      email_r:'',
      QQ_r:'',
      phoneNum_r:'',
      newGroupName: "",
      groups: [],
      roles: [
        { id: 1, name: "超级管理员", status: false },
        { id: 2, name: "普通管理员", status: false },
        { id: 3, name: "咸鱼", status: false },
      ],
      roleVisiable: false,
      addVisiable:false,
      addChos:1,
      userChos:0
    };
  },
  beforeCreate() {
    this.$axios({
      url: "http://106.14.255.214:8080/XierJianli/group/findAll.do",
      method: "get",
    }).then((response) => {
      console.log(response);
      for (var i = 0; i < response.data.data.length; i++) {
        this.$set(this.groups, i, response.data.data[i]);
      }
    });
  },
  methods: {
    add_show: function (a) {
      this.addVisiable=true;
      this.addChos=a;
    },
    adduser:function(){
      console.log(this.addChos);
      var addData= new FormData();
      addData.append('username',this.username_r)
      addData.append('password',this.password_r)
      addData.append('name',this.name_r)
      addData.append('major',this.major_r)
      addData.append('email',this.email_r)
      addData.append('QQ',this.QQ_r)
      addData.append('phoneNum',this.phoneNum_r)
      addData.append('groupIds',this.addChos)
      this.$axios({
        url:'http://106.14.255.214:8080/XierJianli/user/addNewUser.do',
        method:'post',
        data:addData,
        headers:{ 'X-CSRF-TOKEN':  localStorage.token}
      }) .then(response=>{
        console.log(response);
      })
      this.addVisiable=false;
      this.$router.go(0)
    },
    deleuser: function (a) {
      var p = new FormData();
      p.append('userId',a);
      this.$axios({
        url:'http://106.14.255.214:8080/XierJianli/user/deleteUserById.do',
        method:'POST',
        data:p,
        headers:{ 'X-CSRF-TOKEN':  localStorage.token}
      }) 
      this.$router.go(0)
    },
    delegroup: function (a) {
      var temp = new FormData();
      temp.append('groupId',a)
      this.$axios({
        url:'http://106.14.255.214:8080/XierJianli/group/deleteGroupById.do',
        method:'post',
        data:temp,
        headers: { 'X-CSRF-TOKEN':  localStorage.token }
      }) .then(response=>{
        console.log(response);
      })
      this.$router.go(0)
    },
    addgroup: function () {
      if (this.newGroupName === "") {
        alert("分组名不能为空");
        return;
      }
      var temp = new FormData();
      temp.append('groupName',this.newGroupName);
      temp.append('groupDesc','');
      this.$axios({
        url:'http://106.14.255.214:8080/XierJianli/group/addNewGroup.do',
        method:'post',
        data:temp,
       headers: { 'X-CSRF-TOKEN':  localStorage.token }
      }) 
      this.$router.go(0)
    },
    changeRoles: function (a,b) {
      var params = new FormData();
      params.append("username", a);
      this.$axios({
        method: "get",
        url:
          "http://106.14.255.214:8080/XierJianli/user/getAllPersonalInfo.do",
        params:{
          username:a
        }
      }).then((response) => {
        var rolelist=response.data.data.roleList
        for(var i=0;i<3;i++){
          this.roles[i].status=false;
        }
        for(var i=0;i<rolelist.length;i++){
          if(rolelist[i].id===1){
            this.roles[0].status=true;
          }
          if(rolelist[i].id===2){
            this.roles[1].status=true;
          }
          if(rolelist[i].id===3){
            this.roles[2].status=true;
          }
        }
      });
      this.roleVisiable=true;
      this.userChos=b;
    },
    changeStatus:function($event,roleid){
      console.log($event);
      console.log(roleid);
      var temp = new FormData();
      temp.append('userId',this.userChos);
      temp.append('roleId',roleid);
      if($event===true){
        this.$axios({
          url:'http://106.14.255.214:8080/XierJianli/user/addOneRoleToUser.do',
          method:'post',
          data:temp,
          headers: { 'X-CSRF-TOKEN':  localStorage.token }
        }) .then(response => {
          
        })
      }else{
        this.$axios({
          url:'http://106.14.255.214:8080/XierJianli/user/removeOneRoleFromUser.do',
          method:'post',
          data:temp,
          headers: { 'X-CSRF-TOKEN':  localStorage.token }
        }) .then(response => {
          
        })
      }
    }
  },
};
</script>
<style scoped>
ul {
  margin: 0;
  list-style: none;
}
.MCharge {
  height: 670px;
  background-color: rgba(255, 255, 255, 0.493);
}
#groupsControl {
  display: flex;
}
#goups_show {
  height: 550px;
  width: 80%;
  overflow: auto;
}
#ulList2{
   display: flex;
   flex-direction: column;
   justify-content: center;
}
</style>