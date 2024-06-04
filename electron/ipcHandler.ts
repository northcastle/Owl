/**
 * 主进程处理渲染进程的方法
 */

import { IpcMainInvokeEvent,dialog,OpenDialogOptions} from "electron";

// 引入目录树数据类型
import type { TreeNode } from '../src/views/packageHelper/PackageHelperType';

// 引入 路径 以及 文件操作的方法
import fs from "fs";
import path from "path";

// 引入uuid工具类
import { v4 as uuidv4 } from 'uuid';


/**
 * 打开文件选择框处理逻辑
 * @param event 
 */
export const handlerOpenFileDialog = async (event:IpcMainInvokeEvent) => {
    // 打开文件选择框的属性配置
    let dialogOptions : OpenDialogOptions = {
        title: '选择文件目录',
        properties: ['openDirectory']
    }
    // 打开文件选择框
    const filePaths = dialog.showOpenDialogSync(dialogOptions)
    // 解析文件选择框的结果 : 读取目录下的所有内容
    if (filePaths) {
      // D:\work\09数据处理\呼叫中心-李琳\新建文件夹
      // console.log('选中的目录electron ： ',filePaths[0])
      let targetFolder = filePaths[0];

      // 创建要返回给页面的目录树的数据
      let treeData:TreeNode[] = [];
      readAllFiles(targetFolder,treeData)
      // 创建根节点
      let rootData:TreeNode = {
        id:uuidv4(),
        label:path.basename(targetFolder),
        parentPath:'',
        fullPath:targetFolder,
        isDir:true,
        children:treeData
      }
      // 最后返回的结果
      let targetDataList:TreeNode[] = [];
      targetDataList.push(rootData);
      return targetDataList;
    }
};

/**
 * 读取目录下的所有文件
 * @param dirPath 目标目录
 * @param folderDataTree 目录树数据
 */
const readAllFiles = (dirPath:string,folderDataTree:TreeNode[]) => {
  
  let contentPath:string[] = fs.readdirSync (dirPath,{encoding:'utf-8'})
  // console.log('readAllFiles : contentPath : ',contentPath)
  contentPath.forEach(fileName => {
    // 拼接全路径
    let filePath = path.join(dirPath,fileName)
    // 获取文件状态
    let stat = fs.statSync(filePath)
    if(stat.isDirectory()){
      // 文件夹 ： 继续递归读取
      let folderNode:TreeNode = {
        id:uuidv4(),
        label:fileName,
        parentPath:dirPath,
        fullPath:filePath,
        isDir:true,
        children:[]
      }
      folderDataTree.push(folderNode)
      readAllFiles(filePath,folderNode.children)
    }else{
      // 文件 ： 直接创建节点返回
      let fileNode:TreeNode = {
        id:uuidv4(),
        label:fileName,
        parentPath:dirPath,
        fullPath:filePath,
        isDir:false,
        children:[]
      }
      folderDataTree.push(fileNode)
    }

  });
  
}