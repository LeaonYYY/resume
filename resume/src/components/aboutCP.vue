<template>
    <div id="about">
        <div class="about">产品经理（Product Manager）是企业中专门负责产品管理的职位，产品经理负责市场调查并根据产品、市场及用户等的需求，确定开发何种产品，选择何种业务模式、商业模式等。并推动相应产品的开发组织，他还要根据产品的生命周期，协调研发、营销、运营等，确定和组织实施相应的产品策略，以及其他一系列相关的产品管理活动。</div>
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
  height: 125px;
  background-color:rgb(231, 217, 217);
  border-radius: 5px;
}
</style>