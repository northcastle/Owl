/**
 * 常用的工具包的集合
 */

/**
 * 判定当前操作系统是否为 Mac
 */
export const isMac = ():boolean=>{
    return process.platform === 'darwin'
}

/**
 * 获取页面的开发地址
 * @returns 
 */
export const devUrl = ():string =>{
    return process.argv[2]
}