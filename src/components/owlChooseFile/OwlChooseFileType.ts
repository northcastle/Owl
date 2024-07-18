/**
 * 文件上传组件的配置对象
 */
export interface OwlChooseFileProps {
    disalbedFlag:boolean, // 是否禁用
    autoUploadFlag:boolean, // 是否自动上传
    multipleFlag:boolean, // 是否支持多选
    limitNum:number, // 限制上传文件数量
    acceptTypes:string, // 限制上传文件类型
    fileSize:number, // 限制上传文件大小,单位 MB
    fileList:Array<any>, // 已上传的文件列表
    tipList:string[], // 提示信息列表
    templateDownloadFlag:boolean, // 是否显示模板下载按钮
    templateDownloadFileName:string, // 模板下载名称
    templateDownloadFileUrl:string, // 模板下载地址
    templateDownloadBtnText:string, // 模板下载按钮的文本
    excelHeaderList:string[], // excel表头
   


}