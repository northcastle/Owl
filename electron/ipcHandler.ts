/**
 * 主进程处理渲染进程的方法
 */

import { IpcMainInvokeEvent,dialog,OpenDialogOptions,SaveDialogSyncOptions, IpcMainEvent} from "electron";

// 引入目录树数据类型
import type { TreeNode } from '../src/views/packageHelper/PackageHelperType';

// 引入通用的数据类型
import {ResponseBody} from './commonType';

// 引入 路径 以及 文件操作的方法
import fs from "fs";
import path from "path";

// 引入uuid工具类
import { v4 as uuidv4 } from 'uuid';

// 引入exceljs工具类
import ExcelJS from 'exceljs'



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
      // 创建根节点
      let rootData:TreeNode = {
        id:uuidv4(),
        label:path.basename(targetFolder),
        parentId:'',
        parentPath:'',
        fullPath:targetFolder,
        isDir:true,
        children:[],
        orderNum:0
      }
      // 创建要返回给页面的目录树的数据
      let treeData:TreeNode[] = [];
      readAllFiles(targetFolder,treeData,rootData.id,1)
      // 给根节点添加children数据
      rootData.children = treeData;
    
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
 * @param parentId 父节点id
 * @param orderNumBegin 节点排序号
 */
const readAllFiles = (dirPath:string,folderDataTree:TreeNode[],parentId:string,orderNumBegin:number) => {
  
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
        parentId:parentId,
        parentPath:dirPath,
        fullPath:filePath,
        isDir:true,
        children:[],
        orderNum:orderNumBegin
      }
      folderDataTree.push(folderNode)
      orderNumBegin++;
      readAllFiles(filePath,folderNode.children,folderNode.id,orderNumBegin)
    }else{
      // 文件 ： 直接创建节点返回
      let fileNode:TreeNode = {
        id:uuidv4(),
        label:fileName,
        parentId:parentId,
        parentPath:dirPath,
        fullPath:filePath,
        isDir:false,
        children:[],
        orderNum:orderNumBegin
      }
      folderDataTree.push(fileNode)
      orderNumBegin++;
    }

  });
  
}

/**
 * 打开文件保存框处理逻辑
 * @param event : 事件
 * @param filesTreeDataChoosed 选中的目录树数据
 */
export const handlerOpenFileSaveDialog = async (event:IpcMainInvokeEvent,filesTreeDataChoosed:TreeNode[]) => {
  //console.log('handlerOpenFileSaveDialog begin ...')
  //console.log('handlerOpenFileSaveDialog : filesTreeDataChoosed ：',filesTreeDataChoosed)

  // 响应结果
  let resData : ResponseBody ={ code:200, msg:'创建成功', data:''}

  // 打开文件选择框的属性配置
  let dialogOptions : SaveDialogSyncOptions = {
    title: '选择文件保存目录',
    properties:['createDirectory'] 
  }
  // 打开文件选择框
  const savePath = dialog.showSaveDialogSync(dialogOptions)
  //console.log('handlerOpenFileSaveDialog : savePath : ',savePath)
  if (savePath) {
    // C:\Users\hongc\Desktop\classes
    let targetFolder = savePath;
    // 开始保存数据
    let targetExistFlag = fs.existsSync(targetFolder)
    if(targetExistFlag){ // 目录已经存在了，先删除然后创建一个新的
      fs.rmSync(targetFolder,{recursive:true,force:true})
    }
    try{
      // 创建目录
      fs.mkdirSync(targetFolder,{recursive:true})
      // 循环树复制文件
      filesTreeDataChoosed.forEach(fileNode => {
        saveFilesTree(targetFolder,fileNode,fileNode.fullPath)
      });

      // 响应成功
      resData = { code:200, msg:'生成成功！', data:targetFolder}


    }catch(e){
      console.log('handlerOpenFileSaveDialog : e : ',e)
      resData = { code:500, msg:'生成失败！', data:''}
    }
   

  }
  return resData;
}

/**
 * 保存文件
 * @param targetFolder 新的路径前缀
 * @param filesTree 要保存的一棵树
 * @param filesTreeRootFolder 原来的根节点的目录
 */
const saveFilesTree = (targetFolder:string,filesTree:TreeNode,filesTreeRootFolder:string) => {


    let fullPathOld = filesTree.fullPath;
    let relavitePath = fullPathOld.replace(filesTreeRootFolder,'')
    let targetPath = path.join(targetFolder,relavitePath)
    //console.log('saveFilesTree : fullPathOld : ',fullPathOld)
    //console.log('saveFilesTree : relavitePath : ',relavitePath)
    //console.log('saveFilesTree : targetPath : ',targetPath)
    //console.log('------')

    if(filesTree.isDir){ // 是文件夹
      //console.log('saveFilesTree : isDir : ',filesTree.isDir)
      // 创建文件夹
      fs.mkdirSync(targetPath,{recursive:true})
      // 递归创建子节点
      filesTree.children.forEach(childNode => {
        saveFilesTree(targetFolder,childNode,filesTreeRootFolder)
      });
    }else{ // 是文件
      // 复制文件
      const source = fs.createReadStream(fullPathOld);
      const destination = fs.createWriteStream(targetPath);

    source.pipe(destination)
    .on('finish', () => { 
      // console.log('文件复制成功！')
      })
    .on('error', (err) => console.error('复制过程中出错:', err));
     
    }



   
   


} 


/**
 * 弹出消息提示
 * @param event 
 * @param title 
 * @param message 
 */
export const handlerShowSuccessDialog = async (event:IpcMainInvokeEvent,title:string,message:string)=> {

  let iconPath = path.join(__dirname, '../forgeimages/success.png')
  let btnIndex = dialog.showMessageBoxSync({
    type: 'info',
    title: title,
    icon:iconPath,
    message: message,
    buttons: ['确定']
  })
  //console.log('handler-btnIndex : ',btnIndex)
  if(btnIndex){
    return btnIndex;
  }
}


/**
 * 下载 excel 模板
 * @param event 
 * @param excelHeaderList excel 模板的表头
 */
export const handlerOpenExcelSaveDialog = async (event:IpcMainInvokeEvent,templateDownloadFileName:string,excelHeaderList:any[]) => {
 
  // 打开文件保存的对话框
  // 获取到路径
  // 创建excel文件
  // 响应结果
  let resData : ResponseBody ={ code:200, msg:'创建成功', data:''}

    // 打开文件选择框的属性配置
    let dialogOptions : SaveDialogSyncOptions = {
      title: '选择文件保存目录',
      defaultPath:templateDownloadFileName,
      properties:['createDirectory'] 
    }
    // 打开文件选择框
    const savePath = dialog.showSaveDialogSync(dialogOptions);
    if (savePath) {

      const workbook = new ExcelJS.Workbook();
      // 添加一个新的工作表
      const worksheet = workbook.addWorksheet('Sheet 1');
      // 添加列
      worksheet.columns = excelHeaderList;

      // 添加数据行 - 保留动作
      //worksheet.addRow({ name: '张三', age: 25, job: '程序员' });

      // 写入文件
      try{
        await workbook.xlsx.writeFile(savePath);
        resData = { code:200, msg:'创建成功', data:savePath}
      }catch(e){
        resData = { code:500, msg:'', data:''}
      }
    
    }else{
      resData = { code:300, msg:'取消保存！', data:''}
    }


  return resData;
}
