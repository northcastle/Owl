<template>
    {{ express1 }}
</template>

<script setup lang="ts">

import { ref } from 'vue'

import { doCalculate,generateExpression } from './CalculaterMethods'
import { DefficultyLevel } from './MathType';



const express1 = ref('3 +40.1234      *2   -(10+2)/3.128 -1=60')


const b = doCalculate('1×100');
console.log('b = ',b);

generateExpression(DefficultyLevel.Easy_ADD,2,100,200)


</script>

<style scoped>

</style>