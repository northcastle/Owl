import { ElNotification } from 'element-plus'

/**
 * 通知提示的位置
 */
export const NotificationPosition = {
    topRight: "top-right",
    topLeft: "top-left",
    bottomRight: "bottom-right",
    bottomLeft: "bottom-left",
}

/**
 * 成功信息
 * @param title 
 * @param message 
 */
export const showInfoMessage = (title:string,message:string,position:any="top-right")=>{
    ElNotification({
        title: title,
        message: message,
        type: 'info',
        position: position
    })
}



/**
 * 警告信息
 * @param title 
 * @param message 
 */
export const showWarningMessage = (title:string,message:string,position:any="top-right")=>{
    ElNotification({
        title: title,
        message: message,
        type: 'warning',
        position: position
    })
}

/**
 * 成功信息
 * @param title 
 * @param message 
 */
export const showSucessMessage = (title:string,message:string,position:any="top-right")=>{
    ElNotification({
        title: title,
        message: message,
        type: 'success',
        position: position
    })
}


/**
 * 失败信息
 * @param title 
 * @param message 
 */
export const showErrorMessage = (title:string,message:string,position:any="top-right")=>{
    ElNotification({
        title: title,
        message: message,
        type: 'error',
        position: position
    })
}