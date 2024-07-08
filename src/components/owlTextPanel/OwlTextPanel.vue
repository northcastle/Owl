<template>
      <el-input v-model="textForUse" style="width: 100%" type="textarea" placeholder="Please input"
      :rows="props.rowsNum" :autoSize="props.autoSizeFlag" :resize="props.resizeEnum"  :disabled="props.disabledFlag" 
      @input="valueChanged"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { OwlTextPanelType } from './OwlTextPanelType' 

// 声明属性值
const props = defineProps<OwlTextPanelType>()

// 输出事件
const emit = defineEmits<{
    (event: 'textForUseChanged', value: string): void
}>()

// 控件绑定的值
const textForUse = ref('')
// 初始化控件绑定的值
textForUse.value = props.text

/**
 * 输入框的值发生了改变
 */
const valueChanged = () => {
    emit('textForUseChanged', textForUse.value)
}

</script>

<style lang="css" scoped>
</style>