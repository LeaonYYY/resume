<template>
  <div id="about">
    <div class="about">
      前端对于网站来说，通常是指，网站的前台部分包括网站的表现层和结构层。因此前端技术一般分为前端设计和前端开发，前端设计一般可以理解为网站的视觉设计，前端开发则是网站的前台代码实现，包括基本的HTML和CSS以及JavaScript/ajax，现在最新的高级版本HTML5、CSS3，以及SVG等。
    </div>
  </div>
</template>
<style scoped>
#about {
  position: relative;
  height: 680px;
}
#about::before {
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