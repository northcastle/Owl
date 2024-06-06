/**
 * 打包工具中用到的类型定义
 */

/**
 * 树节点的类型
 */
export interface TreeNode {
    id: string, // 主键值
    label: string, // 节点名称
    parentId: string, // 父节点id
    parentPath:string,// 父节点路径
    fullPath: string, // 节点路径
    isDir: boolean, // 是否是文件夹
    children: TreeNode[], // 子节点集合
    orderNum: number, // 排序字段
  }