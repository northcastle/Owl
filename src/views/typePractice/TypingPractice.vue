
<!-- 
    打字练习的主页面
 -->
<template>
    <div class="typing-practice-view">
        <el-row>
            <!-- 顶部的事件和准确率 -->
            <el-col :span="12">
                <div style="height: 70px;margin-right: 5px;">
                    <OwlTimer @start-typing="receiveStartTyping" @pause-typing="receivePauseTyping"
                        @stop-typing="receiveStopTyping" @restart-typing="receiveReatartTyping"/>
                </div> 
            </el-col>
            <el-col :span="12">
                <div style="height: 70px;margin-left: 5px;">
                    <div class="accuracy-container">
                        
                        <el-row>
                            <el-col :span="16">
                                <el-icon size="1.5rem" color="black" style="position: absolute;margin-top: 4px;"><Medal /></el-icon>
                                <span class="accuracy-text">
                                    Accuracy (准确率)：{{ accuracyValue }}
                                </span>
                            </el-col>

                            <el-col :span="8" style="margin-top:-8px">
                                <span class="static-text">总计字数 ： {{ caseTextNum }}</span>
                                <span class="static-text">匹配字数 ： {{ matchTextNum }}</span>
                            </el-col>

                        </el-row>
                       
                        <br>
                        

                    </div>
                </div>
            </el-col>
            <!-- 左侧的案例内容 -->
            <el-col :span="12">
                <div class="text-box-left">
                  <TypingCasePanel :typing-case-list="typingCaseList" @choose-typing-case="receiveChooseTypingCase"/>
                </div>
            </el-col>
            <!-- 右侧的输入内容 -->
            <el-col :span="12" >
                <div class="text-box-right" >
                    <el-card class="el-card-my" shadow="hover">
                        <!-- 展示输入框 -->
                        <el-input v-model="typingText" maxlength="300" placeholder="请输入左侧的文本" 
                         show-word-limit type="textarea" rows="16" resize="none" class="el-input-my"
                         :disabled="writeDisableFlag" v-if="!showResultFlag"/>

                         <!-- 展示最后的结果 -->
                         <template v-if="showResultFlag">
                            <div v-html="typingTextRes"></div>
                         </template>
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


// 默认选中的文本
const choosedCaseContent = ref('')
choosedCaseContent.value = typingCaseList[0].content.trim()

// 输入文本框的禁用标识
const writeDisableFlag = ref(true)

// 展示输入结果的标识
const showResultFlag = ref(false)

// 输入的文本
const typingText = ref('')
// 判定之后的文本
const typingTextRes = ref('')


// 案例字数
const caseTextNum = ref(0)
// 正确字数
const matchTextNum = ref(0)

// 准确率
const accuracyValue = ref('--%')


// 接收到了开始输入的事件
const receiveStartTyping = ()=>{
    // 取消文本框的禁用
    writeDisableFlag.value = false;
    // 取消结果展示
    showResultFlag.value = false;
}

// 接收到了暂停输入的事件
const receivePauseTyping = ()=>{
    // 设置文本框的禁用
    writeDisableFlag.value = true;
    // 取消结果展示
    showResultFlag.value = false;
}

// 接收到了 停止输入的事件
const receiveStopTyping = ()=>{

    // 设置文本框的禁用
    writeDisableFlag.value = true;

    // 获取到左侧的原来的文本
    // console.log('case : ',choosedCaseContent.value)
    // 获取到右侧的输入的文本
    // console.log('inpu : ',typingText.value)

    let caseLength = choosedCaseContent.value.length
    let typingLength = typingText.value.length

    // 记录案例的文本字数
    caseTextNum.value = caseLength;

    // 没有输入的时候，直接返回 0
    if(typingLength == 0){
        accuracyValue.value = '0%'
        return
    }

    // 找到两个字符串中较短的那一个
    let minLength = caseLength > typingLength ? typingLength : caseLength;
    // 开始循环判断字符串的值是否相等
    let matchNum = 0;
    for(let i = 0 ;i < minLength; i++){
        if(choosedCaseContent.value.charAt(i) == typingText.value.charAt(i)){
            matchNum++;
            typingTextRes.value += '<span>'+choosedCaseContent.value.charAt(i)+'</span>';
        }else{
            typingTextRes.value +=  '<span style="color:red;font-weight:bold">'+typingText.value.charAt(i)+'</span>';
        }
    }

    // 记录匹配成功的字数
    matchTextNum.value = matchNum;

    // 计算准确率
    let resAccuracy = parseFloat(((matchNum / caseLength) * 100).toFixed(2))
    accuracyValue.value = resAccuracy+'%';

    // 展示结果
    showResultFlag.value = true;


}

// 接收到了 重新开始的事件
const receiveReatartTyping = ()=>{
    // 取消文本框的禁用
    writeDisableFlag.value = false;
    // 重置文本输入框
    typingText.value = '';

    // 重置统计数字
    caseTextNum.value = 0
    matchTextNum.value = 0

    accuracyValue.value = '--%'
}

// 接收到 选中了案例文本
const receiveChooseTypingCase = (chooseContent:string)=>{
    choosedCaseContent.value = chooseContent.trim()
}

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

.static-text{
    display: inline-block;
    width: 100%;
    text-align: center;
    border: 0px solid red;
    background-color: #ffffff59;
    border-radius: 5px;
    color: rgb(0, 0, 0);
    font-size: 0.8rem;
    padding:3px;
    font-weight: bold;
    margin-top: -10px;
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