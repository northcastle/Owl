/**
 * 打包工具中用到的类型定义
 */

/**
 * 树节点的类型
 */
export interface TreeNode {
    label: string;
    fullPath: string;
    children?: TreeNode[]
  }