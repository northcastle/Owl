
/**
 * 算数表达式的对象
 */
export interface ArithmeticExpression{
    id:string, // id
    expression:string, // 表达式的值（带=）
    resultCorrect:string, // 表达式的正确结果
    resultUser:string, // 表达式的用户输入的结果
    iscorrect:boolean, // 是否正确
}

/**
 * 题目的难度等级
 */
export const enum DefficultyLevel{
    Easy_ADD, // 简单加法,两个操作数
    Easy_SUB, // 简单减法
    Easy_MUL, // 简单乘法
    Easy_DIV, // 简单除法

    Middle_ADD_SUB, // 中等加减法,三个操作数
    Middle_ADD_MUL, // 中等加乘法,
    Middle_ADD_DIV, // 中等加除法,
    Middle_SUB_MUL, // 中等减乘法,
    Middle_SUB_DIV, // 中等减除法,
    Middle_MUL_DIV, // 中等乘除法,
    Middle_ADD_SUB_MUL, // 中等加减乘法,
    Middle_ADD_SUB_DIV, // 中等加减除法,
    Middle_ADD_MUL_DIV, // 中等加乘除法,
    Middle_SUB_MUL_DIV, // 中等减乘除法,
    Middle_ADD_SUB_MUL_DIV, // 中等减乘除法,四个操作数

    
    Hard_ADD_SUB_Brackets, // 中等加减法-带括号
    Hard_ADD_MUL_Brackets, // 中等加乘法,
    Hard_ADD_DIV_Brackets, // 中等加除法,
    Hard_SUB_MUL_Brackets, // 中等减乘法,
    Hard_SUB_DIV_Brackets, // 中等减除法,
    Hard_MUL_DIV_Brackets, // 中等乘除法,
    Hard_ADD_SUB_MUL_Brackets, // 中等加减乘法,
    Hard_ADD_SUB_DIV_Brackets, // 中等加减除法,
    Hard_ADD_MUL_DIV_Brackets, // 中等加乘除法,
    Hard_SUB_MUL_DIV_Brackets, // 中等减乘除法,

    Hard_ADD_SUB_MUL_DIV_Brackets, // 困难 : 加减乘除括号 四则混合运算，10个操作数以内

}


/**
 * 栈对象
 */
export class Stack<T> {
    private items: T[] = [];

    // 向栈顶添加一个元素
    push(element: T): void {
        this.items.push(element);
    }

    // 移除并返回栈顶元素
    pop(): T | undefined {
        return this.items.pop();
    }

    // 返回但不移除栈顶元素
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    // 检查栈是否为空
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // 获取栈中元素的数量
    size(): number {
        return this.items.length;
    }
}