<template>
    <div id="about">
        <div class="about">Go语言又称Golang，由谷歌Google公司于2009年推出。它的主要目标是“兼具Python等动态语言的开发速度和 C/C++等编译型语言的性能与安全性”。Go语言被称作是“21世纪的C语言”，因为Go不仅有C的简洁和性能，它支持交叉编译、开发效率高、执行性能好、天生支持并发等优点完美契合当下互联网环境。</div>
    </div>
</template>
<style scoped>
#about {
  position: relative;
  height: 680px; 
}
#about::before{
          content:'';
          background: url(../assets/data1.jpg) ;
          background-size:cover;
          filter: blur(4px);
          position: absolute;
          top:0;
          bottom:0;
          left:0;
          right:0;
          z-index: -1; 
 }
 #about{
  display: flex;
  justify-content: center;
  align-items: center;
}
.about{
  width: 470px;
  height: 110px;
  background-color:rgb(231, 217, 217);
  border-radius: 5px;
}
</style>