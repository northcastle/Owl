<template>
    {{ express1 }}
</template>

<script setup lang="ts">

import { ref } from 'vue'

import { doCalculate } from './CalculaterMethods'

// 引入uuid工具类
import { v4 as uuidv4 } from 'uuid';

const express1 = ref('3 +40.1234      *2   -(10+2)/3.128 -1=60')


const b = doCalculate('1×100');
console.log('b = ',b);

console.log('uuidv4 = ',uuidv4());

</script>

<style scoped>

</style>