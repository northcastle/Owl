<template>
    <!-- 步骤条 -->
    <el-steps class="step-box"  :active="active" align-center  finish-status="success">
        <el-step title="选择文件" :icon="UploadFilled" />
        <el-step title="文件内容" :icon="Document" />
        <el-step title="生成SQL" :icon="Finished"/>
    </el-steps>

    临时保留一下这个步骤进度的值 ： {{ active }}
    <!-- 中间内容 -->
    <div class="content-box">
       <div v-if="active == 0"> <OwlChooseFile style="width: 50%;margin-left: 25%;"/> </div>
       <div v-if="active == 1"> 文件内容展示组件 </div>
       <div v-if="active == 2"> 生成sql组件 </div>
       <div v-if="active == 3"> 生成的sql展示页面 </div>
    </div>

    <!-- 下一步按钮 -->
    <div class="bottom-box">
        <el-button-group v-if="active != 3">
            <el-button type="primary" :icon="ArrowLeft" @click="last" :disabled="active == 0">上一步</el-button>
            <el-button type="primary"  @click="next" :disabled="active == 3">
                下一步<el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
        </el-button-group>

        <el-button type="success" :icon="CircleCheckFilled" v-if="active == 3" @click="done">完成</el-button>
    </div>
    
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import { UploadFilled,Document,Finished,ArrowLeft,ArrowRight,CircleCheckFilled } from '@element-plus/icons-vue'

import  OwlChooseFile  from '../../components/owlChooseFile/OwlChooseFile.vue'

/**
 * 步骤条索引状态描述：
 * 0 选择文件中
 * 1 文件选择完成，展示文件内容中
 * 2 文件内容展示完成，生成sql中
 * 3 生成sql完成
 */
const active = ref(0)


/**
 * 上一步
 */
const last = () => {
    console.log('自减前 ： ',active.value)
    if (active.value-- < 0) active.value = 0
    console.log('自减后 ： ',active.value)
    console.log('------')
}
/**
 * 下一步
 */
const next = () => {

    console.log('自增前 ： ',active.value)
    if (active.value++ > 2) active.value = 0
    console.log('自增后 ： ',active.value)
    console.log('----')
}

const done = () => {
    console.log('生成sql完成')
   active.value = 0
}

</script>

<style scoped>

.step-box{
    border: 0px solid red;
    height: 90px;
    padding-top: 15px;
    background-color: white;
    border-radius: 10px;
}

.content-box{
    border: 1px solid rgb(26, 255, 0);
    max-height: 650px;
    margin-top: 10px;
}

.bottom-box{
    margin-top: 10px;
    text-align: center;
}
</style>