<template>
  <div id="app">
    <el-carousel indicator-position="outside" height="640px">
      <el-carousel-item v-for="item in 3" :key="item">
        
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "firstPage",
  data() {
    return {
      loginShow: true,
      registShow: false,
      userShow: false,
    };
  },
};
</script>

<style scoped>
h1 {
  margin: 0;
}
#app {
  position: relative;
  height: 680px;
}
#app::before {
  content: "";
  background: url(../assets/data1.jpg);
  background-size: cover;
  filter: blur(4px);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
#app .loginPage {
  position: absolute;
  right: 0;
  top: 0;
  width: 30%;
  height: 50%;
  border: solid 1px rgb(255, 255, 255);
  border-radius: 10px;
  background-color: #fff;
}
.buttonType {
  text-align: center;
}
#app .userData {
  background-color: #fff;
}
  .el-carousel__item:nth-child(3) {
    background-image: url(../assets/s1.jpg);
     background-size:cover;
  }
  .el-carousel__item:nth-child(4) {
    background-image: url(../assets/s2.jpg);
     background-size:cover;
  }
  .el-carousel__item:nth-child(5) {
    background-image: url(../assets/s4.jpg);
     background-size:auto 640px;
  }

</style>
