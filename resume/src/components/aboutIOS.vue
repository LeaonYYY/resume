<template>
    <div id="about">
       <div class="about">iOS是由苹果公司开发的移动操作系统。苹果公司最早于2007年1月9日的Macworld大会上公布这个系统，最初是设计给iPhone使用的，后来陆续套用到iPod touch、iPad以及Apple TV等产品上。iOS与苹果的Mac OS X操作系统一样，属于类Unix的商业操作系统</div>
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
  width: 460px;
  height: 110px;
  background-color:rgb(231, 217, 217);
  border-radius: 5px;
}
</style>