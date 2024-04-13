
// 案例对象
export interface TypingCaseObj{
    id:string, // 数据ID
    title:string, // 标题
    content:string, // 文本内容
}

// 注入的对象
export interface TypingCaseProps{
    typingCaseList:Array<TypingCaseObj>
}