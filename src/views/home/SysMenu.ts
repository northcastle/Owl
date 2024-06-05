// 导入菜单类型
import type { MenuObj } from '@/components/owlMenuPanel/OwlMenuPanelType'

// 默认菜单数据
export const defaultMenuRouter = '/welcome'
// 声明一些菜单元素
export const menuList:Array<MenuObj> = [
  {id:'a',text:'首页',icon:'Location',routerPath:'/welcome',isShow:true},
  {id:'b',text:'打字练习',icon:'Menu',routerPath:'/typingPractice',isShow:false},
  {id:'c',text:'协助打包',icon:'Files',routerPath:'/packageHelper',isShow:true},

]
