<template>
    {{ express1 }}
</template>

<script setup lang="ts">

import { ref } from 'vue'

import { doCalculate,generateExpression } from './CalculaterMethods'
import { DefficultyLevel,type ArithmeticExpression } from './MathType';



const express1 = ref('3 +40.1234      *2   -(10+2)/3.128 -1=60')


const b = doCalculate('1×100');
console.log('b = ',b);

// let expressionArray:Array<ArithmeticExpression> =  generateExpression(DefficultyLevel.Easy_ADD,2,100,200)
// let expressionArray:Array<ArithmeticExpression> =  generateExpression(DefficultyLevel.Easy_SUB,2,100,200)
// let expressionArray:Array<ArithmeticExpression> =  generateExpression(DefficultyLevel.Easy_MUL,2,100,200)
let expressionArray:Array<ArithmeticExpression> =  generateExpression(DefficultyLevel.Easy_DIV,20,-100,200)
console.log('expressionArray = ',expressionArray);


</script>

<style scoped>

</style>