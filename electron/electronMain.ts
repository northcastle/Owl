/**
 * electron 的主进程
 */
// 导入模块
import {app,BrowserWindow,Menu, MenuItemConstructorOptions} from 'electron'

import path from 'path'

// 是否为Mac的标识
const isMac = process.platform === 'darwin'

const template:Array<MenuItemConstructorOptions> = [
  // { role: 'appMenu' }
  // ...(isMac
  //   ? [{
  //       label: app.name,
  //       submenu: [
  //         { role: 'about' },
  //         { type: 'separator' },
  //         { role: 'services' },
  //         { type: 'separator' },
  //         { role: 'hide' },
  //         { role: 'hideOthers' },
  //         { role: 'unhide' },
  //         { type: 'separator' },
  //         { role: 'quit' }
  //       ]
  //     }]
  //   : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  // {
  //   label: 'Edit',
  //   submenu: [
  //     { role: 'undo' },
  //     { role: 'redo' },
  //     { type: 'separator' },
  //     { role: 'cut' },
  //     { role: 'copy' },
  //     { role: 'paste' },
  //     ...(isMac
  //       ? [
  //           { role: 'pasteAndMatchStyle' },
  //           { role: 'delete' },
  //           { role: 'selectAll' },
  //           { type: 'separator' },
  //           {
  //             label: 'Speech',
  //             submenu: [
  //               { role: 'startSpeaking' },
  //               { role: 'stopSpeaking' }
  //             ]
  //           }
  //         ]
  //       : [
  //           { role: 'delete' },
  //           { type: 'separator' },
  //           { role: 'selectAll' }
  //         ])
  //   ]
  // },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  // {
  //   label: 'Window',
  //   submenu: [
  //     { role: 'minimize' },
  //     { role: 'zoom' },
  //     ...(isMac
  //       ? [
  //           { type: 'separator' },
  //           { role: 'front' },
  //           { type: 'separator' },
  //           { role: 'window' }
  //         ]
  //       : [
  //           { role: 'close' }
  //         ])
  //   ]
  // },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]


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
  })

  // 设置自定义的菜单
  const menu : Menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  console.log(menu)
  console.log(' --> add menu end')

  // 根据是否存在开发路径，决定加载不同的内容
  let devUrl = process.argv[2]
  if(devUrl){
    win.loadURL(devUrl)
  }else{
    // 这个 pages/index.html 就是 vue3 打包之后的那个 index.html
    win.loadFile(path.resolve(__dirname,'pages/index.html'))
  }

}

// 应用准备就绪，加载窗口
app.whenReady().then(() => {

  if (!isMac){
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
