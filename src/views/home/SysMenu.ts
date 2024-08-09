// 导入菜单类型
import type { MenuObj } from '@/components/owlMenuPanel/OwlMenuPanelType'

// 默认菜单数据
export const defaultMenuRouter = '/welcome'
// 声明一些菜单元素
export const menuList:Array<MenuObj> = [
  {id:'a',text:'首页',icon:'Location',routerPath:'/welcome',isShow:true},
  {id:'b',text:'打字练习',icon:'Menu',routerPath:'/typingPractice',isShow:true},
  {id:'c',text:'协助打包',icon:'Files',routerPath:'/packageHelper',isShow:true},
  {id:'d',text:'数学练习',icon:'PieChart',routerPath:'/mathCalculater',isShow:true},
  {id:'e',text:'SQL助手',icon:'WindPower',routerPath:'/sqlHelper',isShow:true},
  {id:'f',text:'身份证查验',icon:'Aim',routerPath:'/idVarification',isShow:true},
]