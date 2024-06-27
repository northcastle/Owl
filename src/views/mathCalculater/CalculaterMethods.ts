/**
 * 进行数学运算的核心方法
 */

import { Stack,DefficultyLevel }  from './MathType';

// 操作符集合
const operatorArray:string[] = ['+','-','×','÷','(',')'];
// 操作符集合和操作数集合，包含 “=” 
const operatorArrayWithEqual:string[] = ['+','-','×','÷','(',')','='];

/**
 * 获取操作符集合和操作数集合，表达式必须以 “=” 结尾
 * @param express 表达式 ： 3 +40.1234      *2   -(10+2)/3.128 -1=
 */
const getOperatorAndOperand = (express:string):string[] => {

    let operandAndOperatorList:string[] = []; // 操作数 和 操作符 分割开来
    if(express && express.trim().length > 0){

        let expressTrim = express.trim(); // 先去除空格
        let expressLength = expressTrim.length;
        let temp = '';
        for(let i = 0; i < expressLength; i++){
            
            let char = expressTrim.charAt(i);
            //console.log('i = ',i,';char = |',char,'|');
            if(operatorArrayWithEqual.indexOf(char) >= 0){
                if(temp.length > 0){
                    // 先把前面的操作数放进来，然后清空一下临时的对象
                    operandAndOperatorList.push(temp);
                    temp = '';
                }
              
                // 再把操作符放进来
                operandAndOperatorList.push(char);
            }else if(i < expressLength && ( (char >= '0' && char <= '9')) || (char == '.') ){
                temp += expressTrim.charAt(i);
            }
        }
        // 最后再把最后的操作数放进来
        if(temp.length > 0){
            operandAndOperatorList.push(temp);
        }
    }

    return operandAndOperatorList;
}

/**
 * 运算符优先级的比较方法
 * @param operatorNew 新来的 操作符 （列）
 * @param operatorLast 上一个 操作符 （行）
 */
const compareOperator = (operatorNew:string,operatorLast:string):number => {

    let priorityFlag = 0;

    /**
     * 运算符优先级表
     * 列 ： 下一个运算符
     * 行 ： 栈顶的运算符
     * 
     *     +   -   ×   ÷   (   )   =
     *  +  0   0   1   1   1   0
     *  -  0   0   1   1   1   0
     *  ×  0   0   0   0   1   0
     *  ÷  0   0   0   0   1   0
     *  (  1   1   1   1   1   2
     *  )  ?   ?   ?   ?   ?   ?          // 这一行是不会存在的
     *  =
     */

    let priorityArray:Array<Array<number>> = [
        [0,0,1,1,1,0],
        [0,0,1,1,1,0],
        [0,0,0,0,1,0],
        [0,0,0,0,1,0],
        [1,1,1,1,1,2],
        [3,3,3,3,3,3] // 不会出现这个情况
    ];

    let operatorNewIndex = operatorArray.indexOf(operatorNew);
    let operatorLastIndex = operatorArray.indexOf(operatorLast);
    
    priorityFlag = priorityArray[operatorLastIndex][operatorNewIndex];   // 0:优先级低；1:优先级高；2；) 遇到了 (,需要弹出来

    return priorityFlag;
}

/**
 * 计算两个操作数的简单运算
 * @param operand1 
 * @param operator 
 * @param operand2 
 */
const calculateWhitTwoNum = (operand1:string,operator:string,operand2:string):string => {
   
    let result:Number = 0;
    switch(operator){
        case '+':
            result = Number(operand1) + Number(operand2);
            break;
        case '-':
            result = Number(operand1) - Number(operand2);
            break;
        case '×':
            result = Number(operand1) * Number(operand2);
            break;
        case '÷':
            result = Number(operand1) / Number(operand2);
            break;
        default:
            result = NaN;
            break;
    }
    // console.log('计算 ： ',operand1,operator,operand2,'=',result)
    return result.toFixed(6);
}

/**
 * 运算 : 直接从 两个栈中获取数据与操作符进行运算
 * @param operatorStack 操作符栈
 * @param operandStack 操作数栈
 */
const calculateWithTwoStack = (operandStack:Stack<String>,operatorStack:Stack<String>):string =>{
    // 获取出 要操作的操作符 和 操作数
    let operatorLastUse:string = operatorStack.pop() as string;
    let operandLast:string = operandStack.pop() as string;
    let operandLastLast:string = operandStack.pop() as string;
    // 执行普通的计算逻辑
    return calculateWhitTwoNum(operandLastLast,operatorLastUse,operandLast);
    
}


/**
 * 执行运算
 * @param expressStr 数学表达式，以 = 结尾
 */
export const doCalculate = (expressStr:string):number => {

    //debugger;

    if(!expressStr || expressStr.trim().length == 0){
        return NaN;
    }

    if(expressStr.indexOf('=') >= 0 && expressStr.indexOf('=') != (expressStr.length - 1)){
        return NaN;
    }

    

    let result = 0;
    
    let expressArray:string[] = getOperatorAndOperand(expressStr);
    //console.log('expressArray = ',expressArray);
    if(expressArray && expressArray.length > 0){
        let operatorArray:string[] = ['+','-','×','÷','(',')']; // 操作符集合

        let operatorStack:Stack<String> = new Stack(); //  操作符栈 对象
        let operandStack:Stack<String> = new Stack();; //  操作数栈 对象
        
        for(let i = 0; i < expressArray.length; i++){
            let operandOrOperator:string = expressArray[i];
            if(operandOrOperator != '='){
                let operatorIndex = operatorArray.indexOf(operandOrOperator);
                if(operatorIndex >= 0){ // 证明是操作符
                    if(operatorStack.isEmpty()){ // 操作符栈是空的，直接放入
                        operatorStack.push(operandOrOperator);
                    }else{ // 操作符栈不是空的
                        let operatorLast:string = operatorStack.peek() as string;
                        let priorityFlag = compareOperator(operandOrOperator,operatorLast);
                       if(priorityFlag == 0){ // 新的操作符优先级低，先计算上一个
                          
                          // 执行普通的计算逻辑
                          let result = calculateWithTwoStack(operandStack,operatorStack);
                          // 放入操作数栈
                          operandStack.push(result);

                          // 如果是 ) 右括号，则弹出一个操作符
                          if(operandOrOperator == ')'){
                              while(operatorStack.peek() != '('){ // 不是 左括号的时候，说明还需要继续计算
                                // 执行普通的计算逻辑
                                let result = calculateWithTwoStack(operandStack,operatorStack);
                                // 放入操作数栈
                                operandStack.push(result);
                              }
                              // 弹出左括号,证明这个括号计算完成了
                              operatorStack.pop(); 

                          }else{ 
                              // 如果当前的操作符不是 ) 右括号，则需要继续处理
                              // 如果 操作符栈顶层的操作符的优先级 高于 当前操作符，则需要继续执行计算
                              // 否则 将当前操作符入栈
                              while(operatorStack.peek() != '(' && compareOperator(operandOrOperator,operatorStack.peek() as string) == 0){
                                // 执行普通的计算逻辑
                                let result = calculateWithTwoStack(operandStack,operatorStack);
                                // 放入操作数栈
                                operandStack.push(result);
                              }
                              // 将当前的操作符放入操作符栈中
                              operatorStack.push(operandOrOperator);
                          }


                       }else{ // 新的操作符优先级高，直接入栈
                        operatorStack.push(operandOrOperator);
                       }
                    }
                }else{ // 证明是操作数，直接放入操作数栈
                    operandStack.push(operandOrOperator);
                }

            }else{ // = : 遇到表示结束
               
                // 如果操作符栈中已经是空的了，证明计算完毕，直接弹出结果
                if(!operatorStack.isEmpty()){
                    while(!operatorStack.isEmpty()){
                        // 执行普通的计算逻辑
                        result = Number(calculateWithTwoStack(operandStack,operatorStack));
                        operandStack.push(result.toFixed(6));
                    }
                }else{
                    result = Number(operandStack.pop()); 
                }
                
                break;
            }
        }
    }

    return result;
}



const generateExpression = (level:DefficultyLevel,num:number) =>{
    
}