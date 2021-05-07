<template>
    <div id="about">
        <div class="about">Technologies开发的一个让玩家轻松创建诸如三维视频游戏、建筑可视化、实时三维动画等类型互动内容的多平台的综合型游戏开发工具，是一个全面整合的专业游戏引擎。Unity类似于Director,Blender game engine, Virtools 或 Torque Game Builder等利用交互的图型化开发环境为首要方式的软件</div>
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