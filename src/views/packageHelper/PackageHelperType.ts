/**
 * 打包工具中用到的类型定义
 */

/**
 * 树节点的类型
 */
export interface TreeNode {
    label: string, // 节点名称
    parentPath:string,// 父节点路径
    fullPath: string, // 节点路径
    isDir: boolean, // 是否是文件夹
    children: TreeNode[], // 子节点集合
  }