<template>
    <div class="id-varification-container">

        <el-row>
            <el-col :span="12" :offset="6" style="margin-top: 90px;">
                <el-input v-model="idNumberText" style="width: 480px" maxlength="18"  clearable show-word-limit placeholder="请输入身份证号码" />
            </el-col>
            <el-col :span="12" :offset="6" style="text-align: center;margin-top: 20px;">
                <el-button type="primary"  :icon="Pointer" @click="doVarification">验&nbsp;&nbsp;&nbsp;&nbsp;证</el-button>
                <el-button   :icon="Refresh" @click="doRefresh">重&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
            </el-col>
            <el-col :span="12" :offset="6" style="text-align: center;margin-top: 90px;">
                <img v-if="varificationResult == 0" :src="varificationWaitingUrl" alt="" width="400">
                <img v-if="varificationResult == 1" :src="varificationSuccessUrl" alt="" width="400">
                <img v-if="varificationResult == 2" :src="varificationFialUrl" alt="" width="400">
            </el-col>
        </el-row>

    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import { Pointer,Refresh } from '@element-plus/icons-vue'
import {showWarningMessage,showSucessMessage,showErrorMessage,NotificationPosition} from '../../utils/NotificationUtil'

import varificationSuccessUrl from '/varificationSuccess.svg'
import varificationFialUrl from '/varificationFail.svg'
import varificationWaitingUrl from '/varificationWaiting.svg'

// 身份证号输入框
const idNumberText = ref('')
// 展示结果 0=待验证；1=成功；2=失败
const varificationResult = ref(0)

/**
 * 身份证验证的方法
 */
const doVarification = ()=>{
    if (idNumberText.value == '') {
        showWarningMessage('警告','请输入身份证号码后执行查验！',NotificationPosition.bottomRight)
        return;  
    }
    if (idNumberText.value.length != 18) {
        showWarningMessage('警告','身份证号码长度必须为18位！',NotificationPosition.bottomRight)
        return;  
    }

    // 正则表达式验证身份证号码的格式
    const idCardRegex = /(^\d{17}(\d|X|x)$)|(^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})(\d|X|x)$)/;
    if (!idCardRegex.test(idNumberText.value)) {
        showWarningMessage('警告','身份证号码格式不正确！')
        return;
    }

    // 验证身份证号码的校验码
    // 获取前17位
    const idCard17 = idNumberText.value.substring(0, 17);
    // 获取第18位，即校验位
    const checkCode = idNumberText.value.substr(17).toUpperCase();

    // 定义系数
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 定义校验码对应的值
    const verifyCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    let sum = 0;
    for (let i = 0; i < 17; i++) {
        sum += parseInt(idCard17.charAt(i), 10) * factor[i];
    }

    const code = verifyCode[sum % 11];

    if(checkCode === code){
       varificationResult.value = 1
        showSucessMessage('成功','身份证号码验证成功！',NotificationPosition.bottomRight)
    }else{
       varificationResult.value = 2
        showErrorMessage('失败','身份证号码验证失败！',NotificationPosition.bottomRight)
    }
}

const doRefresh = ()=>{
    idNumberText.value = ''
    varificationResult.value = 0
}

</script>

<style scoped>

    .id-varification-container{
        border: 1px solid rgb(27, 26, 26);
        width: 100%;
        height: calc(100vh - 25px);
        border-radius: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
        background-image: linear-gradient(to bottom, #6cffef, #4ff1f9, #44e2ff, #51d1ff, #68c0f9, #68c0f9, #69bff8, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
    }
</style>