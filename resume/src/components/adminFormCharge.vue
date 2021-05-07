<template>
  <div id="formCharge">
    <ul>
      <li v-for="mode in modes" :key="mode.id" class="display:flex">
        {{ mode.name }}
        <el-switch
          v-model="mode.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="changeStatus($event, mode.id)"
        >
        </el-switch>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "resumeMode",
  beforeCreate(){
      this.$axios({
          url:'http://106.14.255.214:8080/XierJianli/table/findFormworkByTableId.do',
          method:'get',
          params:{
              tableId:localStorage.adminBelong
          }
      }) .then(response =>{
          for(let i=0;i<response.data.data.tableFieldList.length;i++){
              if(response.data.data.tableFieldList[i].id===1){
                  this.modes[0].status=true;
              }
              if(response.data.data.tableFieldList[i].id===2){
                  this.modes[1].status=true;
              }
              if(response.data.data.tableFieldList[i].id===3){
                  this.modes[2].status=true;
              }
              if(response.data.data.tableFieldList[i].id===4){
                  this.modes[3].status=true;
              }
              if(response.data.data.tableFieldList[i].id===5){
                  this.modes[4].status=true;
              }
              if(response.data.data.tableFieldList[i].id===6){
                  this.modes[5].status=true;
              }
              if(response.data.data.tableFieldList[i].id===7){
                  this.modes[6].status=true;
              }
              if(response.data.data.tableFieldList[i].id===8){
                  this.modes[7].status=true;
              }
              if(response.data.data.tableFieldList[i].id===9){
                  this.modes[8].status=true;
              }
          }
      })
  },
  data() {
    return {
      modes: [
        {
          id: 1,
          name: "姓名",
          status: false,
        },
        {
          id: 2,
          name: "学号",
          status: false,
        },
        {
          id: 3,
          name: "专业",
          status: false,
        },
        {
          id: 4,
          name: "手机号",
          status: false,
        },
        {
          id: 5,
          name: "QQ",
          status: false,
        },
        {
          id: 6,
          name: "邮箱",
          status: false,
        },
        {
          id: 7,
          name: "个人简介",
          status: false,
        },
        {
          id: 8,
          name: "获奖情况",
          status: false,
        },
        {
          id: 9,
          name: "国籍",
          status: false,
        }
      ],
    };
  },
  methods:{
      changeStatus:function($event, modeid){
          if($event===true){
              var temp = new FormData();
              temp.append("tableId",localStorage.adminBelong)
              temp.append("fieldId",modeid)
              this.$axios({
                  url:'http://106.14.255.214:8080/XierJianli/table/addOneTableFieldToTable.do',
                  method:'post',
                  data:temp,
                  headers: { 'X-CSRF-TOKEN':  localStorage.token }
              })
          }else{
              var temp = new FormData();
              temp.append("tableId",localStorage.adminBelong)
              temp.append("fieldId",modeid)
              this.$axios({
                  url:'http://106.14.255.214:8080/XierJianli/table/removeOneTableFieldToTable.do',
                  method:'post',
                  data:temp,
                  headers: { 'X-CSRF-TOKEN':  localStorage.token }
              })
          }
      }
  }
};
</script>
<style scoped>
ul {
    margin:0
}
#formCharge {
  height: 670px;
  background-color: #fff;
}
</style>