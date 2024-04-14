
<!-- 
    打字练习的主页面
 -->
<template>
    <div class="typing-practice-view">
        <el-row>
            <!-- 顶部的事件和准确率 -->
            <el-col :span="12">
                <div style="height: 70px;margin-right: 5px;">
                    <OwlTimer />
                </div> 
            </el-col>
            <el-col :span="12">
                <div style="height: 70px;margin-left: 5px;">
                    <div class="accuracy-container">
                        <el-icon size="1.5rem" color="black" style="position: absolute;margin-top: 4px;"><Medal /></el-icon>
                        <span class="accuracy-text">
                            Accuracy (准确率)：{{ accuracyValue }}
                        </span>
                    </div>
                </div>
            </el-col>
            <!-- 左侧的案例内容 -->
            <el-col :span="12">
                <div class="text-box-left">
                  <TypingCasePanel :typing-case-list="typingCaseList" />
                </div>
            </el-col>
            <!-- 右侧的输入内容 -->
            <el-col :span="12" >
                <div class="text-box-right">
                    <el-card class="el-card-my" shadow="hover">
                        <el-input v-model="typingText" maxlength="300" placeholder="请输入左侧的文本" 
                         show-word-limit type="textarea" rows="16" resize="none" class="el-input-my"/>
                    </el-card>
                   
                </div>
            </el-col>
            <!-- 下面的键盘 -->
            <el-col :span="24">
                <div class="keyboard-area"> <OwlKeyBoard /></div>
            </el-col>
        </el-row>

        
    </div>
</template>

<script setup lang="ts">

import {ref} from 'vue'

import OwlTimer from '../../components/owlTimer/OwlTimer.vue'

import TypingCasePanel from './TypingCasePanel.vue';

import OwlKeyBoard from '../../components/owlkeyboard/OwlKeyBoard.vue'

import {typingCaseList} from './TypingCaseData'

// 输入的文本
const typingText = ref('')

// 准确率
const accuracyValue = ref('--%')

</script>



<style scoped>

.typing-practice-view{
    border: 0px solid red;
    /* height: 400px; */
    /* width: 1200px; */
   
}

.accuracy-container{
    border: 0px solid rgb(0, 0, 0);
    height: 60px;
    border-radius: 10px;
    padding: 10px;
    background-image: linear-gradient(to left top, #65faff, #6df0ff, #83e5ff, #9cdaff, #b2ceff, #b0ceff, #aecfff, #accfff, #92dbff, #74e7ff, #5ef2ff, #5ffbf1);

}

.accuracy-text{
    display: inline-block;
    border: 0px solid red;
    color: rgb(0, 0, 0);
    font-size: 1.3rem;
    font-weight: bold;
    margin-right: 20px;
    margin-left: 30px
}

.text-box-left{
    border: 0px solid green;
    background-image: linear-gradient(to bottom, #5737ca, #e01391, #f86969, #e2a430, #a8eb12);
    height: 390px;
    border-radius: 10px 10px 10px 10px;
    padding: 10px;
    margin-right: 5px;
}



.text-box-right{
    border: 0px solid green;
    background-image: linear-gradient(to bottom, #78e3e4, #49ebd0, #47efa7, #72f06f, #a8eb12);
    height: 390px;
    border-radius: 10px 10px 10px 10px;
    padding: 10px;
    margin-left: 5px;
}

.el-card-my{
    width: 100%;
    height: 100%; 
    padding: 0;
}

.el-card-my :deep(.el-card__body) {
  border: 0px solid rgb(13, 181, 232);
  font-weight: bold;
  padding: 0px;

}



.el-input-my :deep(.el-textarea__inner){
    box-shadow: 0 0 0 0;
    font-size: 0.9rem;
    color: rgb(0, 0, 0);
    font-weight: bold;
}

.keyboard-area{
    border: 0px solid rgb(90, 242, 9);
    height: 330px;
    padding-left: 150px;
    padding-top: 10px;
    border-radius: 10px 10px 10px 10px;
    margin-top: 8px;
    background-image: linear-gradient(to top, #d388e4, #bd84e4, #a681e3, #8d7de0, #717add, #5a86e6, #3c91ec, #009bef, #00b6f9, #00cefb, #00e6f8, #5ffbf1);
    
}

</style>