
/**
 * 菜单对象
 */
export interface MenuObj{
    id:string, // 菜单ID
    text:string, // 菜单名称
    icon?:string, // 菜单图标
    routerPath?:string, // 菜单路由
    isShow?:boolean, // 是否显示
}

/**
 * 菜单列表属性
 */
export interface MenuObjProps{
    menuList:Array<MenuObj>, // 菜单列表
    defaultMenu:string, // 默认的导航页
}