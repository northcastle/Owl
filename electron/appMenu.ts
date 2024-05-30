/**
 * 菜单数据
 */

import {app,Menu, MenuItemConstructorOptions} from 'electron'

// 是否为Mac的标识
import { isMac } from './common'

// 菜单对象
let templateMenu:Array<MenuItemConstructorOptions> = [];


/**
 * 创建菜单的方法
 */
export const createMenu = ()=>{
  
    templateMenu = [
        ...(isMac() ? 
            [{
                label: app.name,
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    { role: 'services' },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideOthers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            }] : 
            [{
                label:app.name,
                submenu:[
                    { role: 'quit' }
                ]
            }]),
        // {
        //     label:'File',
        //     submenu:[
        //         isMac() ? { role: 'close' } : { role: 'quit' }
        //     ]
        // }
    ]

    // 设置自定义的菜单
    const menuData : Menu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(menuData)
  
}


// 下面这是一个案例
// const template:Array<MenuItemConstructorOptions> = [
//     { role: 'appMenu' }
//     ...(isMac
//       ? [{
//           label: app.name,
//           submenu: [
//             { role: 'about' },
//             { type: 'separator' },
//             { role: 'services' },
//             { type: 'separator' },
//             { role: 'hide' },
//             { role: 'hideOthers' },
//             { role: 'unhide' },
//             { type: 'separator' },
//             { role: 'quit' }
//           ]
//         }]
//       : []),
//     { role: 'fileMenu' }
//     {
//       label: 'File',
//       submenu: [
//         isMac ? { role: 'close' } : { role: 'quit' }
//       ]
//     },
//     { role: 'editMenu' }
//     {
//       label: 'Edit',
//       submenu: [
//         { role: 'undo' },
//         { role: 'redo' },
//         { type: 'separator' },
//         { role: 'cut' },
//         { role: 'copy' },
//         { role: 'paste' },
//         ...(isMac
//           ? [
//               { role: 'pasteAndMatchStyle' },
//               { role: 'delete' },
//               { role: 'selectAll' },
//               { type: 'separator' },
//               {
//                 label: 'Speech',
//                 submenu: [
//                   { role: 'startSpeaking' },
//                   { role: 'stopSpeaking' }
//                 ]
//               }
//             ]
//           : [
//               { role: 'delete' },
//               { type: 'separator' },
//               { role: 'selectAll' }
//             ])
//       ]
//     },
//     { role: 'viewMenu' }
//     {
//       label: 'View',
//       submenu: [
//         { role: 'reload' },
//         { role: 'forceReload' },
//         { role: 'toggleDevTools' },
//         { type: 'separator' },
//         { role: 'resetZoom' },
//         { role: 'zoomIn' },
//         { role: 'zoomOut' },
//         { type: 'separator' },
//         { role: 'togglefullscreen' }
//       ]
//     },
//     { role: 'windowMenu' }
//     {
//       label: 'Window',
//       submenu: [
//         { role: 'minimize' },
//         { role: 'zoom' },
//         ...(isMac
//           ? [
//               { type: 'separator' },
//               { role: 'front' },
//               { type: 'separator' },
//               { role: 'window' }
//             ]
//           : [
//               { role: 'close' }
//             ])
//       ]
//     },
//     {
//       role: 'help',
//       submenu: [
//         {
//           label: 'Learn More',
//           click: async () => {
//             const { shell } = require('electron')
//             await shell.openExternal('https://electronjs.org')
//           }
//         }
//       ]
//     }
//   ]