<template>
  <div id="about">
    <div class="floatItem" >
      西二在线,成立于1998年。
      是集美貌与智慧于一身的历史最悠久最酷炫最强大的学生组织。始于情怀，精于技术，重于传承。我们连接校内外优秀学生资源，帮助学生在互联网领域内有更好的发展，是提高个人能力，培养优秀人才的孵化器。
    </div>
  </div>
</template>
<style scoped>
p {
  margin: 0;
}
#about {
  height: 680px;
  position: relative;
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
.formItem{
  position: absolute;
  left: 0;
  top: 0;
}
#about{
  display: flex;
  justify-content: center;
  align-items: center;
}
.floatItem{
  width: 460px;
  height: 100px;
  background-color:rgb(231, 217, 217);
  border-radius: 5px;
}
</style>