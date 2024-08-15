<template>
    <div class="math-calculater-container">
        <!-- 上边的工具条 -->
        <div class="math-calculater-toolbar">
            <el-row>
                <el-col :span="8"  >
                    <el-button type="success" :icon="Finished" size="small" @click="finishWork">完&nbsp;&nbsp;&nbsp;&nbsp;成</el-button>
                    <el-button type="primary" :icon="Refresh" size="small" @click="refreshWork">重&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
                </el-col>
            </el-row>
        </div>

        <!-- 下边的题目列表 -->
        <div class="math-calculater-itemlist">
            <el-scrollbar height="100%">
                <el-row>
                    <template v-for="(item,index) in expressionArray" :key="index">
                        <el-col :span="8" >
                            <el-row class="item-box">
                                <el-col :span="3"><span class="xh-span">{{ index+1 }}</span></el-col> 
                                <el-col :span="21" style="padding-left: 10px;font-size: 1rem;">
                                    {{ item.expression }} 
                                    <el-input v-model="item.resultUser" size="small" class="resultinput"/> &nbsp;&nbsp;
                                    <img :src="zhengqueUrl" v-if="doneFlag && item.iscorrect"  width="22px"/> 
                                    <img :src="cuowuUrl" v-if="doneFlag && !item.iscorrect"  width="22px"/>
                                    &nbsp;&nbsp; <span v-if="doneFlag && !item.iscorrect" class="resultcorrect">{{ item.resultCorrect }}</span>
                                </el-col>
                            </el-row>
                        </el-col>
                    </template>
                </el-row>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref ,reactive} from 'vue'
import { Finished,Refresh  } from '@element-plus/icons-vue'

import { doCalculate,generateExpression } from './CalculaterMethods'
import { DefficultyLevel,type ArithmeticExpression } from './MathType';

import zhengqueUrl from '/zhengque.svg'
import cuowuUrl from '/cuowu.svg'

const b = doCalculate('1×100');

const doneFlag = ref(false)

// let expressionArray:Array<ArithmeticExpression> =  reactive(generateExpression(DefficultyLevel.Easy_ADD,2,100,200))
// let expressionArray:Array<ArithmeticExpression> =  reactive(generateExpression(DefficultyLevel.Easy_SUB,2,100,200))
// let expressionArray:Array<ArithmeticExpression> =  reactive(generateExpression(DefficultyLevel.Easy_MUL,20,100,2000))
let expressionArray:Array<ArithmeticExpression> =  reactive(generateExpression(DefficultyLevel.Easy_DIV,20,-100,20)) 


/**
* 执行计算
*/
const finishWork = () => {
    expressionArray.forEach(element => {
        element.iscorrect = element.resultCorrect === element.resultUser;
    });
    doneFlag.value = true;
}

/**
 * 重置
 */
const refreshWork = () => {
    // 清空原来的数组
    expressionArray.splice(0,expressionArray.length)
    // 创建信的数组
    let newArray:Array<ArithmeticExpression>= generateExpression(DefficultyLevel.Easy_DIV,20,-100,20)
    // 填充新的数组
    newArray.forEach(element => {
        expressionArray.push(element)
    });
    // 隐藏对错的符号
    doneFlag.value = false;
}

</script>

<style scoped>

.math-calculater-container{
    width: 100%;
    height: 100%;
}

.math-calculater-toolbar{
    height: 50px;
    border: 0px solid red;
    border-radius: 5px;
   
    background-image: radial-gradient(circle, #1cc9cf, #0fc5dc, #29bfe5, #47b9eb, #64b2ec, #6fb5ea, #79b7e7, #83bae5, #8ec5e1, #a0cedc, #b6d6da, #cddddc);
    
    padding-top: 10px;
    padding-right: 20px;
    padding-left: 20px;
}
.math-calculater-itemlist{
    height: calc(100% - 60px);
    padding-top: 10px;
    padding-left: 10px;
    
    padding-bottom: 20px;
    margin-top: 10px;
    border: 1px solid rgb(115, 115, 115);
    box-shadow: inset 0px 0px 10px rgb(187, 184, 184);
    border-radius: 5px;
    /* background-image: linear-gradient(to right bottom, #1cc9cf, #0fc5dc, #29bfe5, #47b9eb, #64b2ec, #52baf4, #3ac3fa, #00cbff, #00e3f3, #00f5c7, #81ff87, #e3f559); */
    background-image: linear-gradient(to right bottom, #cbfbfd, #c3eff7, #bde2ef, #b8d5e6, #b4c9db, #abc4da, #a3c0d8, #9abbd7, #84bedc, #69c2dd, #47c6d9, #1cc9cf);


}

.item-box{
    border: 0px solid black;
    padding-top: 10px;
    text-align: left;
    padding-left: 5px;
    font-size: 1rem;
    color: black;
}

.xh-span{
    border: 0px solid rgb(3, 3, 3);
    box-shadow: inset 0px 0px 5px rgb(4, 73, 98);
    display: inline-block;
    font-weight: bold;
    font-size: 0.8rem;
    color: #3f3f3f;
    text-align: center;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 30px;
}

.resultinput{
    width: 70px;
}
.resultcorrect{
    border: 1px solid rgb(165, 243, 86);
    padding-right: 3px;
    padding-left: 3px;
    border-radius: 5px;
    background-color: greenyellow;
}

:deep(.resultinput .el-input__wrapper){
    background-color: #81787800;
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgb(55, 53, 53);
}

:deep(.resultinput .el-input__inner){
   
    color: rgb(10, 10, 10);
    font-size: 1rem;
    font-weight: bold;
    text-align: center
}



</style>