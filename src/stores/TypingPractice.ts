/**
 * 打字练习功能中用到的全局变量
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const typingPracticeStore = defineStore('typingPracticeData',()=>{
    // 定义一个值
    const disableArticalSelectionFlag = ref(false)
    // 提供一个方法，修改 disableArticalSelectionFlag 的值
    const changeDisableArticalSelectionFlag = (newFlagValue:boolean) =>{
        disableArticalSelectionFlag.value = newFlagValue
    }

    // 公开数据
    return {disableArticalSelectionFlag,changeDisableArticalSelectionFlag}

})