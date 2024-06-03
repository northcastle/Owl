
<!-- 打包更新 帮助工具 -->
<template>
    <el-button type="primary" @click="showOpenFileDialog">
      Open
      <el-icon><FolderOpened /></el-icon>
    </el-button>

    <br>

    <el-row>
      <!-- 展示的组件树 -->
      <el-col :span="12">
        <el-tree  :data="filesTreeData" :props="treeProps" @node-click="handleNodeClick" />
      </el-col>
    </el-row>
    
</template>

<script setup lang="ts">

  import { reactive } from 'vue';

  // 树形组件的数据类型
  import type { TreeNode } from './PackageHelperType'

  // 树形组件的配置
  const treeProps = {
    children: 'children',
    label: 'label',
  }
  // 树形组件的数据
  let filesTreeData: TreeNode[] = reactive([])
  /**s
   * 树形组件的点击事件
   * @param data 
   */
   const handleNodeClick = (data: TreeNode) => {
    console.log('点击了某个文件 ： ',data)
  }

  /**
   * 发送打开目录的请求
   */
  const showOpenFileDialog =  async () => {
    const chooseFilePath:TreeNode[] = await window.OwlAPI.openFileDialog()
    // console.log('chooseFilePath :',chooseFilePath)
    if(chooseFilePath){
      chooseFilePath.forEach(item => {
       filesTreeData.push(item)
      })
    }
    // console.log('filesTreeData :',filesTreeData)
  }
  
</script>

<style scoped>




</style>