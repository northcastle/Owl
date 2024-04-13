
<!-- 
    打字练习的主页面
 -->
<template>
    <div class="key-board-view">
        <el-row>
            <!-- 顶部的事件和准确率 -->
            <el-col :span="12"><div style="height: 70px;">Time</div> </el-col>
            <el-col :span="12"><div style="height: 70px;">准确率</div></el-col>
            <!-- 左侧的案例内容 -->
            <el-col :span="12">
                <div class="text-box-left">
                  <TypingCasePanel :typing-case-list="typingCaseList" />
                </div>
            </el-col>
            <!-- 右侧的输入内容 -->
            <el-col :span="12" >
                <div class="text-box-right">asdadf</div>
            </el-col>
            <!-- 下面的键盘 -->
            <el-col :span="24">
                <div class="keyboard-area"> <OwlKeyBoard /></div>
            </el-col>
        </el-row>

        
    </div>
</template>

<script setup lang="ts">

import TypingCasePanel from './TypingCasePanel.vue';

import OwlKeyBoard from '../../components/owlkeyboard/OwlKeyBoard.vue'

import {typingCaseList} from './TypingCaseData'


</script>



<style scoped>

.key-board-view{
    border: 0px solid red;
    /* height: 400px; */
    /* width: 1200px; */
}

.text-box-left{
    border: 0px solid green;
    background-color: rgb(216, 216, 197);
    height: 400px;
    border-radius: 10px 10px 10px 10px;
    padding: 10px;
}



.text-box-right{
    border: 1px solid green;
    height: 400px;
    border-radius: 10px 10px 10px 10px;
    padding: 10px;
}

.keyboard-area{
    border: 1px solid rgb(90, 242, 9);
    
    height: 330px;
    padding-left: 150px;
    padding-top: 10px;
    border-radius: 10px 10px 10px 10px;
}

</style>
./TypingCaseData