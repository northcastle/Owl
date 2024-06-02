/**
 * 常用的工具包的集合
 */

/**
 * 判定当前操作系统是否为 Mac
 */
export const isMac = ():boolean=>{
    return process.platform === 'darwin'
}