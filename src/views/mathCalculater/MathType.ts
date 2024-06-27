
/**
 * 算数表达式的对象
 */
export interface ArithmeticExpression{
    id:string, // id
    expression:string, // 表达式的值（带=）
    resultCorrect:string, // 表达式的正确结果
    resultUser:string, // 表达式的用户输入的结果
    iscorrect:false, // 是否正确
}

/**
 * 题目的难度等级
 * Easy : 简单，只有单运算符
 * Middle ： 中级，混合运算符
 * Hard ： 困难，混合运算符和括号
 */
export const enum DefficultyLevel{
    Easy,
    Middle,
    Hard,
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