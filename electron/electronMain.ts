/**
 * electron 的主进程
 */
// 导入模块
import {app,BrowserWindow,ipcMain} from 'electron'

// 导入进程处理模块
import { handlerOpenExcelSaveDialog, handlerOpenFileDialog,handlerOpenFileSaveDialog,handlerShowSuccessDialog } from './ipcHandler'

// 导入菜单数据
import { createMenu } from './appMenu'
import path from 'path'

// 是否为Mac的标识,开发环境的URL
import { isMac,devUrl } from './commonUtils'

/**
 * 创建主窗口 edited on 2024-05-27
 * @param widthValue 窗口宽度
 * @param heightValue 窗口高度
 */
const createWindow = (widthValue:number,heightValue:number) => {
  // 主窗口
  const win = new BrowserWindow({
    width: widthValue,
    height:heightValue,
    resizable:false, // 禁止改变窗口大小
    webPreferences:{ // 预加载脚本
      preload: path.join(__dirname, 'ipcPreload.js')
    }
  })

  // 创建菜单
  createMenu()
 
  // 根据是否存在开发路径，决定加载不同的内容
  // let devUrl = process.argv[2]
  if(devUrl()){
    win.loadURL(devUrl())
  }else{
    // 这个 pages/index.html 就是 vue3 打包之后的那个 index.html
    win.loadFile(path.resolve(__dirname,'pages/index.html'))
  }

}

// 应用准备就绪，加载窗口
app.whenReady().then(() => {

  // 设置当前应用的名称
  app.setName('Owl')

  // 监听打开文件对话框的请求
  ipcMain.handle('open-file-dialog', handlerOpenFileDialog)

  // 监听保存文件对话框的请求
  ipcMain.handle('open-file-save-dialog', handlerOpenFileSaveDialog)

  // 监听文件处理成功的对话框的请求
  ipcMain.handle('open-success-dialog',handlerShowSuccessDialog)

  // 监听处理 excel保存文件对话框的请求
  ipcMain.handle('open-excel-save-dialog',handlerOpenExcelSaveDialog)

  if (!isMac()){
    // 非mac系统
    createWindow(1200,863)
  }else{
    // mac系统
    createWindow(1200,829)
  }


  // mac 上默认保留一个窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(1200,829)
  })

    console.log('--- app ready ---')
})

// 关闭所有窗口 ： 程序退出 ： windows & linux
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
