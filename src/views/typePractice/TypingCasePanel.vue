<!-- 打字案例的组件 -->
<template>

    <el-card style="width: 100%;height: 100%;" shadow="hover">
        <template #header>
            <el-icon :size="20" style="position:absolute;margin-top: 3px;"><Reading /></el-icon>
            <!-- <span class="header-text">{{ typingCaseObjUsing.title }}</span> -->

            <el-dropdown @command="chooseTypingCaseListItem">
                <span class="header-text" >
                    {{ typingCaseObjUsing.title }}
                    <el-icon class="title-right-arrow"><arrow-down /></el-icon>
                </span>
                
                <template #dropdown>
                    <el-dropdown-menu>
                        <template v-for="item in typingCaseList">
                            <el-dropdown-item :command="item">{{item.title}}</el-dropdown-item>
                        </template>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </template>

        <template #default>
            <p class="body-text">{{ typingCaseObjUsing.content }}</p>
        </template>

    </el-card>
</template>

<script setup lang="ts">

import {ref,reactive} from 'vue'

import type {TypingCaseObj,TypingCaseProps} from './TypingCasePanelType'

// 传入进来的数据
const typingCaseProps = defineProps<TypingCaseProps>()

// 当前正在使用的数据
let typingCaseObjUsing:TypingCaseObj = reactive({id:'',title:'',content:''})

// 默认展示 传入数据的第一条
let chooseObj = typingCaseProps.typingCaseList[0];
typingCaseObjUsing = reactive({id:chooseObj.id,title:chooseObj.title,content:chooseObj.content})


// 点击选中了某一片文章
const chooseTypingCaseListItem = (chooseObj:TypingCaseObj)=>{
    typingCaseObjUsing.id = chooseObj.id;
    typingCaseObjUsing.title = chooseObj.title;
    typingCaseObjUsing.content = chooseObj.content;

}
</script>

<style scoped>

.el-card :deep(.el-card__header) {
  border: 0px solid rgb(13, 181, 232);
  border-bottom: 1px solid var(--el-card-border-color);
  font-weight: bold;
  padding: 10px;

}

.header-text{
    font-size: 1rem;
    font-weight: bold;
    margin-left: 30px;
    color: black;
    margin-top: 2px;
    cursor: pointer;
    padding-top: 3px;
}

.el-dropdown :deep(.el-tooltip__trigger:focus-visible){
    outline: unset;
}

.title-right-arrow{
    position: absolute; 
    margin-left: 3px;
}

.body-text{
    border: 0px solid red;
    white-space: pre-wrap;
    font-size: 1rem;
}


</style>