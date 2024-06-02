/**
 * 预加载脚本 ： 用来进程通信
 */

import { ipcRenderer,contextBridge } from 'electron';

//  暴露接口给 renderer进程
contextBridge.exposeInMainWorld('OwlAPI', {

    // 打开文件选择框  : 双向 ： 会返回选中的路径
    openFileDialog: () => { 
        // 获取到 选择的路径 的promise 类型的返回值
        let chooseFilePath = ipcRenderer.invoke('open-file-dialog');
        return chooseFilePath;
    },

})