<template>
  <div id="charge">
    <el-container>
      <el-header></el-header>
      <el-main style="padding: 0">
        <ul id="resumes">
          <li v-for="item in items" :key="item.value">
            <span>姓名：{{ item.username }}</span>
            <span
              ><el-button
                size="mini"
                type="primary"
                @click="showMe(item.checkedStatus, item.checker)"
                >查看状态</el-button
              >
              <el-button
                size="mini"
                type="success"
                @click="charging(item.value, item.id)"
                >开始审核</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="download(item.fileName)"
                >下载</el-button
              >
            </span>
          </li>
        </ul>
      </el-main>
    </el-container>

    <el-dialog title="简历" :visible.sync="resumeVisible">
      <ol>
        <li>姓名:{{ resumes.username }}</li>
        <li>学号:{{ resumes.num }}</li>
        <li>专业:{{ resumes.major }}</li>
        <li>手机号:{{ resumes.tel }}</li>
        <li>QQ:{{ resumes.QQ }}</li>
        <li>邮箱:{{ resumes.email }}</li>
        <li>个人简介:{{ resumes.ins }}</li>
      </ol>
      <span>
        <el-button type="success" @click="shenhe(2)">通过</el-button>
        <el-button type="danger" @click="shenhe(3)">拒绝</el-button>
      </span>
    </el-dialog>

    <el-dialog title="状态" :visible.sync="statusVisible">
      <div v-show="ShowYes">
        <h3>审核已通过</h3>
        <i class="el-icon-success" style="font-size: 50px"></i>
      </div>
      <div v-show="ShowNo">
        <h3>审核未通过</h3>
        <i class="el-icon-error" style="font-size: 50px"></i>
      </div>
      <div v-show="haha">
        <h3>待审核</h3>
        <i class="el-icon-warning" style="font-size: 50px"></i>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  beforeCreate() {
    this.$axios({
      url:
        "http://106.14.255.214:8080/XierJianli/user/getSelfAllPersonalInfo.do",
      method: "get",
    }).then((response) => {
      //console.log(response);
      this.adminName = response.data.data.username;
      this.adminId = response.data.data.id;
    });
    this.$axios({
      url:
        "http://106.14.255.214:8080/XierJianli/table/findAllSubmitsByTableId.do",
      method: "get",
      params: {
        tableId: localStorage.adminBelong,
      },
    }).then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        this.$set(this.resumes, i, response.data.data[i]);
        var temp1 = JSON.parse(response.data.data[i].content);
        var temp2 = {};
        Object.getOwnPropertyNames(temp1).forEach(function (index) {
          //console.log(index);
          //console.log( temp1[index][0]);
          if (index === "姓名") {
            temp2.username = temp1[index][0];
          }
          if (index === "学号") {
            temp2.num = temp1[index][0];
          }
          if (index === "专业") {
            temp2.major = temp1[index][0];
          }
          if (index === "手机号") {
            temp2.tel = temp1[index][0];
          }
          if (index === "QQ") {
            temp2.QQ = temp1[index][0];
          }
          if (index === "邮箱") {
            temp2.email = temp1[index][0];
          }
          if (index === "个人简介") {
            temp2.ins = temp1[index][0];
          }
        });
        temp2.fileName = response.data.data[i].fileName;
        temp2.id = response.data.data[i].id;
        temp2.checkedStatus = response.data.data[i].checkedStatus;
        temp2.checker = response.data.data[i].checker;
        temp2.value = i;
        this.$set(this.items, i, temp2);
      }
      console.log(this.items);
    });
  },
  data() {
    return {
      adminName: "",
      adminId: 0,
      items: [
        {
          id: 0,
          username: "",
          num: "",
          major: "",
          tel: "",
          QQ: "",
          email: "",
          ins: "",
        },
      ],
      resumes: {},
      checker_show: "",
      resumeVisible: false,
      statusVisible: false,
      chargingChos: 0,
      haha: false,
      ShowYes: false,
      ShowNo: false,
    };
  },
  methods: {
    charging: function (value, id) {
      this.resumes = this.items[value];

      if (
        this.resumes.checkedStatus === 2 ||
        this.resumes.checkedStatus === 3
      ) {
        alert("该简历已经审核过");
        return;
      }
      this.resumeVisible = true;
      var temp = new FormData();
      temp.append("submitTableId", id);
      this.$axios({
        url:
          "http://106.14.255.214:8080/XierJianli/submitTable/startCheckSubmitTable.do",
        method: "post",
        data: temp,
        headers: { "X-CSRF-TOKEN": localStorage.token },
      }).then((response) => {
        console.log(response);
      });
      this.chargingChos = id;
    },
    shenhe: function (status) {
      var temp = new URLSearchParams();
      temp.append("submitTableId", this.chargingChos);
      temp.append("checkerId", this.adminId);
      temp.append("checkResultStatus", status);
      console.log(this.chargingChos);
      console.log(this.adminId);
      console.log(status);

      this.$axios({
        url:
          "http://106.14.255.214:8080/XierJianli/submitTable/checkSubmitTable.do",
        method: "post",
        data: temp,
        headers: {
          "X-CSRF-TOKEN": localStorage.token,
        },
      }).then((response) => {
        this.$router.go(0);
      });
    },
    showMe: function (checkedStatus, checker) {
      this.haha = false;
      this.ShowYes = false;
      this.ShowNo = false;
      this.checker_show = checker;

      if (checkedStatus === 2) {
        this.ShowYes = true;
      } else if (checkedStatus === 3) {
        this.ShowNo = true;
      } else {
        this.haha = true;
      }
      this.statusVisible = true;
    },
    download: function (fileName) {
      this.$axios({
        url:
          "http://106.14.255.214:8080/XierJianli/table/downloadFile.do/" +
          fileName,
        method: "get",
        responseType: "blob",
      }).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
  },
};
</script>
<style scoped>
#charge {
  height: 670px;
  margin-left: 100px;
  background-color: white;
}
#resumes {
  list-style: none;
  height: 550px;
  width: 80%;
  border: solid 1px rgb(61, 59, 59);
  padding: 0;
  overflow: auto;
}
#resumes li {
  display: flex;

  border: solid 1px black;
  justify-content: space-between;
}
</style>
