

// 父组件传过来的属性
export interface KeyItemProps{
    keyValue?:string, // 键盘按键的值
    widthValue?:number, // 键盘按键的宽度，默认是 50px
    heightValue?:number, // 键盘按键的高度，默认是 50px
    capsFlag?:boolean, // 标识是大写的按键
    fjFlag?:boolean, // F J 按键的下方的短横线
    eventKey?:string, // 输入中文时特殊的判定标识
    
}

// 每个按键的值
export interface KeyItem{
    keyCode:number,
    keyValue:string | number,
}