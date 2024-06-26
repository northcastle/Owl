

// 父组件传过来的属性
export interface KeyItemProps{
    keyText?:string, // 键盘按键 展示的文本
    keyCode?:number, // 键盘按键 监听到的 数值
    code?:string, // 键盘按键 监听到的文本值
    _key?:string, // 键盘按键 监听到的单个字符值


    widthValue?:number, // 键盘按键的宽度，默认是 50px
    heightValue?:number, // 键盘按键的高度，默认是 50px
    capsFlag?:boolean, // 标识是大写的按键
    fjFlag?:boolean, // F J 按键的下方的短横线
    
    
}

// 每个按键的值
export interface KeyItem{
    keyCode:number,
    keyValue:string | number,
}