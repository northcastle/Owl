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