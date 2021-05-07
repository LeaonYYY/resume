<template>
  <div id="formdata">
    <el-form id="formText" label-width="80px">
      <h1>简历投递</h1>
      <el-form-item label="名字:">
        <el-input
          v-model="formName"
          placeholder="请输入名字"
          suffix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item label="学号:">
        <el-input
          v-model="formNum"
          placeholder="请输入学号"
          suffix-icon="el-icon-s-flag"
        ></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="formMajor" placeholder="请输入专业名称"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="formTel"
          placeholder="请输入正确的手机号码"
          suffix-icon="el-icon-phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="formQQ" placeholder="请输入QQ号码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          v-model="formMail"
          placeholder="请输入有效的邮箱地址"
          suffix-icon="el-icon-message"
        ></el-input>
      </el-form-item>
      <el-form-item label="方向:">
        <el-select
          v-model="formChos"
          multiple
          :multiple-limit="2"
          placeholder="最多选择两个方向"
          clearable
        >
          <el-option
            v-for="item in items"
            :key="item.value"
            :value="item.value"
            :label="item.groupName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          type="textarea"
          placeholder="个人介绍或工作经历"
          :rows="5"
          v-model="formIns"
        ></el-input>
      </el-form-item>
      <el-form-item label="介绍文件">
        <input type="file" id="file" name="file" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>

        
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "formdata",
  beforeCreate() {
    this.$axios({
      url: "http://106.14.255.214:8080/XierJianli/group/anonymous/findAll.do",
      method: "get",
    }).then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        this.$set(this.items, i, response.data.data[i]);
        this.items[i].value = this.items[i].id;
      }
    });
  },
  data() {
    return {
      tableid: 1,
      formName: "",
      formNum: "",
      items: [],
      formChos: [],
      formIns: "",
      formTel: "",
      formMail: "",
      formMajor: "",
      formQQ: "",
    };
  },
  methods: {
    submit: function () {
      for (let i = 0; i < this.formChos.length; i++) {
        this.$axios({
          method: "GET",
          url:
            "http://106.14.255.214:8080/XierJianli/table/findFormworkByTableId.do",
          params: {
            tableId: this.formChos[i],
          },
        }).then((response) => {
          var temp = new FormData();
          var fileSenter = document.querySelector("#file");
          temp.append("tableId", this.formChos[i]);
          temp.append("uploadFile", fileSenter.files[0]);
          //temp.append("姓名",this.formName)
          //temp.append("学号",this.formNum)
          for (let j = 0; j < response.data.data.tableFieldList.length; j++) {
            if (response.data.data.tableFieldList[j].id === 1) {
              temp.append("姓名", this.formName);
            }
            if (response.data.data.tableFieldList[j].id === 2) {
              temp.append("学号", this.formNum);
            }
            if (response.data.data.tableFieldList[j].id === 3) {
              temp.append("专业", this.formMajor);
            }
            if (response.data.data.tableFieldList[j].id === 4) {
              temp.append("手机号", this.formTel);
            }
            if (response.data.data.tableFieldList[j].id === 5) {
              temp.append("QQ", this.formQQ);
            }
            if (response.data.data.tableFieldList[j].id === 6) {
              temp.append("邮箱", this.formMail);
            }
            if (response.data.data.tableFieldList[j].id === 7) {
              temp.append("个人简介", this.formIns);
            }
          }
          this.$axios({
            url: "http://106.14.255.214:8080/XierJianli/table/submitTable.do",
            method: "post",
            data: temp,
          }).then((response) => {
            console.log(response);
            if (response.data.data === "IP访问次数达到限制") {
              alert("您提交过于频繁");
            } else if (response.data.status === "ok") {
              alert("提交成功");
              this.$router.go(0);
            }else {
              alert('提交失败')
            }
          });
        });
      }
      /* alert('提交成功');
      this.$router.go(0)*/
    },
    getData: function () {
      this.$axios({
        method: "GET",
        url:
          "http://106.14.255.214:8080/XierJianli/table/findFormworkByTableId.do",
        params: {
          tableId: this.tableid,
        },
      }).then((response) => {
        console.log(response.data.data.tableFieldList);
      });
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 0;
}
#formdata {
  height: 680px;
}
#formText {
  margin-left: 15%;
  width: 70%;
  background-color: #fff;
  overflow: auto;
}
</style>