import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/components/welcom'
import home from '@/components/home'
import form from '@/components/form'
import homepage from '@/components/homepage'
import about from '@/components/about'
import aboutCP from '@/components/aboutCP'
import aboutGO from '@/components/aboutGO'
import aboutIOS from '@/components/aboutIOS'
import aboutJAVA from '@/components/aboutJAVA'
import aboutUNITY from '@/components/aboutUNITY'
import aboutWEB from '@/components/aboutWEB'
import admin from '@/components/admin'
import adminM from '@/components/admin_M'
import adminSelfdata from '@/components/admin_selfdata'
import adminCharge from '@/components/adminCharge'
import MCharge from '@/components/admin_M_charge'
import adminMSelfdata from '@/components/admin_M_selfdata'
import adminFormCharge from '@/components/adminFormCharge'
import msg from '@/components/adminMessage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component:welcome,
    },
    {
      path:'/home',
      component:home,
      children:[
        {
          path:'/',
          name:"home",
          redirect:"/homepage"
        },
        {
          path:'/homepage',
          name:'homepage',
          component:homepage
        },
        {
          path:'/about',
          name:'about',
          component:about
        },
        {
          path:'/aboutCP',
          name:'aboutCP',
          component:aboutCP
        },
        {
          path:'/aboutGO',
          name:'aboutGO',
          component:aboutGO
        },
        {
          path:'/aboutIOS',
          name:'aboutIOS',
          component:aboutIOS
        },
        {
          path:'/aboutJAVA',
          name:'aboutJAVA',
          component:aboutJAVA
        },
        {
          path:'/aboutUNITY',
          name:'aboutUNITY',
          component:aboutUNITY
        },
        {
          path:'/aboutWEB',
          name:'aboutWEB',
          component:aboutWEB
        },
        {
          path:'/form',
          name:"form",
          component:form
        },
        
      ]
    },
    {
      path:'/admin',
      component:admin,
      children:[
        {
          path:'/',
          name:'admin',
          redirect:'/adminCharge'
        },
        {
          path:'/adminSelfdata',
          name:'adminSelfdata',
          component:adminSelfdata
        },
        {
          path:'/adminCharge',
          name:'adminCharge',
          component:adminCharge
        },
        {
          path:"/adminFormCharge",
          name:'adminFormCharge',
          component:adminFormCharge
        },{
          path:'/msg',
          name:"name",
          component:msg
        }
      ],
      beforeEnter(to,from,next){
        if(localStorage.loginFlag==='true'){       
          next();
        }else{
          alert("请先登录");
          next('/home');
        }
      }
    },
    {
      path:'/adminM',
      component:adminM,
      children:[
        {
          path:'/',
          name:'adminM',
          redirect:'/MCharge'
        },{
          path:'/MCharge',
          name:'Mcharge',
          component:MCharge
        },
        {
          path:'/adminMSelfdata',
          name:'adminMSelfdata',
          component:adminMSelfdata
        }
      ],
      beforeEnter(to,from,next){
        if(localStorage.loginFlag==='true'){       
          next();
        }else{
          alert("请先登录");
          next('/home');
        }
      }
    }
  ]
})
