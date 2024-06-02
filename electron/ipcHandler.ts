/**
 * 主进程处理渲染进程的方法
 */

import { IpcMainInvokeEvent,dialog,OpenDialogOptions, BrowserWindow} from "electron";

import type { TreeNode } from '../src/views/packageHelper/PackageHelperType'


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
      console.log('选中的目录electron ： ',filePaths[0])
      let targetFolder = filePaths[0];
      // 创建要返回给页面的目录树的数据
      let treeData:TreeNode[] = [];

      return targetFolder;
    }
};