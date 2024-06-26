<template>
    {{ express1 }}
</template>

<script setup lang="ts">

import { ref } from 'vue'

const express1 = ref('3 +40.1234      *2   -(10+2)/3.128 -1=60')

/**
 * 获取操作符集合和操作数集合
 * @param express 
 */
const getOperatorAndOperand = (express:string) => {

    let operandAndOperatorList:string[] = []; // 操作数 和 操作符 分割开来
    if(express && express.trim().length > 0){

        let expressTrim = express.trim(); // 先去除空格

        let expressLength = expressTrim.length;
        console.log('expressLength = ',expressLength);
        let temp = '';
        for(let i = 0; i < expressLength; i++){
            
            let char = expressTrim.charAt(i);
            //console.log('i = ',i,';char = |',char,'|');
            if(char == '+' || char == '-' || char == '*' || char == '/' || char == '(' || char == ')' || char == '='){
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

const a = getOperatorAndOperand(express1.value);
console.log('a = ',a);


</script>

<style scoped>

</style>